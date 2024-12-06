import { createStore } from "vuex";
import products from "./products";
import books from "./books";
import cart from "./cart";

const state = {
    selectedStore: 'Product'
}

const getters = {
    getSelectedStore: state => {
        return state.selectedStore;
    }, 
    getSelectedStorePlu: state => {
        return `${state.selectedStore}s`;
    }, 
    getSelectedStoreMinPlu: state => {
        return `${state.selectedStore.toLowerCase()}s`
    }
}

const mutations = {
    SET_SELECTED_STORE: (state, payload) => {
        state.selectedStore = payload;
    }
}

const actions = {
    setSelectedStore: (state, payload) => {
        state.commit('SET_SELECTED_STORE', payload);
    }
}

const store = createStore({
    strict: true,
    modules: {
        products, 
        books, 
        cart
    }, 
    state, 
    getters, 
    mutations, 
    actions
});

export default store;