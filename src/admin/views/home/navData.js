import {DeepClone} from '@/utils/tool'

const baseNavList = [
  { text: "图表展示", roles: ["user", "admin"], icon: "saleTab", path: "/admin/chart" },
  { text: "设备管理", roles: ["user", "admin"], icon: "machine", path: "/admin/operator" },
  { text: "订单管理", roles: ["admin"], icon: "order", path: "/admin/device" },
];

// 过滤有权限的路由
const role = "admin";
const cloneData = DeepClone(baseNavList)

function filterData(data) {
  for (let index = 0; index < data.length; index++) {
    const ele = data[index];
    if (!ele.roles.includes(role)) {
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