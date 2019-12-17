import {DeepClone} from '@/utils/tool'
import {getUserSubNavAuth} from '@/permission/authTool'

const baseNavList = [
  { text: "图表展示", roles:'account', icon: "saleTab", path: "/chart" },
  { text: "设备管理", roles: 'operation', icon: "machine", path: "/operator" },
  { text: "订单管理", roles: 'order', icon: "order", path: "/device" },
  {
    text: "商品管理",
    roles: 'shop',
    icon: "shop",
    key: "shop",
    children: [
      { text: "管理员页面", roles:'shop', icon: "order", path: "/admin" },
      { text: "哈佛", roles: 'shop', icon: "account", path: "/bbc" }
    ]
  },
  { text: "富文本编辑器", roles: 'role', icon: "account", path: "/editor" },
  {
    text: "会员管理",
    roles: 'userMember',
    icon: "member",
    key: "member",
    children: [
      { text: "礼物", roles: 'userMember', icon: "order", path: "/gift" },
      {
        text: "打折",
        roles: 'userMember',
        icon: "account",
        key: "subAccount",
        children: [
          { text: "家里的", roles:'userMember', icon: "order", path: "/tttt" },
          {
            text: "电风扇",
            roles: 'userMember',
            icon: "account",
            path: "/ggg",
            key: "subsub",
            children: [{ text: "大幅度", roles:'userMember', icon: "order", path: "/445" }]
          }
        ]
      }
    ]
  }
];

// 过滤有权限的路由
const cloneData = DeepClone(baseNavList)

function filterData(data) {
  const navAuth=getUserSubNavAuth()

  for (let index = 0; index < data.length; index++) {
    const ele = data[index];
    // if (!ele.roles.includes(role)) {
    if (!navAuth.includes(ele.roles)) {
      data.splice(index, 1);
      index--;
    } else if (ele.children) {
      filterData(ele.children);
    }
  }

}

filterData(cloneData);
const navList = cloneData;

export default navList