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
    <a-tab-pane tab="ICU患者呼吸机相关感染监测" key="3">
      <Breath-Machine></Breath-Machine>
    </a-tab-pane>
    <a-tab-pane tab="导尿管拔管指征评估表" key="4">
      <Intubation></Intubation>
    </a-tab-pane>
    <a-tab-pane tab="呼吸机撤机指征评估表" key="5">
      <EvacMachine></EvacMachine>
    </a-tab-pane>
  </a-tabs>
</template>
<script>

import CaseAdd from '@/views/iregister/CaseAdd'
import ICUTarget from '@/views/iregister/list/ICUTarget'
import BreathMachine from '@/views/iregister/list/BreathMachine'
import Intubation from '@/views/iregister/list/Intubation'
import EvacMachine from '@/views/iregister/list/EvacMachine'
export default {
  data () {
    return {
    }
  },
  components: {
    CaseAdd,
    ICUTarget,
    BreathMachine,
    Intubation,
    EvacMachine
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>
