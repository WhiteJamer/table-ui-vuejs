import { getProducts } from '../../api/request'
import _ from 'lodash';

export default {
    state: {
        products: [],
        sortBy: 'DEFAULT',
        sortType: 'desc',
        isLoading: false,
        error: null,
        primaryColumn: 'product'
    },
    getters: {
        filteredProducts: (state) => {
            switch (state.sortBy) {
                case "product": return _.orderBy(state.products, ['product'], [state.sortType])
                case "calories": return _.orderBy(state.products, ['calories'], [state.sortType])
                case "fat": return _.orderBy(state.products, ['fat'], [state.sortType])
                case "carbs": return _.orderBy(state.products, ['carbs'], [state.sortType])
                case "protein": return _.orderBy(state.products, ['protein'], [state.sortType])
                case "iron": return _.orderBy(state.products, ['iron'], [state.sortType])
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
        sortType: (state) => {
            return state.sortType
        },

        primaryColumn: (state) => {
            return state.primaryColumn
        },

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
        switchSortType(state) {
            if (state.sortType === 'desc') {
                state.sortType = 'asc'
            }
            else {
                state.sortType = 'desc'
            }
        },

        setPrimaryColumn(state, payload) {
            state.primaryColumn = payload
        },


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