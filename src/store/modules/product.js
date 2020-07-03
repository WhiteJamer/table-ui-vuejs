import { getProducts } from '../../api/request'
import _ from 'lodash';

export default {
    state: {
        products: [],
        sortBy: 'DEFAULT',
        isLoading: false,
        error: null,
        primaryColumn: 'product'
    },
    getters: {
        filteredProducts: (state) => {
            switch (state.sortBy) {
                case "product": return _.sortBy(state.products, 'product')
                case "calories": return _.sortBy(state.products, 'calories')
                case "fat": return _.sortBy(state.products, 'fat')
                case "carbs": return _.sortBy(state.products, 'carbs')
                case "protein": return _.sortBy(state.products, 'protein')
                case "iron": return _.sortBy(state.products, 'iron')
                default: return state.products
            }
        },

        isLoading: (state) => {
            return state.isLoading
        },

        isError: (state) => {
            return state.error
        },
        error: (state) => {
            return state.error
        },

        sortBy: (state) => {
            return state.sortBy
        },
        primaryColumn: (state) => {
            return state.primaryColumn
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
        },

        setSortBy(state, payload) {
            state.sortBy = payload
        },

        setPrimaryColumn(state, payload) {
            state.primaryColumn = payload
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