<template>
  <AdminProductViewer />
  <PublicProductViewer />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import AdminProductViewer from './components/AdminProductViewer.vue';
import PublicProductViewer from './components/PublicProductViewer.vue';
import { useStore } from 'vuex';

const store = useStore()

onBeforeMount(() => {
  store.dispatch('products/loadProducts');
})
</script>