export const scale = {
  moment: {
    range: [0.05, 0.95] // 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
  },
  value: {
    alias: "标题"
  },
  order_finish_count: {
    alias: "地方"
  }
};

export const title = {
  autoRotate: false,
  offset: 60,
  textStyle: {
    fontSize: "12",
    textAlign: "center",
    fill: "#999",
    fontWeight: "bold"
    // rotate:360
  }, // 坐标轴文本属性配置
  position: "end" // 标题的位置，**新增**
};

export const label = {
  formatter(text, item, index) {
    return `￥${text / 100}`;
  }
};
