<template>
  <a-modal
    title="操作"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    
    
  >
    <page-view
      title="单号：234231029431"
      logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
    >
      <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
        <detail-list-item term="创建人">曲丽丽</detail-list-item>
        <detail-list-item term="订购产品">XX服务</detail-list-item>
        <detail-list-item term="创建时间">2018-08-07</detail-list-item>
        <detail-list-item term="关联单据">
          <a>12421</a>
        </detail-list-item>
        <detail-list-item term="生效日期">2018-08-07 ~ 2018-12-11</detail-list-item>
        <detail-list-item term="备注">请于两个工作日内确认</detail-list-item>
      </detail-list>
      <a-row slot="extra" class="status-list">
        <a-col :xs="12" :sm="12">
          <div class="text">状态</div>
          <div class="heading">待审批</div>
        </a-col>
        <a-col :xs="12" :sm="12">
          <div class="text">订单金额</div>
          <div class="heading">¥ 568.08</div>
        </a-col>
      </a-row>
      <!-- actions -->
      <template slot="action">
        <a-button-group style="margin-right: 4px;">
          <a-button>操作</a-button>
          <a-button>操作</a-button>
          <a-button>
            <a-icon type="ellipsis" />
          </a-button>
        </a-button-group>
        <a-button type="primary">主操作</a-button>
      </template>
    </page-view>
  </a-modal>
</template>

<script>
export default {
  name: 'DetailsModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () { },
  methods: {
    add (id) {
      this.edit({ parentId: id })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...record })
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    }
  }
}
</script>
