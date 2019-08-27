<template Enabletheming="false">
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row>
          <div :class="advanced ? null: 'fold'">
            <a-col :md="12" :sm="24">
              <a-form-item label="住院号" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.username" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="入院时间" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 2}">
                <range-date @change="handleDateChange" ref="createTime"></range-date>
              </a-form-item>
            </a-col>
          </div>
          <span style="float: left; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
          </span>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-table
        ref="TableInfo"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        :scroll="{ x: 900 }"
        @change="handleTableChange"
      >
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="addReport(record.pid, record.patientName)">登记</a>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import RangeDate from '@/components/datetime/RangeDate'
import { getCaseList } from '@/api/register'

export default {
  name: 'User',
  components: { RangeDate },
  data () {
    return {
      advanced: false,
      userInfo: {
        visiable: false,
        data: {}
      },
      userAdd: {
        visiable: false
      },
      userEdit: {
        visiable: false
      },
      queryParams: {},
      filteredInfo: null,
      sortedInfo: null,
      paginationInfo: null,
      dataSource: [],
      selectedRowKeys: [],
      loading: false,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '100'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      }
    }
  },
  computed: {
    columns () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      return [
        {
          title: '住院号',
          dataIndex: 'pid',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'pid' && sortedInfo.order
        },
        {
          title: '患者姓名',
          dataIndex: 'patientName',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'patientName' && sortedInfo.order
        },
        {
          title: '性别',
          dataIndex: 'gender',
          customRender: (text, row, index) => {
            switch (text) {
              case '0':
                return '男'
              case '1':
                return '女'
              case '2':
                return '保密'
              default:
                return text
            }
          },
          filters: [
            { text: '男', value: '0' },
            { text: '女', value: '1' },
            { text: '保密', value: '2' }
          ],
          filterMultiple: false,
          filteredValue: filteredInfo.ssex || null
        },
        {
          title: '年龄',
          dataIndex: 'age'
        },
        {
          title: '单位',
          dataIndex: 'ageUnit'
        },
        {
          title: '入院时间',
          dataIndex: 'admissionDate'
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    view (record) {
      this.userInfo.data = record
      this.userInfo.visiable = true
    },
    add () {
      this.userAdd.visiable = true
    },
    handleUserAddClose () {
      this.userAdd.visiable = false
    },
    search () {
      const { sortedInfo, filteredInfo } = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.fetch({
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams,
        ...filteredInfo
      })
    },
    handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    reset () {
      // 取消选中
      this.selectedRowKeys = []
      // 重置分页
      this.$refs.TableInfo.pagination.current = this.pagination.defaultCurrent
      if (this.paginationInfo) {
        this.paginationInfo.current = this.pagination.defaultCurrent
        this.paginationInfo.pageSize = this.pagination.defaultPageSize
      }
      // 重置列过滤器规则
      this.filteredInfo = null
      // 重置列排序规则
      this.sortedInfo = null
      // 重置查询参数
      this.queryParams = {}
      // 清空部门树选择
      this.$refs.deptTree.reset()
      // 清空时间选择
      if (this.advanced) {
        this.$refs.createTime.reset()
      }
      this.fetch()
    },
    handleTableChange (pagination, filters, sorter) {
      // 将这三个参数赋值给Vue data，用于后续使用
      this.paginationInfo = pagination
      this.filteredInfo = filters
      this.sortedInfo = sorter

      this.userInfo.visiable = false
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    fetch (params = {}) {
      // 显示loading
      this.loading = true
      if (this.paginationInfo) {
        // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
        this.$refs.TableInfo.pagination.current = this.paginationInfo.current
        this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize
        params.pageSize = this.paginationInfo.pageSize
        params.pageNum = this.paginationInfo.current
      } else {
        // 如果分页信息为空，则设置为默认值
        params.pageSize = this.pagination.defaultPageSize
        params.pageNum = this.pagination.defaultCurrent
      }
      getCaseList(params).then((r) => {
        const data = r.result
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.dataSource = data.data
        this.pagination = pagination
        // 数据加载完毕，关闭loading
        this.loading = false
      }).catch(err => {
        console.log('err==>' + err)
      })
    },

    addReport (pid, patientName) {
      console.log(patientName)
      this.$router.push({ path: '/iregister/case/add', query: { pid: pid, userName: patientName } })
    }
  }
}
</script>
