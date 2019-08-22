<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item v-for="(item, key) in notifyList" :key="key">
                <a-list-item-meta :title="item.content" :description="item.description">
                  <a-avatar slot="avatar" icon="mail" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">123</a-tab-pane>
          <a-tab-pane tab="待办" key="3">123</a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef">
      <a-badge :count="countNum">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { getNotifyList } from '@/api/message.js'

export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false,
      visible: false,
      countNum: 0,
      notifyList: []
    }
  },
  methods: {
    fetchNotice () {
      if (!this.visible) {
        getNotifyList().then(res => {
          this.notifyList = res.result.data
          this.countNum = this.notifyList.length
        })
        this.loadding = true
        setTimeout(() => {
          this.loadding = false
        }, 100)
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
</style>
