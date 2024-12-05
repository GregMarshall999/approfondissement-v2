import { parseHalfPrice } from "@/helper/soldesHelper";

const state = {
    products: [
        { name: 'Bananes', price: 2 }, 
        { name: 'Pommes', price: 1 },
        { name: 'Salade', price: 3 },
        { name: 'Abricots', price: 2.33 }
    ], 
    sales: false
};

const getters = {
    getProducts: state => {
        if(!state.sales) {
            return state.products;
        }

        let soldes = state.products.map(p => {
            return {
                name: `**${p.name}**`, 
                price: parseHalfPrice(p.price)
            }
        });
        return soldes;
    }, 
    getProduct: state => payload => {
        return state.products[payload];
    }, 
    countProducts: state => {
        return state.products.length;
    }
};

const mutations = {
    AUGMENT_PRICES: (state, payload) => {
        state.products.forEach(p => p.price += payload);
    },
    REDUICE_PRICES: state => {
        state.products.forEach(p => p.price -= 1);
    }, 
    SET_SALES: (state, payload) => {
        state.sales = payload;
    }, 
    PUSH_PRODUCT: (state, payload) => {
        state.products.push(payload);
    },
    SET_PRODUCT: (state, payload) => {
        state.products[payload.index] = payload.product;
    },
    DELETE_PRODUCT: (state, payload) => {
        state.products.splice(payload, 1);
    }
}

const actions = {
    augmentPrice: (context, payload) => {
        setTimeout(() => context.commit('AUGMENT_PRICES', payload), 500);
    },
    reduicePrice: context => {
        setTimeout(() => context.commit('REDUICE_PRICES'), 1000);
    }, 
    updateSales: (context, payload) => {
        setTimeout(() => context.commit('SET_SALES', payload), 200);
    }, 
    addProduct: (context, payload) => {
        context.commit('PUSH_PRODUCT', payload);
    },
    updateProduct: (context, payload) => {
        context.commit('SET_PRODUCT', payload);
    }, 
    removeProduct: (context, payload) => {
        context.commit('DELETE_PRODUCT', payload);
    }
}

export default {
    namespaced: true,
    state, 
    getters, 
    mutations, 
    actions
}