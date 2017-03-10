import person from 'components/modalrefer/person'
import supplydoc from 'components/modalrefer/supplydoc'
import singlesupplydoc from 'components/modalrefer/singlesupplydoc'
import org from 'components/modalrefer/org'
/* global u */
function personrefer (option) {
  u.refer({
    isPOPMode: true,
    module: person,
    okId: 'okBtn',
    contentId: 'refer',
    width: '800px',
    title: '选择人员',
    onOk: option.onOk,
    enterpriseId: window.global.user.enterpriseId,
    onCancel: option.onCancel
  })
}
function supplydocrefer (option) {
  u.refer({
    isPOPMode: true,
    module: supplydoc,
    okId: 'okBtn',
    contentId: 'refer',
    width: '800px',
    title: '选择供应商',
    onOk: option.onOk,
    enterpriseId: window.global.user.enterpriseId,
    onCancel: option.onCancel,
    defaultData: option.defaultData
  })
}
function singlesupplydocrefer (option) {
  u.refer({
    isPOPMode: true,
    module: singlesupplydoc,
    okId: 'okBtn',
    contentId: 'refer',
    width: '800px',
    title: '选择供应商',
    onOk: option.onOk,
    enterpriseId: window.global.user.enterpriseId,
    onCancel: option.onCancel
  })
}
function orgrefer (option) {
  u.refer({
    isPOPMode: true,
    module: org,
    okId: 'okBtn',
    contentId: 'refer',
    width: '800px',
    title: '选择组织',
    onOk: option.onOk,
    enterpriseId: window.global.user.enterpriseId,
    onCancel: option.onCancel
  })
}
export {
  personrefer,
  supplydocrefer,
  singlesupplydocrefer,
  orgrefer
}
