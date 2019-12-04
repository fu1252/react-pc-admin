import allPermission from './allPermission'
import {setLocalStorage,getLocalStorage} from '@/utils/storage'


// "operation-deviceList-set-task-edit"  转换为  'a-d-s-t-e'
function createAbbr(arr) {
  const temp = arr.split("-");
  const resultArr = [];
  for (const item of temp) {
    resultArr.push(item.charAt(0));
  }
  return resultArr.join("-");
}

// 数组转化为：
// {  
//    'o-d-s-s': 'operation-deviceList-set-sale',
//    'o-d-s-s-r': 'operation-deviceList-set-sale-read',
//    'o-d-s-s-e': 'operation-deviceList-set-sale-edit',
//     o: 'order',
//    'o-d': 'operation-device',
//    'o-d-r': 'operation-device-read',
//    'o-d-a': 'operation-device-add',
//  }
function createMap(arr) {
  const resultObj = {};
  for (const item of arr) {
    const str = createAbbr(item);
    resultObj[str] = item;
  }
  return resultObj;
}
const allMapPermission = createMap(allPermission);


// 返回是否隐藏元素的true|false
 function examAuth(eleAuthAbbrStr, userAuthList) {
  const fullStr = allMapPermission[eleAuthAbbrStr];
  if (userAuthList.length > 0) {
    const noPermission = allPermission.filter(item => !userAuthList.includes(item));
    return noPermission.includes(fullStr);
  } else {
    return true;   // 默认不显示元素
  }
}

export default examAuth



// 设置用户拥有哪些权限
export function saveUserAuth(selectedList){
  const isAllCheck=selectedList.some(item=>item==='all')
  if(isAllCheck){
    console.log('全选');
    setLocalStorage('userAuth','allAuth')
  }else{
    setLocalStorage('userAuth',selectedList)
  }
}
// 获取用户权限
export function getUserAuth(){
  const value=getLocalStorage('userAuth')
  if(!value){console.log('没有用户权限信息');return}
  if(value==='allAuth'){
    return allPermission
  }else{return value}
}

export function getUserSubNavAuth(){
   const userAuth= getUserAuth()
   const allNavAuth=[]
   for (const item of userAuth) {
     if(!item.includes('-')){
       allNavAuth.push(item)
     }
   }
   return allNavAuth
}