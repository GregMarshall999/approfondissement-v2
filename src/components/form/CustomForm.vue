<template>
    <form @submit.prevent="submit">
        <CustomInput
            v-for="(field, index) in fields"
            :placeholder="field.placeholder"
            :type="field.type"
            v-model="field.value"
            :has-errors="errors.has(index)"
            :step="field.step"
        >
            <span 
                class="error"
                v-if="errors.has(index)"
            >
                {{ errors.get(index) }}
            </span>
        </CustomInput>

        <button type="submit">{{ submitButtonText }}</button>
    </form>
</template>

<script setup>
import { reactive } from 'vue';
import CustomInput from './CustomInput.vue';

const props = defineProps({
    fields: {
        type: Array, 
        required: true
    }, 
    submitButtonText: ''
});

const errors = reactive(new Map());
const emit = defineEmits(['success']);
const submit = () => {
    errors.clear();

    const submitResult = [];

    let i = 0;
    for(var field of props.fields) {
        const rulesResult = field.rules.map(rule => rule(field.value));

        for(let res of rulesResult) {
            if(res !== true) {
                errors.set(i, res);
                break;
            }
        }

        submitResult.push(field.value);

        i++;
    }

    if(errors.size === 0) {
        emit('success', submitResult);
    }
}

</script>

<style lang="scss" scoped>
@use '../../scss/global';

form {
    display: flex;
    flex-direction: column;
    gap: 1em;

    .error {
        color: rgb(223, 197, 53);
        background: rgb(100, 97, 97);
        font-weight: bold;
        width: fit-content;
        padding: 1px;
    }

    button {
        @include global.button;
    }
}

</style>