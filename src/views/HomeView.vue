<template>
  <div class="home">
    <a-input placeholder="🔍 搜尋" :value="appName" @change="onChange" />
    <GrossingAppList :searchName="appName" />
    <TopFreeAppList :searchName="appName" />
  </div>
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
