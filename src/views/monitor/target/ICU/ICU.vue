<template>
  <div>
    <a-row :gutter="12">
      <a-col :span="4">
        <a-list size="small" bordered :dataSource="list">
          <a-list-item slot="renderItem" slot-scope="item">
            <a @click="showInfo(item)">{{ item.text }}</a>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="20">
        <Breath-machine v-if="curWin===1"></Breath-machine>
        <Patient v-if="curWin===2"></Patient>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import Patient from '@/views/monitor/target/ICU/Patient'
import BreathMachine from '@/views/monitor/target/ICU/BreathMachine'
const list = [
  {
    id: 1,
    text: 'ICU患者呼吸机相关感染监测'
  },
  {
    id: 2,
    text: 'ICU病人目标性监测'
  }
]

export default {
  data () {
    return {
      curWin: 1,
      list
    }
  },
  components: {
    Patient,
    BreathMachine
  },
  methods: {
    showInfo (item) {
      switch (item.id) {
        case 1:
          this.curWin = 1
          break
        case 2:
          this.curWin = 2
          break
        default:
          this.curWin = 1
          break
      }
    }
  }
}
</script>
