// 格式化标准时间
export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export function formatTime (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 深度拷贝，包含拷贝function
export function DeepClone (obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  const cpObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    cpObj[key] = DeepClone(obj[key])
  };
  return cpObj;
}