<template>
  {{ states.grossingAppList }}
</template>

<script setup>
// import { Vue } from 'vue'
import { useStore } from 'vuex'
import { computed, onMounted, reactive } from 'vue'

const store = useStore()

const states = reactive({
  topFreeAppList: computed(() => store.getters['data/topFreeAppList']),
  grossingAppList: computed(() => store.getters['data/grossingAppList']),
})

onMounted(() => {
  store.dispatch('data/getTopFreeAppList')
  store.dispatch('data/getGrossingAppList')
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
