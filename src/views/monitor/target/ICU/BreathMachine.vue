<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <h3>ICU患者呼吸机相关感染监测</h3>
        <a-form layout="horizontal">
          <a-row>
            <div :class="advanced ? null: 'fold'">
              <a-col :md="12" :sm="24">
                <a-form-item label="住院号" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 2}">
                  <a-input v-model="queryParam.username" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item label="入院时间" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 2}">
                  <range-date @change="handleDateChange" ref="createTime"></range-date>
                </a-form-item>
              </a-col>
            </div>
            <span style="float: right; margin-top: 3px;">
              <a-button type="primary" @click="search">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            </span>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator">
        <a-button type="primary" icon="plus">新建</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="delete" />删除
            </a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2">
              <a-icon type="lock" />锁定
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :alert="{ show: true, clear: true }"
        :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
        :scroll="{ x: '200%', y: '300px' }"
      >
        <template v-for="(col, index) in columns" :slot="col.dataIndex" slot-scope="text, record">
          <div :key="index">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col, record)"
            />
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="action" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record)">保存</a>
              <a-divider type="vertical" />
              <a-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a class="edit" @click="() => edit(record)">修改</a>
              <a-divider type="vertical" />
              <a class="delete" @click="() => del(record)">删除</a>
            </span>
          </div>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import RangeDate from '@/components/datetime/RangeDate'
import { getIcuList } from '@/api/monitor.js'

export default {
  name: 'BreathMachine',
  components: {
    STable,
    RangeDate
  },
  data () {
    return {

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '住院号',
          dataIndex: 'zyid',
          fixed: 'left',
          width: '120px'
        },
        {
          title: '姓名',
          dataIndex: 'pname',
          width: '100px'
        },
        {
          title: '诊断',
          dataIndex: 'diagnose',
          width: '180px'
        },
        {
          title: '入院时间',
          dataIndex: 'admissionDate',
          width: '180px'
        },
        {
          title: '入ICU时间',
          dataIndex: 'admIcuDate',
          width: '180px'
        },
        {
          title: '住院天数',
          dataIndex: 'days',
          width: '60px'
        },
        {
          title: '使用呼吸机原因',
          dataIndex: 'reason',
          width: '300px'
        },
        {
          title: '方式',
          dataIndex: 'methods',
          width: '30px'
        },
        {
          title: '用呼吸机时间',
          dataIndex: 'startDate',
          width: '180px'
        },
        {
          title: '停呼吸机时间',
          dataIndex: 'endDate',
          width: '180px'
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '80px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const queryParam = this.queryParam
        var p = new Promise(function (resolve, reject) {
          const params = Object.assign(parameter, queryParam)
          getIcuList(params).then(res => {
            resolve(res.result)
          })
        })
        return p
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
    edit (row) {
      row.editable = true
      // row = Object.assign({}, row)
    },
    // eslint-disable-next-line
    del (row) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.no} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
      row.editable = false
    },
    cancel (row) {
      row.editable = false
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    search () {

    },
    reset () {

    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

<style lang="less" scoped>
h3 {
  text-align: center;
}
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block;
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
