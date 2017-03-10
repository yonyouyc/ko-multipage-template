import { each, extend, map } from 'lodash'
import { Get, Post } from '../Ajax'
import testdata from '../../../mock/model'

let EventEmit = require('eventemitter2').EventEmitter2
let U = window.u
let _config = {}

export default function Model (config, flag) {
  EventEmit.apply(this)
  let {meta, proxy, associations} = config
  this._config = config
  this.proxy = proxy
  this.datatable = new U.DataTable({meta: meta})
  if (flag !== false) {
    this.datatable.createEmptyRow()
  }
  var _associations = this.associations = {}
  if (associations) {
    each(associations, function (val, key) {
      _associations[key] = Model.create(val.model, false)
    })
  }
}

Model.prototype = Object.create(EventEmit.prototype)
Model._config = _config

Model.define = function (name, config) {
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

Model.create = function (name, flag) {
  let config = _config[name]
  if (!config) {
    console.error('不存在改模型:' + name)
    return
  }
  return new Model(config, flag)
}

// 查询方法
Model.prototype.load = async function (params) {
  var url = this.proxy.get
  let ajax = this.proxy.loadmethod === 'post' ? Post : Get
  var {data} = await ajax(url, params)
  this.setSimpleData(data)
  this.data = data
  // 触发获取data事件，暂无作用
  this.emit('data', data, this)
  return this.data
}

// 测试数据
Model.prototype.localLoad = function (params) {
  const data = testdata
  this.setSimpleData(testdata)
  this.data = data
  this.emit('data', data, this)
  return this.data
}

// 设置返回数据
Model.prototype.setSimpleData = function (data) {
  this.datatable.setSimpleData([data])
  each(this.associations, function (model, val) {
    model.datatable.setSimpleData(data[val], {'unSelect': 'true'})
  })
}

/*
 * 1.将模型json 提交至 post
 * 2.将返回数据塞入model (update接口返回规范)
 *  更改模型会根据iuap，更新页面
 */
Model.prototype.save = async function (url = '') {
  try {
    var params = this.getData()
    var checked = checkData(params, this._config)
    if (checked.length > 0) {
      // return {status: 0, msg: checked.join('<br>')}
    }
    if (!url) {
      url = this.proxy.post
    }
    console.log('post: ', url, params)
    // return {status: 0, msg: '123'}
    let data = await Post(url, params)
    if (data.status === 1) {
      var dt = {}
      extend(dt, this.data, data.data)
      this.setSimpleData(dt)
      this.emit('data', data, this)
      return data
    } else {
      return data
    }
    // return {status: 1, msg: '请求失败ddd'}
  } catch (e) {
    return {
      status: 0,
      msg: e.responseText || '请求失败'
    }
  }
}

function checkData (data, config) {
  var rs = []
  each(config.meta, function (val, key) {
    // 需要存在
    if (val.required) {
      // 却不存在
      if (!data[key]) {
        rs.push(val.nullMsg)
      }
    }
    if (val.maxLength) {
      // 最大长度
      if (!data[key]) {
        rs.push(val.maxLengthMsg)
      } else if (data[key].length > val.maxLength) {
        rs.push(val.maxLengthMsg)
      }
    }
  })
  return rs
}

// 获取当前数据
Model.prototype.getData = function () {
  var [params] = this.datatable.getSimpleData()
  var associationsConfig = this._config.associations
  map(this.associations, function (model, key) {
    var type = associationsConfig[key].type
    if (type === 'belongsTo') {
      params[key] = model.datatable.getSimpleData()[0]
    } else {
      params[key] = model.datatable.getSimpleData()
    }
  })
  return params
}
