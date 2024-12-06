<template>
    <div class="viewer">
        <h2>Produits Disponibles</h2>

        <div style="display: flex; gap: 10%;">
            <ListerComp 
                @product-selected="addToCart"
                style="width: 50%;"
            />
            <UserCartComp />
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import ListerComp from './ListerComp.vue';
import UserCartComp from './UserCartComp.vue';

const store = useStore();

const addToCart = payload => {
    const product = store.getters['products/getProduct'](payload.index);

    if(product) {
        store.dispatch('cart/putInCart', product.name);
    }
}

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