<template>
  <div>
    <a-tabs defaultActiveKey="1" type="card">
      <a-tab-pane tab="干预措施" key="1" forceRender>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-list size="small" bordered :dataSource="dayList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a @click="showInfo(item)">{{ item }}</a>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="16">
            <div style="text-align: center;">
              {{ data }}
            </div>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="其他" key="2" forceRender>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-list size="small" bordered :dataSource="weekList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a @click="showInfo(item)">{{ item }}</a>
              </a-list-item>
            </a-list>
          </a-col>
          <a-col :span="16"></a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getInterveneList } from '@/api/intervene'

const dayList = [
  '目标性监测与干预措施降低VAP',
  '外科手术部位感染监测',
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

export default {
  data () {
    return {
      dayList,
      weekList,
      data: ''
    }
  },
  methods: {
    showInfo (item) {
      console.log('showInfo' + item)
    },
    fetch () {
      const param = {}
      param.title = '目标性监测与干预措施降低VAP'
      getInterveneList(param).then(res => {
        console.log('res==>' + res)
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
