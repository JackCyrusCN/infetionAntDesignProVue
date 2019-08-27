<template>
  <div>
    <div id="printMe" style="background:red;">
      <p>葫芦娃，葫芦娃</p>
      <p>一根藤上七朵花</p>
      <p>小小树藤是我家 啦啦啦啦</p>
      <p>叮当当咚咚当当 浇不大</p>
      <p>叮当当咚咚当当 是我家</p>
      <p>啦啦啦啦</p>
      <p>...</p>
      <a-row>
        <a-col :md="4" :sm="0"></a-col>
        <a-col :md="2" :sm="4">住院号:</a-col>
        <a-col :md="2" :sm="4">fgsd</a-col>
        <a-col :md="2" :sm="4">姓名:</a-col>
        <a-col :md="2" :sm="4">dasfdf</a-col>
        <a-col :md="4" :sm="0"></a-col>
      </a-row>
    </div>

    <button v-print="'#printMe'">Print local range</button>
  </div>
</template>
