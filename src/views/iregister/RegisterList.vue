<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="感染病历" key="1">
      <p>感染病历</p>
      <case-add></case-add>
    </a-tab-pane>
    <a-tab-pane tab="ICU目标性监测" key="2">
      <p>ICU目标性监测</p>
      <ICU-Target></ICU-Target>
    </a-tab-pane>
    <a-tab-pane tab="ICU患者呼吸机相关感染监测" key="3">ICU患者呼吸机相关感染监测</a-tab-pane>
    <a-tab-pane tab="导尿管拔管指征评估表" key="4">导尿管拔管指征评估表</a-tab-pane>
    <a-tab-pane tab="呼吸机撤机指征评估表" key="5">呼吸机撤机指征评估表</a-tab-pane>
  </a-tabs>
</template>
<script>

import CaseAdd from '@/views/iregister/CaseAdd'
import ICUTarget from '@/views/iregister/list/ICUTarget'
export default {
  data () {
    return {
    }
  },
  components: {
    CaseAdd,
    ICUTarget
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>
