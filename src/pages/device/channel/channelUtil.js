// [
//   {coordinate:'A3'},
//   {coordinate:'A2'},
//   {coordinate:'A1'},
//   {coordinate:'A5'},
//   {coordinate:'B1'},
//   {coordinate:'B2'},
//   {coordinate:'B5'},
//   {coordinate:'D1'},
//   {coordinate:'D3'},
// ]
// 转换为：
// { A:
//   { A1: { coordinate: 'A1' },
//     A2: { coordinate: 'A2' },
//     A3: { coordinate: 'A3' },
//     A4: 'isEmpty',
//     A5: { coordinate: 'A5' } },
//  B:
//   { B1: { coordinate: 'B1' },
//     B2: { coordinate: 'B2' },
//     B3: 'isEmpty',
//     B4: 'isEmpty',
//     B5: { coordinate: 'B5' } },
//  C: 'isEmpty',
//  D: { D1: { coordinate: 'D1' }, D2: 'isEmpty', D3: { coordinate: 'D3' } }}

import {DeepClone} from '@/utils/tool'

// 转换arr为obj，添加C:'isEmpty'
function convertData(originArrData) {
  const cloneData = DeepClone(originArrData)
  cloneData.sort((a, b) => a.coordinate > b.coordinate);
  const resultObjData = {};

  //  获取coor里最后的字符串D
  function findLastStr(strData) {
    const tempArr = [];
    for (const item of strData) {
      tempArr.push(item.coordinate[0]);
    }
    const noRepeatData = [...new Set(tempArr)];
    noRepeatData.sort();
    return noRepeatData[noRepeatData.length - 1];
  }
  const str = findLastStr(originArrData);

  // 生成连续字符串组[ 'A', 'B', 'C', 'D' ]
  function createStrArr(str) {
    const map = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 };
    const mapArr = ["A", "B", "C", "D", "E", "F", "G"];
    const lastNum = map[str];
    const resultArr = [];
    for (let index = 0; index < lastNum; index++) {
      resultArr.push(mapArr[index]);
    }
    return resultArr;
  }
  const strArr = createStrArr(str);

  //  提取字符串ABC做obj的key
  for (let i = 0; i < strArr.length; i++) {
    const el = strArr[i];
    const data = cloneData.filter(item => item.coordinate.startsWith(el));
    const temp = {};
    for (let i = 0; i < data.length; i++) {
      const ele = data[i];
      temp[ele.coordinate] = ele;
    }
    if (Object.keys(temp).length === 0) {
      resultObjData[el] = "isEmpty";
    } else {
      resultObjData[el] = temp;
    }
  }
  return resultObjData;
}

// 添加row中间缺失的数据为 B3:'isEmpty'
function insertMissData(originData) {
  if (originData === "isEmpty") {
    return "isEmpty";
  }
  const dataArr = Object.keys(originData);
  const data = dataArr.slice();
  data.forEach((item, index) => (data[index] = Number(item[1])));
  //连续数字里找出缺少的数  [1,2,3,5]=>[4]
  function findMissNum(arr) {
    arr.sort((a, b) => a > b);
    const tempArr = [];
    for (let index = 0; index < arr[arr.length - 1]; index++) {
      tempArr.push(index + 1);
    }
    const missNum = tempArr.filter(item => !data.includes(item));
    return missNum;
  }
  const num = findMissNum(data);

  num.forEach((item, index) => {
    originData[dataArr[0][0] + num[index]] = "isEmpty";
  });

  const sortArr = Object.keys(originData);
  sortArr.sort((a, b) => a > b);
  const newObj = {};
  for (const item of sortArr) {
    newObj[item] = originData[item];
  }
  return newObj;
}

// 遍历ABCD添加isEmpty
function insertMissObj(originData) {
  const dataArr = Object.keys(originData);
  const resultData = {};
  for (let index = 0; index < dataArr.length; index++) {
    const ele = dataArr[index];
    resultData[ele] = insertMissData(originData[ele]);
  }
  return resultData;
}

export function transferData(propData) {
  const firstConvertData = convertData(propData);
  const finalData = insertMissObj(firstConvertData);
  return finalData;
}




export function strToNum(str) {
  const mapObj = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 };
  return mapObj[str];
}
export function strToRowNum(str) {
  const mapObj = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 };
  return `1-${mapObj[str[0]]}-${str[1]}`;
}
