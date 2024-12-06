<template>
    <div class="lister">
        <h2>Administrations Produits</h2>

        <ListerComp 
            :is-admin="true"
            @product-selected="selectProduct">
            <ProductComp
                v-if="!newProductMode"
                :index="productCount"
                @selected="newProductMode = true"
                :disabled="editProductMode"
            >
                <template #label>
                    <span class="name">Nouveau Produit</span>
                </template>
                <template #default>
                    <span class="price">+</span>
                </template>
            </ProductComp>
            <li v-else>
                <CustomForm 
                    :fields="formFields"
                    :submitButtonText="'Ajouter'"
                    @success="newProduct"
                    style="margin-bottom: 1em;"
                />
                <button class="cancel" @click="newProductMode = false">Annuler</button>
            </li>
        </ListerComp>

        <div class="admin-tools" ref="adminMouse">
            <div class="admin-controls">
                <h3>Contrôlles Admin</h3>

                <label class="sales-toggle">
                    Activer les soldes

                    <input 
                        type="checkbox"
                        v-model="sales"
                        @change="updateSales"
                    />
                    <span class="checkmark"></span>
                </label>

                <button @click="augmentPrice(4)">Augmenter Prix</button>
                <button @click="reduicePrice">Réduire Prix</button>
            </div>

            <div class="product-editor" v-show="!newProductMode">
                <h3 style="margin-bottom: 1em;">Editer un Produit</h3>

                <CustomForm
                    :fields="formFields"
                    :submitButtonText="'Editer'"
                    @success="updateProduct"
                />

                <button @click="deleteProduct">Supprimer</button>
            </div>

            <div v-if="false" class="store-selector">
                <select
                    v-model="storeOption"
                    @change="updateSelectedStore"
                >
                    <option value="Product">Produit</option>
                    <option value="Book">Livre</option>
                </select>
            </div>

            <p>{{ x }} | {{ y }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import ListerComp from '@/components/ListerComp.vue';
import ProductComp from '@/components/ProductComp.vue';
import CustomForm from '../form/CustomForm.vue';
import { requiredPositiveNumber, requiredText } from '@/helper/validationHelper';
import { useMouse } from '@/composable/MouseCompose';

const store = useStore();
const selectedStore = computed(() => store.getters.getSelectedStore);
const selectedStorePlu = computed(() => store.getters.getSelectedStorePlu);
const selectedStoreMinPlu = computed(() => store.getters.getSelectedStoreMinPlu);

//Controlles Admin
const storeSalesValue = computed(() => store.getters[`${selectedStoreMinPlu.value}/getSales`]);
const sales = ref(storeSalesValue.value);
const updateSales = () => {
    store.dispatch(`${selectedStoreMinPlu.value}/updateSales`, sales.value);
}
const augmentPrice = amount => {
    store.dispatch(`${selectedStoreMinPlu.value}/augmentPrice`, amount);
}
const reduicePrice = () => {
    store.dispatch(`${selectedStoreMinPlu.value}/reduicePrice`);
}

//Gestion Formulaire
const newProductMode = ref(false);
const editProductMode = ref(false);
const formFields = reactive([
    {
        placeholder: 'Nom Produit...',
        type: 'text', 
        value: null, 
        rules: [requiredText]
    }, 
    {
        placeholder: 'Prix Produit...',
        type: 'number', 
        value: null, 
        rules: [requiredPositiveNumber], 
        step: .01
    }
]);

//Ajouter Produit
const productCount = computed(() => store.getters[`${selectedStoreMinPlu.value}/count${selectedStorePlu.value}`]);
const newProduct = result => {
    const product = {};
    const keys = ['name', 'price'];

    for(var i = 0; i < result.length; i++) {
        product[keys[i]] = result[i];
    }

    store.dispatch(`${selectedStoreMinPlu.value}/add${selectedStore.value}`, product);
    formFields[0].value = null;
    formFields[1].value = null;
    newProductMode.value = false;
}

//Editer Produit
const selectedIndex = ref(null);
const selectedId = ref(null)
const selectProduct = payload => {
    if(!newProductMode.value) {
        editProductMode.value = true;

        selectedIndex.value = payload.index;
        selectedId.value = payload.id;
        
        const storeProd = store.getters[`${selectedStoreMinPlu.value}/get${selectedStore.value}`](payload.index);

        formFields[0].value = storeProd.name;
        formFields[1].value = storeProd.price;
    }
}
const updateProduct = result => {
    if(selectedIndex.value != null) {
        store.dispatch(`${selectedStoreMinPlu.value}/update${selectedStore.value}`, {
            id: selectedId.value,
            name: result[0], 
            price: result[1]
        })

        selectedId.value = null;
        selectedIndex.value = null;
        formFields[0].value = null;
        formFields[1].value = null;
        editProductMode.value = false;
    }
}

//Supprimer Produit
const deleteProduct = () => {
    if(selectedIndex.value != null) {
        store.dispatch(`${selectedStoreMinPlu.value}/remove${selectedStore.value}`, selectedId.value);
        
        selectedId.value = null;
        selectedIndex.value = null;
        formFields[0].value = null;
        formFields[1].value = null;
        editProductMode.value = false;
    }
}

//Changement store
const currentStore = computed(() => store.getters.getSelectedStore);
const storeOption = ref(currentStore.value);
const updateSelectedStore = () => {
    selectedIndex.value = null;
    selectedProduct.name = null;
    selectedProduct.price = null;

    store.dispatch('setSelectedStore', storeOption.value);

    sales.value = storeSalesValue.value;
}

const adminMouse = ref(null);
const { x, y } = useMouse(adminMouse);
</script>

<style lang="scss" scoped>
@use '../../scss/global';

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    .cancel {
        @include global.button;
    }

    .admin-tools {
        background: rgba(255, 255, 255, 0.432);
        margin-top: 1em;
        padding: 20px;
        display: flex;
        gap: 10%;

        .admin-controls {
            display: flex;
            flex-direction: column;
            gap: 1em;
            border-right: solid 2px rgb(105, 105, 105);
            padding-right: 10%;

            .sales-toggle {
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                cursor: pointer;
                font-size: 16px;
                user-select: none;

                input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }

                input:checked ~ .checkmark {
                    background-color: #6b662a;
                }

                input:checked ~ .checkmark:after {
                    display: block;
                }

                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 25px;
                    width: 25px;
                    background-color: #eee;

                    &:after {
                        content: "";
                        position: absolute;
                        display: none;
                        left: 9px;
                        top: 5px;
                        width: 5px;
                        height: 10px;
                        border: solid white;
                        border-width: 0 3px 3px 0;
                        transform: rotate(45deg);
                    }
                }

                &:hover input ~ .checkmark {
                    background-color: #ccc;
                }
            }
        }

        .product-editor {
            form {
                display: flex;
                flex-direction: column;
                gap: 1em;
                margin-bottom: 1em;

                input {
                    border: none;
                    font-size: 16px;
                }
            }
        }
    }
}

button {
    @include global.button;
}

</style>