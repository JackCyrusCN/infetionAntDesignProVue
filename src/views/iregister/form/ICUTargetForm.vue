
<template>
  <page-view>
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="姓名">曲丽丽</detail-list-item>
      <detail-list-item term="性别">女</detail-list-item>
      <detail-list-item term="住院号">002451231</detail-list-item>
      <detail-list-item term="入院时间">2018-07-03</detail-list-item>
      <detail-list-item term="入ICU时间">2018-08-07</detail-list-item>
      <detail-list-item term="出院时间"></detail-list-item>
    </detail-list>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button>
          <a-icon type="ellipsis" />
        </a-button>
      </a-button-group>
      <a-button type="primary">主操作</a-button>
    </template>

    <a-card style="margin-top: 24px" :bordered="false" title="诊断信息">
      <detail-list>
        <detail-list-item term="转入ICU诊断"></detail-list-item>
        <detail-list-item term="病史"></detail-list-item>
        <detail-list-item term="基础疾病"></detail-list-item>
        <detail-list-item term="其他症状"></detail-list-item>
        <detail-list-item term="过敏史"></detail-list-item>
      </detail-list>
      <detail-list title="ICU诊断">
        <detail-list-item term="编码">725</detail-list-item>
        <detail-list-item term="名称">2018-08-08</detail-list-item>
        <detail-list-item></detail-list-item>
        <detail-list-item term="编码">725</detail-list-item>
        <detail-list-item term="名称">2018-08-08</detail-list-item>
        <detail-list-item></detail-list-item>
      </detail-list>
      <a-card type="inner" title="感染信息">
        <detail-list title="外科干预" size="small">
          <a-card>
            <a-table
              :columns="columns"
              :dataSource="data"
              :pagination="false"
              :loading="memberLoading"
            >
              <template
                v-for="(col, i) in ['surgeryDate', 'examination']"
                :slot="col"
                slot-scope="text, record"
              >
                <a-input
                  :key="col"
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  :placeholder="columns[i].title"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else>{{ text }}</template>
              </template>
              <template slot="operation" slot-scope="text, record">
                <template v-if="record.editable">
                  <span v-if="record.isNew">
                    <a @click="saveRow(record)">添加</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a @click="saveRow(record)">保存</a>
                    <a-divider type="vertical" />
                    <a @click="cancel(record.key)">取消</a>
                  </span>
                </template>
                <span v-else>
                  <a @click="toggle(record.key)">编辑</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              </template>
            </a-table>
            <a-button
              style="width: 100%; margin-top: 16px; margin-bottom: 8px"
              type="dashed"
              icon="plus"
              @click="newMember"
            >新增记录</a-button>
          </a-card>
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="组名称" size="small" :col="1">
          <detail-list-item
            term="学名"
          >Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</detail-list-item>
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="组名称" size="small" :col="2">
          <detail-list-item term="负责人">付小小</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
        </detail-list>
      </a-card>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'

const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data () {
    return {
      memberLoading: false,
      tabList: [
        {
          key: '1',
          tab: '操作日志一'
        },
        {
          key: '2',
          tab: '操作日志二'
        },
        {
          key: '3',
          tab: '操作日志三'
        }
      ],
      activeTabKey: '1',

      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '执行结果',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      operation1: [
        {
          key: 'op1',
          type: '订购关系生效',
          name: '曲丽丽',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        },
        {
          key: 'op5',
          type: '创建订单',
          name: '汗牙牙',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      operation2: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        }
      ],
      operation3: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      columns: [
        {
          title: '时间',
          dataIndex: 'surgeryDate',
          key: 'surgeryDate',
          width: '20%',
          scopedSlots: { customRender: 'surgeryDate' }
        },
        {
          title: '手术,各种内窥镜检查',
          dataIndex: 'examination',
          key: 'examination',
          width: '60%',
          scopedSlots: { customRender: 'examination' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        {
          key: '1',
          surgeryDate: '2018/02/05',
          examination: 'X光',
          editable: false
        },
        {
          key: '2',
          surgeryDate: '2018/03/05',
          examination: '放射线',
          editable: false
        }
      ]
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        surgeryDate: '',
        examination: '',
        editable: true,
        isNew: true
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, surgeryDate, examination } = record
      if (!surgeryDate || !examination) {
        this.memberLoading = false
        this.$message.error('请填写完整信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    toggle (key) {
      const target = this.data.filter(item => item.key === key)[0]
      target.editable = !target.editable
    },
    getRowByKey (key, newData) {
      const data = this.data
      return (newData || data).filter(item => item.key === key)[0]
    },
    cancel (key) {
      const target = this.data.filter(item => item.key === key)[0]
      target.editable = false
    }
  }
}
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .text {
  }
  .status-list {
    text-align: left;
  }
}
</style>
