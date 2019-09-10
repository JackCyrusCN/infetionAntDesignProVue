<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">打印</a-button>
        <a-button style="margin-left: 8px" @click="goBack()">返回</a-button>
      </a-form-item>
      <a-form-item
        label="诊断"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'diagnose',
            {rules: [{ required: true, message: '请输入诊断' }]}
          ]"
          name="name"
          placeholder="请输入诊断"
        />
      </a-form-item>
      <a-form-item
        label="插管类型"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">面罩</a-radio>
          <a-radio :value="2">气管插管</a-radio>
          <a-radio :value="3">气管切开</a-radio>
          <a-radio :value="4">经鼻插管</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="撤机前提"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 15}, sm: {span: 17} }"
        :required="false"
        help
      >
        <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全部</a-checkbox>
        <br />
        <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
      </a-form-item>

      <a-form-item
        label="自主呼吸能力"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 15}, sm: {span: 17} }"
        :required="false"
        help
      >
        <a-checkbox
          :indeterminate="indeterminate2"
          @change="onCheckAllChange2"
          :checked="checkAll2"
        >全部</a-checkbox>
        <br />
        <a-checkbox-group :options="plainOptions2" v-model="checkedList2" @change="onChange2" />
      </a-form-item>

      <a-form-item
        label="预测脱机"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-checkbox @change="onChange3">3min自主呼吸实验(SBT)</a-checkbox>
      </a-form-item>

      <a-form-item
        label="停用指征"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-checkbox @change="onChange4">3min自主呼吸通过后,继续自主呼吸30～120 min</a-checkbox>
      </a-form-item>

      <a-form-item
        label="评价结论"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
        help
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">可以撤机</a-radio>
          <a-radio :value="2">延缓撤机</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="评估人"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '评估人' }]}
          ]"
          name="name"
          placeholder="请输入评估人"
        />
      </a-form-item>

      <a-form-item
        label="评估时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-date-picker
          format="YYYY-MM-DD HH:mm:ss"
          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          :defaultValue="moment(getCurrentData())"
        />
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import moment from 'moment'
const plainOptions = ['肺部感染得到控制', '酸碱及水电解质紊乱已经纠正', '纠正低蛋白血症', '维持适当氧输送能力', '保持气道畅通']
const defaultCheckedList = []

const plainOptions2 = ['最大吸气压力>20cmH2O', '最大吸气负压<30cmH2O', 'PaO2>60mmHg(FiO2<0.35)', 'PaO2/ FiO2>200㎜Hg',
  '保持VT>5ml/Kg,RR<25～35次/分气道畅通', '每分通气量<10L/min', '动脉血氧分压>300 吸氧浓度=100%', '无效腔,潮气量之比<0.55～0.6',
  '浅快呼吸指数(RVR)<100 min/L']
const defaultCheckedList2 = []

export default {
  name: 'BaseForm',
  data () {
    return {
      form: this.$form.createForm(this),
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      value: 1,
      checkedList2: defaultCheckedList2,
      indeterminate2: true,
      checkAll2: false,
      plainOptions2
    }
  },
  methods: {
    moment,
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    },
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    onChange2 (checkedList) {
      this.indeterminate2 = !!checkedList.length && (checkedList.length < plainOptions2.length)
      this.checkAll2 = checkedList.length === plainOptions2.length
    },
    onCheckAllChange2 (e) {
      Object.assign(this, {
        checkedList2: e.target.checked ? plainOptions2 : [],
        indeterminate2: false,
        checkAll2: e.target.checked
      })
    },
    getCurrentData () {
      return new Date()
    },
    onChange3 (e) {
      // console.log(`checked = ${e.target.checked}`)
    },
    onChange4 (e) {
      // console.log(`checked = ${e.target.checked}`)
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>
