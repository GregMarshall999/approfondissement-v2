<template>
  <AdminProductViewer />
  <PublicProductViewer />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import AdminProductViewer from './components/viewer/AdminProductViewer.vue';
import PublicProductViewer from './components/viewer/PublicProductViewer.vue';
import { useStore } from 'vuex';

const store = useStore()

onBeforeMount(() => {
  store.dispatch('products/loadProducts');
})
</script>