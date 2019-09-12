<template>
  <div>
    <a-tabs defaultActiveKey="1" type="card">
      <a-tab-pane tab="在院病人情况" key="1" forceRender>
        <div style="background-color: #ececec; padding: 20px;" >
          <a-row :gutter="12">
            <a-col :span="8">
              <a-table
                :columns="columns"
                :dataSource="data"
                bordered
                :pagination="false"
                style="background-color: white;"
              ></a-table>
            </a-col>
            <a-col :span="16">
              <bar :data="barData2" title="在院患者" style="background-color: white;" />
              <bar :data="barData" title="感染患者" style="background-color: white;" />
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="感染率变化情况" key="2" >
        <div style="background-color: #ececec; padding: 20px;">
          <a-row :gutter="12">
            <a-col :span="8">
              <a-table
                :columns="columns"
                :dataSource="data"
                bordered
                :pagination="false"
                style="background-color: white;"
              ></a-table>
            </a-col>
            <a-col :span="16">
              <line-chart :data="lineData2" title="在院患者" style="background-color: white;" />
              <line-chart :data="lineData" title="感染患者" style="background-color: white;" />
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Bar, LineChart } from '@/components'
import { getGeneralList } from '@/api/general'
const columns = [{
  title: '科室名称',
  dataIndex: 'dept',
  width: '30%',
  scopedSlots: { customRender: 'dept' }
}, {
  title: '在院人数',
  dataIndex: 'inNum',
  width: '25%',
  scopedSlots: { customRender: 'inNum' }
}, {
  title: '感染人数',
  dataIndex: 'infectionNum',
  width: '25%',
  scopedSlots: { customRender: 'infectionNum' }
}, {
  title: '感染率',
  dataIndex: 'key',
  width: '20%',
  customRender: (text, row, index) => {
    return ((row.infectionNum) / (row.inNum) * 100).toFixed(2) + '%'
  }
}]

const barData = []
const barData2 = []

for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 40)
  })
}
for (let i = 0; i < 12; i += 1) {
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 40) + 40
  })
}

const lineData = []
const lineData2 = []

for (let i = 0; i < 12; i += 1) {
  lineData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 40)
  })
}
for (let i = 0; i < 12; i += 1) {
  lineData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 40) + 40
  })
}
export default {
  components: {
    Bar,
    LineChart
  },
  data () {
    // this.cacheData = data.map(item => ({ ...item }))
    return {
      loading: true,
      data: [],
      columns,
      barData,
      barData2,
      lineData,
      lineData2
    }
  },
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    fetch () {
      getGeneralList().then(res => {
        this.data = res.result.data
      })
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    this.fetch()
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
