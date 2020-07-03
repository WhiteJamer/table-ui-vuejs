import { getProducts } from '../../api/request'

export default {
    state: {
        products: [],
        isLoading: false,
        error: null,
    },
    getters: {
        allProducts: (state) => {
            return state.products
        },
        
        isLoading: (state) => {
            return state.isLoading
        },

        isError: (state) => {
            return state.error
        },
        error: (state) => {
            return state.error
        }
    },
    mutations: {
        updateProducts(state, payload) {
            state.products = payload
        },

        setLoading(state, payload) {
            state.isLoading = payload
        },

        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async fetchProducts(context) {
            await context.commit("clearError")
            await context.commit('setLoading', true)
            await getProducts().then(products => {
                context.commit("updateProducts", products)
            }).catch(err => {
                context.commit("setError", err)
            })
            context.commit('setLoading', false)
        }
    },
    modules: {}
}