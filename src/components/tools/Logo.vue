<template>
  <div class="logo">
    <router-link :to="{name:'general'}">
      <img alt="Eastwill logo" style="width: 64px; height: 64px" src="../../assets/cloveroenLogo.png">
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '苜蓿草科技',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
