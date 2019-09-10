
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
        <a-button style="margin-left: 8px" @click="goBack()">返回</a-button>
        <a-button>
          <a-icon type="ellipsis" />
        </a-button>
      </a-button-group>
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
      activeTabKey: '1',
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
    },
    goBack () {
      this.$router.back()
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
