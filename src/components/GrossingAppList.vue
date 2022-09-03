<template>
  <a-empty v-if="grossingAppList.length === 0" />
  <ul class="ul-list">
    <li v-for="item in grossingAppList" :key="item.title.label">
      <a-card class="card" :bordered="false">
        <a-avatar shape="square" class="app-icon" :src="item['im:image'][0].label" />
        <a-card-meta :title="item['im:name'].label" class="card-meta">
          <template v-slot:description>{{ item.category.attributes.label }}</template>
        </a-card-meta>
      </a-card>
    </li>
  </ul>
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

<style lang="scss" scoped>
.ul-list {
  list-style: none;
  display: flex;
  overflow-x: scroll;
}
.card {
  width: 240px;
}
.app-icon {
  width: 128px;
  height: 128px;
  border-radius: 10px;
}
.card-meta {
  margin-top: 8px;
}
@media screen and (max-width: 768px) {
  .card {
    width: 180px;
  }
  .app-icon {
    width: 64px;
    height: 64px;
  }
}
@media screen and (max-width: 540px) {
  .card {
    width: 120px;
  }
  .app-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
