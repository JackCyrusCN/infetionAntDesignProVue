<template>
  <div>
    <a-tabs defaultActiveKey="1" type="card">
      <a-tab-pane tab="日报" key="1" forceRender>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-list size="small" bordered :dataSource="dayList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a @click="showInfo(item)">{{ item }}</a>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="16">
            <a-table
              :columns="columns"
              :dataSource="data"
              bordered
              :pagination="false"
              style="background-color: white;"
            ></a-table>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="周报" key="2" forceRender>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-list size="small" bordered :dataSource="weekList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a @click="showInfo(item)">{{ item }}</a>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="16">
            <a-table
              :columns="columns"
              :dataSource="data"
              bordered
              :pagination="false"
              style="background-color: white;"
            ></a-table>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="月报" key="3" forceRender>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-list size="small" bordered :dataSource="monthList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a @click="showInfo(item)">{{ item }}</a>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="16">
            <a-table
              :columns="columns"
              :dataSource="data"
              bordered
              :pagination="false"
              style="background-color: white;"
            ></a-table>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="病例分析" key="4" forceRender>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getGeneralList } from '@/api/general'

const dayList = [
  '在院患者感染统计(按当前所在科室)',
  '在院患者感染统计(按感染时所在科室)',
  '感染部位分布',
  '致病菌统计',
  '致病菌标本分布',
  '重点菌药敏分布',
  '危险因素统计',
  '抗生素使用情况统计',
  '费用统计'
]

const weekList = [
  '现患情况与上周比较',
  '一周感染发生情况',
  '感染部位分布',
  '耐药菌统计',
  '重点菌标本分布',
  '使用高等级抗生素未送检人员',
  '使用高等级抗生素无耐药菌人员',
  '多联使用未送检人员',
  '多联使用无耐药菌人员'
]

const monthList = [
  '在院患者感染统计',
  '感染部位分布',
  '致病菌统计',
  '致病菌标本分布',
  '重点菌药敏分布',
  '危险因素统计',
  '抗生素使用情况统计',
  '医生专率',
  '死亡患者感染情况分析',
  '费用统计'
]

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

export default {
  data () {
    return {
      dayList,
      weekList,
      monthList,
      data: [],
      columns
    }
  },
  methods: {
    showInfo (item) {
      console.log('showInfo' + item)
    },
    fetch () {
      getGeneralList().then(res => {
        this.data = res.result.data
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style>
</style>
