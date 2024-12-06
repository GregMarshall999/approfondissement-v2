import { parseHalfPrice } from "@/helper/soldesHelper";

const state = {
    books: [
        { name: 'G.O.T', price: 2 }, 
        { name: 'L.O.T.R', price: 1 }
    ], 
    sales: false
};

const getters = {
    getBooks: state => {
        if(!state.sales) {
            return state.books;
        }

        let soldes = state.books.map(p => {
            return {
                name: `**${p.name}**`, 
                price: parseHalfPrice(p.price)
            }
        });
        return soldes;
    }, 
    getBook: state => payload => {
        return state.books[payload];
    }, 
    countBooks: state => {
        return state.books.length;
    }, 
    getSales: state => {
        return state.sales;
    }
};

const mutations = {
    AUGMENT_PRICES: (state, payload) => {
        state.books.forEach(p => p.price += payload);
    },
    REDUICE_PRICES: state => {
        state.books.forEach(p => p.price -= 1);
    }, 
    SET_SALES: (state, payload) => {
        state.sales = payload;
    }, 
    PUSH_BOOK: (state, payload) => {
        state.books.push(payload);
    },
    SET_BOOK: (state, payload) => {
        state.books[payload.index] = payload.product;
    },
    DELETE_BOOK: (state, payload) => {
        state.books.splice(payload, 1);
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
    addBook: (context, payload) => {
        context.commit('PUSH_BOOK', payload);
    },
    updateBook: (context, payload) => {
        context.commit('SET_BOOK', payload);
    }, 
    removeBook: (context, payload) => {
        context.commit('DELETE_BOOK', payload);
    }
}

export default {
    namespaced: true,
    state, 
    getters, 
    mutations, 
    actions
}