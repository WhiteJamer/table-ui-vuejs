import { getProducts } from '../../api/request'
import _ from 'lodash';

const paginate = (data, pageNumber, pageLimit) => {
    const start = pageNumber * pageLimit
    const end = start + pageLimit
    return data.slice(start, end)
}
export default {
    state: {
        products: [],
        sortBy: 'DEFAULT',
        sortType: 'desc',
        pageNumber: 0,
        pageLimit: 10,
        isLoading: false,
        error: null,
        primaryColumn: 'product',
        allColumns: [{ id: 1, tag: 'product', name: 'Product(100g serving)' }, { id: 2, tag: 'calories', name: 'Calories' }, { id: 3, tag: 'fat', name: 'Fat (g)' }, { id: 4, tag: 'carbs', name: 'Carbs (g)' }, { id: 5, tag: 'protein', name: 'Protein (g)' }, { id: 6, tag: 'iron', name: 'Iron (%)' }],
        selectedColumns: [{ id: 1, tag: 'product', name: 'Product(100g serving)' }, { id: 2, tag: 'calories', name: 'Calories' }, { id: 3, tag: 'fat', name: 'Fat (g)' }, { id: 4, tag: 'carbs', name: 'Carbs (g)' }, { id: 5, tag: 'protein', name: 'Protein (g)' }, { id: 6, tag: 'iron', name: 'Iron (%)' }]
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
                default: return paginate(state.products, state.pageNumber, state.pageLimit)
            }
        },
        productsCount: (state) => {
            return state.products.length
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
        selectedColumns: (state) => {
            return state.selectedColumns
        },
        allColumns: (state) => {
            return state.allColumns
        },
        selectedColumnsCount: (state) => {
            return state.selectedColumns.length
        },

        pageNumber: (state) => {
            return state.pageNumber
        },
        allPages: (state) => {
            const dataLength = state.products.length
            return Math.ceil(dataLength / state.pageLimit)
        },
        pageLimit: (state) => {
            return state.pageLimit
        },
        pageStepFrom: (state) => {
            return (((state.pageNumber * state.pageLimit) - state.pageLimit) + state.pageLimit)
        },
        pageStepTo: (state, getters) => {
            return getters.productsCount
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
        updateSelectedColumns(state, payload) {
            state.selectedColumns = payload
        },

        prevPage(state) {
            state.pageNumber--
        },
        nextPage(state) {
            state.pageNumber++
        },

        selectPage(state, payload) {
            state.pageNumber = payload
        },

        switchPerPage(state, payload) {
            state.pageLimit = payload
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
        },

        prevPage(ctx) {
            if (ctx.state.pageNumber > 0) {
                ctx.commit('prevPage')
            }
        },
        nextPage(ctx) {
            if (ctx.state.pageNumber < ctx.getters.allPages - 1) {
                ctx.commit('nextPage')
            }
        },
        switchPerPage(ctx, payload) {
            ctx.commit("selectPage", 0) // возвращаем к нулевой странице
            ctx.commit("switchPerPage", payload)
        },

        changeSelectedColumns(ctx, payload) {
            ctx.commit("updateSelectedColumns", payload)
        }
    }
}