import { createStore } from "vuex";
import products from "./products";

const store = createStore({
    strict: true,
    modules: {
        products
    }
});

export default store;