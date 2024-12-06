<template>
    <div class="viewer" ref="productMouse">
        <h2>Produits Disponibles</h2>

        <div style="display: flex; gap: 10%;">
            <ListerComp 
                @product-selected="addToCart"
                style="width: 50%;"
            />
            <UserCartComp />
        </div>

        <p>{{ x }} | {{ y }}</p>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import ListerComp from '@/components/ListerComp.vue';
import UserCartComp from '@/components/UserCartComp.vue';
import { useMouse } from '@/composable/MouseCompose';
import { ref } from 'vue';

const store = useStore();

const addToCart = payload => {
    const product = store.getters['products/getProduct'](payload.index);

    if(product) {
        store.dispatch('cart/putInCart', product.name);
    }
}

const productMouse = ref(null);
const { x, y } = useMouse(productMouse);
</script>

<style scoped>

.viewer {
    background: #0c3772c2;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: white;
}

</style>