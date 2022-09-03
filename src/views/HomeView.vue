<template>
  <a-layout id="components-layout-demo-fixed" class="home">
    <a-layout-header class="header">
      <a-input placeholder="🔍 搜尋" :value="appName" @change="onChange" />
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <GrossingAppList :searchName="appName" />
      <TopFreeAppList :searchName="appName" />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import GrossingAppList from '@/components/GrossingAppList.vue'
import TopFreeAppList from '@/components/TopFreeAppList.vue'

const appName = ref('')

const onChange = e => {
  const { value } = e.target
  appName.value = value
}
</script>

<style lang="scss" scoped>
.home {
  background: #fff;
}

.header {
  position: fixed;
  z-index: 1;
  width: 100%;
}
</style>
