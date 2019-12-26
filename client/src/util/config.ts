const tabicon_base_url: string = 'https://7975-yuntest-wcqeq-1300805509.tcb.qcloud.la/tabicon'

const time = new Date()
// 当前年份 月份 周几
const year = time.getFullYear()
const month = time.getMonth() + 1

export {tabicon_base_url, year, month}