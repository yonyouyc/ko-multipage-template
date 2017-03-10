// edit: zhangmyh 2017-1-18 9:59 AM
/* global __ */

function breadcrumb (params) {
  let list = []
  let flag = false
  switch (params.path) {
    case 'preqlf':
      if (!flag) {
        list.push({
          text: __('preqlf_title'),
          url: '123'
        })
        flag = true
      }
    case 'edit':
      if (!flag) {
        list.push({
          text: __('edit_title'),
          url: 'edit'
        })
        flag = true
      }
    case 'list':
      list.push({
        text: __('bidmng_title'),
        url: '321'
      })

      list.push({
        text: __('purchasesrc_title'),
        url: 'sdsfs'
      })
      break
    default:
      break
  }
  this.titleList = list.reverse()
  this.home = '/yuncai/workbench#/pages/home/home'
}

export default breadcrumb
