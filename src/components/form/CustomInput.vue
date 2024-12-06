<template>
    <input 
        :placeholder="placeholder"
        :type="type"
        v-model="model"
        :class="{ error: hasErrors }"
        :step="step"
    />
    <slot></slot>
</template>

<script setup>

const props = defineProps({
    placeholder: {
        type: String, 
        required: true
    }, 
    type: {
        type: String, 
        required: true
    }, 
    hasErrors: Boolean,
    step: Number
});

const model = defineModel();

</script>

<style scoped>

.error {
    border: solid 1px red;
}

</style>