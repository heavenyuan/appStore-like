<template>
  <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="vertical" split :data-source="topFreeAppList">
    <template #loadMore>
      <div v-if="!initLoading && !loading && !isCountLimit" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-button @click="onLoadMore">loading more</a-button>
      </div>
    </template>
    <template #renderItem="{ item, index }">
      <li class="card">
        <p>{{ index + 1 }}</p>
        <a-avatar class="app-icon" :src="item['im:image'][0].label" />
        <div class="content">
          <p class="title">{{ item['im:name'].label }}</p>
          <p class="desc">{{ item.category.attributes.label }}</p>
          <div>
            <a-rate :value="2" />
            <span>(123)</span>
          </div>
        </div>
      </li>
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

const count = ref(10)
const limit = 100
const isCountLimit = computed(() => count.value >= limit)
const initLoading = ref(false)
const loading = ref(false)
const topFreeAppList = computed(() => {
  const searchName = props.searchName.toLowerCase()
  const filter = store.getters['data/topFreeAppList'](count.value).filter(item => {
    return (
      item['im:name'].label.toLowerCase().includes(searchName) ||
      item.summary.label.toLowerCase().includes(searchName) ||
      item.title.label.toLowerCase().includes(searchName)
    )
  })
  return filter
})

const onLoadMore = () => (count.value += 10)

onMounted(() => store.dispatch('data/getTopFreeAppList'))
</script>

<style lang="scss" scoped>
$base_size_1: 96px;
$base_size_2: 64px;

.card {
  display: flex;
  align-items: center;
  margin-bottom: 36px;

  > p {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    font-size: 48px;
    color: #ccc;
  }

  > .app-icon {
    width: $base_size_1;
    height: $base_size_1;
    margin: 0 20px;
  }

  > .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 65%;

    p {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      text-align: start;
    }

    > .title {
      font-size: 24px;
      font-weight: bold;
    }

    > .desc {
      color: #ccc;
    }
  }
}

@media screen and (max-width: 540px) {
  .card {
    margin-bottom: 28px;

    > p {
      margin: 0 5px;
      font-size: 24px;
    }

    > .app-icon {
      width: $base_size_2;
      height: $base_size_2;
      margin: 0 10px;
    }

    > .content {
      > .title {
        font-size: 18px;
      }

      > .desc {
        font-size: 16px;
      }
    }
  }
}
</style>
