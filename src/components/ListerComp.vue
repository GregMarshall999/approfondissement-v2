<template>
    <ul :class="isAdmin ? 'admin' : 'default'">
        <ProductComp 
            v-for="(p, index) in products"
            :index="index"
            :id="p.id"
            @selected="prodSelected"
        >
            <template #label>
                <span>{{ p.name }}</span>
            </template>
            <template #default>
                <span class="price">{{ p.price }}€</span>
            </template>
        </ProductComp>
        <slot></slot>
    </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ProductComp from './ProductComp.vue';

const store = useStore();

const selectedStorePlu = computed(() => store.getters.getSelectedStorePlu);
const selectedStoreMinPlu = computed(() => store.getters.getSelectedStoreMinPlu);

const products = computed(() => store.getters[`${selectedStoreMinPlu.value}/get${selectedStorePlu.value}`]);

const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['productSelected']);
const prodSelected = payload => {
    emit('productSelected', payload);
}
</script>

<style lang="scss">
@use '../scss/productStyle';

.admin {
    @include productStyle.product-style(
        $li-display: inline-block,
        $li-background: rgba(255, 255, 255, 0.432), 
        $li_hover-background: rgba(255, 255, 255, 0.205),
        $li_price-display: initial, 
        $li_price-color: #e8260c, 
        $li_price-marginLeft: 4px
    );
}

.default {
    @include productStyle.product-style;
}

</style>