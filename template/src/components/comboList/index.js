const sex = [
  {
    name: '男',
    value: 0
  },
  {
    name: '女',
    value: 1
  }
]
const commonStatus = [
  {
    name: '开启',
    value: 0
  },
  {
    name: '关闭',
    value: 1
  }
]

function getCombo (key) {
  switch (key) {
    case 'sex': return sex
    case 'commonStatus': return commonStatus
    default: return []
  }
}
export default getCombo
