<template>
  <a-list :grid="{ gutter: 16, column: 4 }" :data-source="grossingAppList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-avatar :src="item['im:image'][0].label" />
        <a-list-item-meta :description="item.category.attributes.label">
          <template #title>
            <p>{{ item['im:name'].label }}</p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { computed, onMounted, defineProps } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  searchName: {
    type: String,
    default: '',
  },
})

const store = useStore()
const grossingAppList = computed(() => {
  const searchName = props.searchName.toLowerCase()
  const filter = store.getters['data/grossingAppList'].filter(item => {
    return (
      item['im:name'].label.toLowerCase().includes(searchName) ||
      item.summary.label.toLowerCase().includes(searchName) ||
      item.title.label.toLowerCase().includes(searchName)
    )
  })
  return filter
})

onMounted(() => {
  store.dispatch('data/getGrossingAppList')
})
</script>

<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
