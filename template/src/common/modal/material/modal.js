let config = {
  proxy: {
    get: {
      method: 'post',
      url: '/cpu-basedocrefer/basedocrefer/materialdoc/getmaterial'
    }
  },
  autoLoad: false,
  model: {
    meta: {
      id: '',
      unit: '',
      classname: '',
      value: '',
      descr: '',
      classid: ''
    }
  }
}

export default config
