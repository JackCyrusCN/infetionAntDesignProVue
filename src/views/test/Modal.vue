<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal with customized footer</a-button>
    <a-modal v-model="visible" title="患者病历" :footer="null" width="80%">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="摘要" key="1">
          <a-icon type="hdd" theme="twoTone" />
          <b>呼吸机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="fire" theme="twoTone" />
          <b>发热&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="api" theme="twoTone" />
          <b>中心静脉插管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="pushpin" theme="twoTone" />
          <b>泌尿道插管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="heart" theme="twoTone" />
          <b>血常规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="filter" theme="twoTone" />
          <b>尿常规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="experiment" theme="twoTone" />
          <b>有菌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <a-icon type="medicine-box" theme="twoTone" />
          <b>抗生素&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <div class="parent">
            <div class="child" v-for="(item, key) in 30" :key="key">{{ item }}</div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in breathMachine" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="hdd" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <!-- <div class="child" v-for="(item, key) in 30" :key="key"></div> -->
            <div class="child" v-for="(item, key) in fever" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="fire" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in intubationCenter" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="api" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in intubationUrinary" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="pushpin" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in routinBlood" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="heart" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in routinUrinary" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="filter" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in bacteria" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="experiment" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <div class="parent">
            <div class="child" v-for="(item, key) in antibiotic" :key="key">
              <div v-if="item.flag === 1">
                <a-icon type="medicine-box" theme="twoTone" />
              </div>
              <div v-else></div>
            </div>
          </div>
          <!--<a-row>
            <a-col span="1"  v-for="(item, key) in 30" :key="key"><div border= "1px solid #F00">{{ item }}</div></a-col>
          </a-row>-->
        </a-tab-pane>
        <a-tab-pane tab="汇总" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="干预" key="3">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane tab="感染诊断" key="4">Content of Tab Pane</a-tab-pane>
        <a-tab-pane tab="病历分析" key="5">Content of Tab Pane</a-tab-pane>
        <a-tab-pane tab="患者情况表" key="6">Content of Tab Pane</a-tab-pane>
        <a-tab-pane tab="出入科记录" key="7">Content of Tab Pane</a-tab-pane>
        <a-tab-pane tab="检验" key="8">Content of Tab Pane</a-tab-pane>
        <a-tab-pane tab="检查" key="9">Content of Tab Pane</a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script>
import { getBreathMachine, getFever, getIntubationCenter, getIntubationUrinary, getRoutinBlood, getRoutinUrinary, getBacteria, getAntibiotic } from '@/api/infection'

export default {
  data () {
    return {
      loading: false,
      visible: false,
      breathMachine: [],
      fever: [],
      intubationCenter: [],
      intubationUrinary: [],
      routinBlood: [],
      routinUrinary: [],
      bacteria: [],
      antibiotic: []
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    showModal () {
      this.visible = true
    },
    handleCancel (e) {
      this.visible = false
    },
    showValue () {
      console.log(this.breathMachine)
      console.log(JSON.stringify(this.breathMachine))
    }
  },
  mounted () {
    getBreathMachine().then(res => {
      this.breathMachine = res.result.data
    })
    getFever().then(res => {
      this.fever = res.result.data
    })
    getIntubationCenter().then(res => {
      this.intubationCenter = res.result.data
    })
    getIntubationUrinary().then(res => {
      this.intubationUrinary = res.result.data
    })
    getRoutinBlood().then(res => {
      this.routinBlood = res.result.data
    })
    getRoutinUrinary().then(res => {
      this.routinUrinary = res.result.data
    })
    getBacteria().then(res => {
      this.bacteria = res.result.data
    })
    getAntibiotic().then(res => {
      this.antibiotic = res.result.data
    })
  }
}
</script>

<style>
body,
p {
  margin: 0;
}
.parent {
  display: flex;
}
.child {
  flex: 1;
  height: 25px;
  text-align: center;
  border: 1px solid;
}
/* .child + .child {
  margin-left: 5px;
} */
</style>
