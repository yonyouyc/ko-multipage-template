import person from 'components/modalrefer/person'
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
  orgrefer
}
