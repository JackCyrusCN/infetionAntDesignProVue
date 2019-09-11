<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <a-radio-group name="radioGroup" @change="statusChange" v-model="tstatus">
          <a-radio :value="0">待处理</a-radio>
          <a-radio :value="1">审批</a-radio>
          <a-radio :value="2">排除</a-radio>
        </a-radio-group>
        <s-tree
          :dataSource="warningTree"
          :openKeys.sync="openKeys"
          :search="true"
          @add="handleAdd"
          @click="handleClick"
          @titleClick="handleTitleClick"
        ></s-tree>
        <!-- @add="handleAdd" -->
      </a-col>
      <a-col :span="19">
        <s-table
          ref="table"
          size="small"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :pagination="pagination"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="tstatus === 0">
              <a @click="handleEdit(record)">审批</a>
              <a-divider type="vertical" />
              <a @click="handleEliminate(record)">排除</a>
            </template>
            <template v-if="tstatus === 1">
              <p>审批</p>
            </template>
            <template v-if="tstatus === 2">
              <p>排除</p>
            </template>
          </span>
        </s-table>
      </a-col>
    </a-row>

    <a-drawer width="640" placement="right" :closable="false" @close="onClose" :visible="visible">
      <p :style="[pStyle, pStyle2]">查看患者详情</p>
      <p :style="pStyle">患者信息</p>
      <a-row>
        <a-col :span="12">
          <description-item title="住院号" content="002456123" />
        </a-col>
        <a-col :span="12">
          <description-item title="姓名" content="测试患者" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="入院时间" content="2018-12-12 11:05:21" />
        </a-col>
        <a-col :span="12">
          <description-item title="血常规" content="7/14" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="住院天数" content="15" />
        </a-col>
        <a-col :span="12">
          <description-item title="呼吸机" content="4天" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="术后天数" content="1天" />
        </a-col>
        <a-col :span="12">
          <description-item title="泌尿管插管" content="10天" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <description-item title="总发热" content="0" />
        </a-col>
        <a-col :span="12">
          <description-item title="大静脉插管" content="0天" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <description-item title="入院诊断" content="热血管病" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <description-item title="出院诊断" content />
        </a-col>
      </a-row>
      <a-divider />
    </a-drawer>
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import { getExamineTree, getExamineList } from '@/api/examine'
import descriptionItem from './descriptionItem'

export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    descriptionItem
    // DetailsModal
  },
  data () {
    return {
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      pStyle2: {
        marginBottom: '24px'
      },
      visible: false,
      pagination: {
        pageSizeOptions: ['3', '5', '10', '20', '50', '100']
      },
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '诊断',
          dataIndex: 'in_diagnose'
        },
        {
          title: '检查',
          dataIndex: 'inspect'
        },
        {
          title: '次数',
          dataIndex: 'num',
          sorter: true,
          needTotal: true,
          customRender: text => text + ' 次'
        },
        {
          title: '时间',
          dataIndex: 'periods_time',
          width: '100px',
          needTotal: true
        },
        {
          title: '天数',
          dataIndex: 'days',
          sorter: true,
          customRender: text => text + ' 天'
        },
        {
          title: '发热',
          dataIndex: 'fever',
          sorter: true,
          customRender: text => text + ' 天'
        },
        {
          title: '血常规异常率',
          dataIndex: 'ratio_blood',
          sorter: true
        },
        {
          title: '危险因素',
          dataIndex: 'factor_danger',
          sorter: true
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getExamineList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      warningTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      tstatus: 0
    }
  },
  created () {
    getExamineTree().then(res => {
      this.warningTree = res.result
    })
  },
  methods: {
    onClose () {
      this.visible = false
    },
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      this.$refs.table.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      // this.$message.info(`提示：你点了 ${item.key} - ${item.title} 的查看详情 `)
      this.visible = true
      // this.$refs.modal.add(item.key)
    },
    handleView (item) {
      console.log('view button, item', item)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    // handleSaveOk() {},
    handleSaveClose () { },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleEdit (row) {
      const caseReport = {
        infectionDiagCode: 'in13',
        etiologicSpecName: '血液',
        preFactor: [
          'diabetes',
          'antibiotic'
        ],
        advice: ''
      }
      console.log(row)
      this.$router.push({ path: '/examine/examine-form', query: { caseReport: caseReport } })
    },
    handleEliminate (row) {
      const caseReport = {
        infectionDiagCode: 'in13',
        etiologicSpecName: '血液',
        preFactor: [
          'diabetes',
          'antibiotic'
        ],
        advice: ''
      }
      console.log(row)
      this.$router.push({ path: '/examine/examine-form', query: { caseReport: caseReport } })
    },
    statusChange (e) {
      console.log(e.target.value)
      this.$refs.table.refresh(true)
    }
  }

}
</script>

<style lang="less">
.custom-tree {
  /deep/ .ant-menu-item-group-title {
    position: relative;
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .ant-menu-item {
    &:hover {
      .btn {
        display: block;
      }
    }
  }

  /deep/ .btn {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    width: 20px;
    height: 40px;
    line-height: 40px;
    z-index: 1050;
    color: red;

    &:hover {
      transform: scale(1.2);
      transition: 0.5s all;
    }
  }
}
</style>
