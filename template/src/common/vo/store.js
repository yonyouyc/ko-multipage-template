import { Get, Post } from 'common/Ajax'
import Model from './model'
import EventBus from '../eventbus'
import { each, /* find, */ extend } from 'lodash'
var _config = {}
var EventEmitter2 = require('eventemitter2').EventEmitter2

export default function Store (config) {
  EventEmitter2.apply(this)
  var {model, proxy} = config
  this._config = config
  this._model = Model.create(model, false)
  this.datatable = this._model.datatable
  this.associations = this._model.associations
  this.proxy = proxy
}

Store.prototype = Object.create(EventEmitter2.prototype)
Store.define = function (name, config) {
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

Store.create = function (name) {
  var config = _config[name]
  if (!config) {
    console.error('不存在改模型:' + name)
    return
  }
  config.name = name
  return new Store(config)
}

Store.prototype.load = async function (params) {
  // var flag=find(params,function(v,k){return k!='pageIndex'})?true:false
  params = extend(this.params || {}, {
    pageIndex: 0
  }, params)

  this.params = params

  var url = this.proxy.get
  var ajax = url.method === 'post' ? Post : Get
  url = url.url || url
  var data = await ajax(url, params)
  // 修改datatable

  if (data.data) {
    this.data = data.data
  } else {
    this.data = data
  }

  this.datatable.setSimpleData(this.data.result, {'unSelect': 'true'})
  // 设置分页
  EventBus.emit('pagination.' + this._config.name, this.data)
  this.emit('data', this.data, this)
  return this.data = this.data
}

Store.prototype.save = async function (params) {
  var url = this.proxy.post
  var data = await Post(url, params)
  return this.data = data
}

Store.prototype.destroy = async function (params) {
  var url = this.proxy.delete
  var data = await Post(url, params)
  this.data = null
  return data.data
}

Store.prototype.update = async function (params) {
  var url = this.proxy.put
  var data = await Post(url, params)
  return this.data = data.data
}

Store.prototype.getSelected = function () {
  var viewModel = this.datatable
  var indexs = viewModel.getSelectedIndexs()
  var data = viewModel.getSimpleData()
  var rs = []
  each(indexs, function (val) {
    rs.push(data[val])
  })
  return rs
}
