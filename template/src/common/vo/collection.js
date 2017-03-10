import { Model, Post, Get, EventBus } from 'common'
import { each, extend } from 'lodash'
import testdata from '../../../mock/list'

let EventEmit = require('eventemitter2').EventEmitter2
let _config = {}

export default function Collection (config) {
  EventEmit.apply(this)
  var { model, proxy } = config
  this._config = config
  this.proxy = proxy
  this._model = Model.create(model, false)
  this.datatable = this._model.datatable
  this.associations = this._model.associations
}

Collection.prototype = Object.create(EventEmit.prototype)
Collection.define = function (name, config) {
  if (!name) {
    console.error('需要知道模型名称')
    return
  }
  if (_config[name]) {
    console.error('当前模型已存在:' + name)
    return
  }
  _config[name] = config
}

Collection.create = function (name) {
  var config = _config[name]
  if (!config) {
    console.error('不存在改模型:' + name)
    return
  }
  config.name = name
  return new Collection(config)
}

Collection.prototype.load = async function (params) {
  params = extend(this.params || {}, {
    pageIndex: 0
  }, params)
  this.params = params
  let url = this.proxy.get
  let ajax = this.proxy.loadmethod === 'post' ? Post : Get
  let data = await ajax(url, params)
  // 修改datatable
  if (data.data) {
    this.data = data.data
  } else {
    this.data = data
  }
  this.datatable.setSimpleData(this.data.result, {
    'unSelect': 'true'
  })
  this.emit('data', data, this)
  // 设置分页
  EventBus.emit('pagination.' + this._config.name, this.data)
}

// 测试数据
Collection.prototype.localLoad = function (params) {
  const data = testdata
  // 修改datatable
  if (data.data) {
    this.data = data.data
  } else {
    this.data = data
  }
  this.datatable.setSimpleData(this.data.result, {
    'unSelect': 'true'
  })
  // 设置分页
  EventBus.emit('pagination.' + this._config.name, this.data)
}

Collection.prototype.setData = function (data) {
  this.datatable.setSimpleData(data, {
    'unSelect': 'true'
  })
}

Collection.prototype.getSelected = function () {
  let viewModel = this.datatable
  let indexs = viewModel.getSelectedIndexs()
  let data = viewModel.getSimpleData()
  let rs = []
  each(indexs, function (val) {
    rs.push(data[val])
  })
  return rs
}
