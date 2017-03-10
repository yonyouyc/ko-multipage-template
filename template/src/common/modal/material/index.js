// latest: zhangmyh 2017-1-23 5:23 PM
import { concat, forEach, find, map, extend } from 'lodash'
import { Post, Store } from 'common'
// import { getSelectJson } from 'common/utils'
import '../../../store/basedocrefer/materialdoc'
import '../../../store/basedocrefer/materialclass'
/* global ko */
/* global $ */
/* global u */

// 用mb的iuap
export default function vm (params) {
  var storeclass = Store.create('basedocrefer.materialclass')
  window.storeclass = storeclass
  storeclass.load({enterpriseId: window.global.user.enterpriseId})
  var store = Store.create('basedocrefer.materialdoc')

  window.aaastore = store
  var viewModel = {
    material: new u.DataTable({meta: {}}),
    datatable: storeclass.datatable,
    treeSetting: {
      view: {
        showLine: false,
        multiSelect: true
      },
      check: {
        enable: false,
        chkstyle: 'checkbox'
      },
      callback: {
        beforeClick: async function (id, obj) {
          store.load({
            materialClassId: obj.id,
            enterpriseId: window.global.user.enterpriseId
          })

          if (obj.orgType != 2) {
            if (!obj.flag) {
              var { data } = await Post('/cpu-basedocrefer/basedocrefer/materialdoc/getmatclassbyparentid', {
                enterpriseId: window.global.user.enterpriseId,
                parentid: obj.id
              })

              if (data.result && data.result.length > 0) {
                var checked = $.fn.zTree.getZTreeObj('tree2').getCheckedNodes()
                storeclass.datatable.addSimpleData(data.result)
                obj.flag = true
                $.fn.zTree.getZTreeObj('tree2').checkAllNodes(false)
                // 选中bug
                forEach(checked, function (node) {
                  $.fn.zTree.getZTreeObj('tree2').checkNode(node, true)
                })
              }
            }
          } else {}
        }
      }
    },
    grid: {
      id: 'materialAAasdaA',
      data: store,
      type: 'grid',
      multiSelect: true,
      editable: false,
      pagination: true,
      onRowSelected (obj) {
        var data = obj.rowObj.value
        // 手动添加与点击冲突处理
        var rd = find(viewModel.selected(), function (v) {
          return v.id === data.id
        })
        if (!rd) {
          viewModel.selected.push(data)
        }
      },
      onRowUnSelected (obj) {
        var data = obj.rowObj.value
        var rd = find(viewModel.selected(), function (v) {
          return v.id === data.id
        })
        viewModel.selected.remove(rd)
      },
      fields: [
        {
          'field': 'name',
          'dataType': 'String',
          'title': '物料名',
          'sortable': true,
          'canSwap': true,
          'width': '125'
        }, {
          'field': 'measdoc',
          'dataType': 'String',
          'title': '单位',
          'renderType': 'timeRender',
          'sortable': true,
          'width': '125'
        }
      ]
    },
    selected: ko.observableArray([]),
    material_class: ko.observableArray([]),
    selectid: ko.observable([]),
    // 切换类型
    changeclass: async function ({id}) {
      viewModel.selectid(id)
      store.load({ materialClassId: id, enterpriseId: params.enterpriseId })
    },
    search () {},
    save () {
      // 追加分类信息
      var vals = map($.fn.zTree.getZTreeObj('tree2').getCheckedNodes(), function (v) {
        v.className = v.className || v.name
        v.name = ''
        return v
      })

      this.modal.close(concat(viewModel.selected(), vals))
    },
    cancel () {
      this.modal.close()
    }
  }

  extend(this, viewModel, {
    height: '600px',
    width: '800px'
  })
  // 获取类型数据 --》只一次
  // $.ajax({
  //   url:'/basedocrefer/materialdoc/getmaterialclass',
  //   method:'post',
  //   data:JSON.stringify(params),
  //   dataType: 'json',
  //   contentType: 'application/json',
  // }).then(function({data}){
  //     viewModel.material_class(data.result)
  // })
}
