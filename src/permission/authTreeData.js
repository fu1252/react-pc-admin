
//  禁止一个children里所有key的‘-’后的第一个单词重复，  
//  例如：
//    {title:'批量上架',key:'operation-deviceList-BatchShelve'},
//    {title:'批量克隆',key:'operation-deviceList-BatchClone'},

const authTreeData = [
  {
    title: "全部",
    key: "all",
    children: [
      {
        title: "设备管理",
        key: "operation",
        children: [
          {
            title: "机台列表",
            key: "operation-deviceList",
            children: [
              { title: "查看", key: "operation-deviceList-read" },
              { title: "添加机台", key: "operation-deviceList-add" },
              { title: "克隆机台", key: "operation-deviceList-clone" },
              { title: "更多", key: "operation-deviceList-more" },
              { title: "批量上架", key: "operation-deviceList-putAwayOfBatch" },
              { title: "批量克隆", key: "operation-deviceList-BatchClone" },
              {
                title: "设置",
                key: "operation-deviceList-set",
                children: [
                  {
                    title: "商品售卖",
                    key: "operation-deviceList-set-sale",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-sale-read" },
                      { title: "编辑", key: "operation-deviceList-set-sale-edit" }
                    ]
                  },
                  {
                    title: "机台设置",
                    key: "operation-deviceList-set-device",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-device-read" },
                      { title: "编辑", key: "operation-deviceList-set-device-edit" }
                    ]
                  },

                  {
                    title: "横幅列表",
                    key: "operation-deviceList-set-banner",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-banner-read" },
                      { title: "编辑", key: "operation-deviceList-set-banner-edit" }
                    ]
                  },
                  {
                    title: "收款与图标",
                    key: "operation-deviceList-set-icon",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-icon-read" },
                      { title: "编辑", key: "operation-deviceList-set-icon-edit" }
                    ]
                  },
                  {
                    title: "活动优惠",
                    key: "operation-deviceList-set-active",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-active-read" },
                      { title: "编辑", key: "operation-deviceList-set-active-edit" }
                    ]
                  },
                  {
                    title: "补货日记",
                    key: "operation-deviceList-set-log",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-log-read" },
                      { title: "编辑", key: "operation-deviceList-set-log-edit" }
                    ]
                  },
                  {
                    title: "上下架任务流",
                    key: "operation-deviceList-set-task",
                    children: [
                      { title: "查看", key: "operation-deviceList-set-task-read" },
                      { title: "编辑", key: "operation-deviceList-set-task-edit" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "机台组",
            key: "operation-groupOfDevice",
            children: [
              { title: "查看", key: "operation-groupOfDevice-read" },
              { title: "添加", key: "operation-groupOfDevice-add" },
              { title: "编辑", key: "operation-groupOfDevice-edit" },
              { title: "设置", key: "operation-groupOfDevice-set" },
              { title: "删除", key: "operation-groupOfDevice-delete" }
            ]
          }
        ]
      },
      {
        title: "商品管理",
        key: "shop",
        children: [
          { title: "查看", key: "shop-read" },
          { title: "添加商品", key: "shop-add" },
          { title: "编辑商品", key: "shop-edit" },
          { title: "删除商品", key: "shop-delete" },
          { title: "查看商品销量", key: "shop-viewSale" }
        ]
      },
      {
        title: "订单管理",
        key: "order",
        children: [
          { title: "查看", key: "order-read" },
          { title: "打印清单", key: "order-print" },
          { title: "高级查询", key: "order-query" },
          { title: "完成率", key: "order-finishRate" },
          { title: "订单导出", key: "order-export" }
        ]
      },
      {
        title: "账目管理",
        key: "account",
        children: [
          { title: "查看", key: "account-read" },
          { title: "导出月份账目", key: "account-export" },
          { title: "查看每日账目详情", key: "account-perDayAccount" },
          { title: "查看当日机台交易账目", key: "account-currentDayAccount" }
        ]
      },
      {
        title: "营销管理",
        key: "marketing",
        children: [
          {
            title: "礼品管理",
            key: "marketing-gift",
            children: [
              { title: "查看", key: "marketing-gift-read" },
              { title: "新增礼品", key: "marketing-gift-add" },
              { title: "编辑礼品信息", key: "marketing-gift-edit" },
              { title: "删除礼品", key: "marketing-gift-delete" }
            ]
          },
          { title: "终端数据管理", key: "marketing-data" },
          {
            title: "终端赠品管理",
            key: "marketing-present",
            children: [
              { title: "查看", key: "marketing-present-read" },
              { title: "新增赠品活动", key: "marketing-present-add" },
              { title: "生成赠品券", key: "marketing-present-create" },
              { title: "导出赠品券", key: "marketing-present-export" },
              { title: "克隆赠品活动", key: "marketing-present-giftClone" },
              { title: "导出赠品活动", key: "marketing-present-donationExport" },
              { title: "关闭赠品活动", key: "marketing-present-shutdownActivity" }
            ]
          },
          {
            title: "会员促销",
            key: "marketing-memberPromotion",
            children: [
              {
                title: "整机满减",
                key: "marketing-memberPromotion-deviceMinus",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-deviceMinus-read" },
                  { title: "编辑", key: "marketing-memberPromotion-deviceMinus-edit" }
                ]
              },
              {
                title: "优惠券",
                key: "marketing-memberPromotion-coupon",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-coupon-read" },
                  { title: "编辑", key: "marketing-memberPromotion-coupon-edit" }
                ]
              },
              {
                title: "单品免单",
                key: "marketing-memberPromotion-productFree",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-productFree-read" },
                  { title: "编辑", key: "marketing-memberPromotion-productFree-edit" }
                ]
              },
              {
                title: "代金券",
                key: "marketing-memberPromotion-voucher",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-voucher-read" },
                  { title: "编辑", key: "marketing-memberPromotion-voucher-edit" }
                ]
              },
              {
                title: "新人大礼包",
                key: "marketing-memberPromotion-newPeopleGift",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-newPeopleGift-read" },
                  { title: "编辑", key: "marketing-memberPromotion-newPeopleGift-edit" }
                ]
              },
              {
                title: "老客户礼包",
                key: "marketing-memberPromotion-oldPeopleGift",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-oldPeopleGift-read" },
                  { title: "编辑", key: "marketing-memberPromotion-oldPeopleGift-edit" }
                ]
              },
              {
                title: "买一送一",
                key: "marketing-memberPromotion-buyOneSendOne ",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-buyOneSendOne-read" },
                  { title: "编辑", key: "marketing-memberPromotion-buyOneSendOne-edit" }
                ]
              },
              {
                title: "首次关注公众号",
                key: "marketing-memberPromotion-firstFocus",
                children: [
                  { title: "查看", key: "marketing-memberPromotion-firstFocus-read" },
                  { title: "编辑", key: "marketing-memberPromotion-firstFocus-edit" }
                ]
              }
            ]
          },
          {
            title: "线上抽奖活动",
            key: "marketing-lottery",
            children: [
              {
                title: "活动列表",
                key: "marketing-lottery-activityList",
                children: [
                  { title: "查看", key: "marketing-lottery-activityList-read" },
                  { title: "创造抽奖活动", key: "marketing-lottery-activityList-create" }
                ]
              },
              {
                title: "中奖纪录",
                key: "marketing-lottery-winPrizeLog",
                children: [
                  { title: "查看", key: "marketing-lottery-winPrizeLog-read" },
                  { title: "填写快递单号", key: "marketing-lottery-winPrizeLog-fillExpressNum" }
                ]
              }
            ]
          },
          { title: "终端促销", key: "marketing-terminalPromotion" },
          { title: "互动游戏", key: "marketing-game" }
        ]
      },
      {
        title: "会员管理",
        key: "userMember",
        children: [
          { title: "查看", key: "userMember-read" },
          { title: "查看订单", key: "userMember-viewOrder" },
          { title: "查看机台", key: "userMember-deviceRead" },
          { title: "查看商品", key: "userMember-productRead" }
        ]
      },
      {
        title: "数据导出",
        key: "dataExport",
        children: [
          { title: "补货数据", key: "dataExport-replenishment" },
          { title: "订单数据", key: "dataExport-order" },
          { title: "商品数据", key: "dataExport-product" },
          { title: "库存数据", key: "dataExport-inventory" }
        ]
      },
      {
        title: "角色管理",
        key: "role",
        children: [
          {
            title: "子账号(员工)",
            key: "role-sonAccount",
            children: [
              { title: "查看", key: "role-sonAccount-read" },
              { title: "添加子账号", key: "role-sonAccount-add" },
              { title: "编辑子账号", key: "role-sonAccount-edit" },
              { title: "删除子账号", key: "role-sonAccount-delete" },
              { title: "冻结子账号", key: "role-sonAccount-freeze" }
            ]
          },
          {
            title: "合伙人(员工)",
            key: "role-partner",
            children: [
              { title: "查看", key: "role-partner-read" },
              { title: "添加合伙人", key: "role-partner-add" },
              { title: "编辑合伙人", key: "role-partner-edit" },
              { title: "删除合伙人", key: "role-partner-delete" },
              { title: "冻结合伙人", key: "role-partner-freeze" }
            ]
          },
          {
            title: "代理商",
            key: "role-agent",
            children: [
              { title: "查看", key: "role-agent-read" },
              { title: "添加代理商", key: "role-agent-add" },
              { title: "编辑代理商", key: "role-agent-edit" },
              { title: "删除代理商", key: "role-agent-delete" },
              { title: "冻结代理商", key: "role-agent-freeze" },
              {
                title: "设置代理商",
                key: "role-agent-set",
                children: [
                  {
                    title: "设备列表",
                    key: "role-agent-set-deviceList",
                    children: [
                      { title: "查看", key: "role-agent-set-deviceList-read" },
                      { title: "分配机台", key: "role-agent-set-deviceList-allot" },
                      { title: "删除机台", key: "role-agent-set-deviceList-delete" }
                    ]
                  },
                  { title: "订单", key: "role-agent-set-order" }
                ]
              }
            ]
          }
        ]
      },
      { title: "实验室", key: "lab", children: [{ title: "业绩管理", key: "lab-performance" }] },
      { title: "分润管理", key: "profit" }
    ]
  }
];

export default authTreeData;
