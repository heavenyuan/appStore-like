<template>
  <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="topFreeAppList">
    <template #loadMore>
      <div v-if="!initLoading && !loading" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-button @click="onLoadMore">loading more</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta :description="item.category.attributes.label">
            <template #title>
              <p>{{ item['im:name'].label }}</p>
            </template>
            <template #avatar>
              <a-avatar :src="item['im:image'][0].label" />
            </template>
          </a-list-item-meta>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  searchName: {
    type: String,
    default: '',
  },
})

const store = useStore()

const count = 100
const initLoading = ref(false)
const loading = ref(false)
const topFreeAppList = computed(() => {
  const searchName = props.searchName.toLowerCase()
  const filter = store.getters['data/topFreeAppList'].filter(item => {
    return (
      item['im:name'].label.toLowerCase().includes(searchName) ||
      item.summary.label.toLowerCase().includes(searchName) ||
      item.title.label.toLowerCase().includes(searchName)
    )
  })
  return filter
})

const onLoadMore = () => {
  loading.value = true
  // store.dispatch('data/getTopFreeAppList', count)
}

onMounted(() => {
  store.dispatch('data/getTopFreeAppList', count)
})
</script>

<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
