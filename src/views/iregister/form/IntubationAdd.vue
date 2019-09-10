<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
        <a-button style="margin-left: 8px" @click="goBack()">返回</a-button>
      </a-form-item>
      <a-form-item
        label="诊断"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入诊断' }]}
          ]"
          name="name"
          placeholder="请输入诊断"
        />
      </a-form-item>

      <a-form-item
        label="使用呼吸机方式"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
        help
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">双腔气囊导尿管</a-radio>
          <a-radio :value="2">普通导尿管</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="使用呼吸机方式"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 15}, sm: {span: 17} }"
        :required="false"
        help
      >
        <a-checkbox
          :indeterminate="indeterminate"
          @change="onCheckAllChange"
          :checked="checkAll"
        >Check all</a-checkbox>
        <br />
        <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
      </a-form-item>

      <a-form-item
        label="评价结论"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
        help
      >
        <a-radio-group v-model="value">
          <a-radio :value="1">可以拔管</a-radio>
          <a-radio :value="2">更换导管</a-radio>
          <a-radio :value="3">继续留置的理由</a-radio>
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
const plainOptions = ['可自主排尿', '导尿管阻塞', '导尿管或尿袋破裂', '尿路感染征兆']
const defaultCheckedList = []

export default {
  name: 'BaseForm',
  data () {
    return {
      value: 1,
      // form
      form: this.$form.createForm(this),
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      date: new Date()
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
    getCurrentData () {
      return new Date()
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>
