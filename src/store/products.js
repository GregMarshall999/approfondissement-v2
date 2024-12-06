import { parseHalfPrice } from "@/helper/soldesHelper";
import { createProduct, deleteProduct, findProducts, updateProduct } from "@/service/productService";

const state = {
    products: [], 
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
    }, 
    getSales: state => {
        return state.sales;
    }, 
    findProductPrice: state => payload => {
        const cost = state.products.filter(p => {
            if(p.name == payload) {
                return p.price;
            }
        });

        if(cost.length == 1) {
            if(state.sales) {
                return parseHalfPrice(cost[0].price);
            }
            else {
                return cost[0].price;
            }
        }
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
    }, 
    SET_PRODUCTS: (state, payload) => {
        state.products = payload;
    }
}

const actions = {
    augmentPrice: async (context, payload) => {
        const prods = context.getters.getProducts.map(p => {
            return {
                id: p.id, 
                name: p.name, 
                price: p.price
            }
        });
        
        for(var p of prods) {
            p.price += payload;
            await updateProduct(p.id, p);
        }

        context.dispatch('loadProducts');
    },
    reduicePrice: async context => {
        const prods = context.getters.getProducts.map(p => {
            return {
                id: p.id, 
                name: p.name, 
                price: p.price
            }
        });
        
        for(var p of prods) {
            p.price -= 1;
            await updateProduct(p.id, p);
        }

        context.dispatch('loadProducts');
    }, 
    updateSales: (context, payload) => {
        setTimeout(() => context.commit('SET_SALES', payload), 200);
    }, 
    addProduct: (context, payload) => {
        const prod = { ...payload };

        createProduct(prod).then(res => {
            console.log(res);
            if(res.status == 201) {
                context.dispatch('loadProducts');
            }
        });
    },
    updateProduct: (context, payload) => {
        updateProduct(payload.id, payload)
            .then(res => {
                if(res.status == 200) {
                    context.dispatch('loadProducts');
                }
            });
    }, 
    removeProduct: (context, payload) => {
        deleteProduct(payload).then(res => {
            if(res.status == 200) {
                context.dispatch('loadProducts');
            }
        })
    }, 
    loadProducts: context => {
        findProducts()
            .then(res => {
                context.commit('SET_PRODUCTS', res.data);
            })
            .catch(error => {
                console.error('Error loading product', error);
            })
    }
}

export default {
    namespaced: true,
    state, 
    getters, 
    mutations, 
    actions
}