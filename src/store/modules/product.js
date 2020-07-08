import { getProducts, deleteProducts } from '../../api/request'
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
        selectedColumns: [{ id: 1, tag: 'product', name: 'Product(100g serving)' }, { id: 2, tag: 'calories', name: 'Calories' }, { id: 3, tag: 'fat', name: 'Fat (g)' }, { id: 4, tag: 'carbs', name: 'Carbs (g)' }, { id: 5, tag: 'protein', name: 'Protein (g)' }, { id: 6, tag: 'iron', name: 'Iron (%)' }],
        selectedIds: []
    },
    getters: {
        filteredProducts: (state) => {
            switch (state.sortBy) {
                case "product": return paginate(_.orderBy(state.products, ['product'], [state.sortType]), state.pageNumber, state.pageLimit)
                case "calories": return paginate(_.orderBy(state.products, ['calories'], [state.sortType]), state.pageNumber, state.pageLimit)
                case "fat": return paginate(_.orderBy(state.products, ['fat'], [state.sortType]), state.pageNumber, state.pageLimit)
                case "carbs": return paginate(_.orderBy(state.products, ['carbs'], [state.sortType]), state.pageNumber, state.pageLimit)
                case "protein": return paginate(_.orderBy(state.products, ['protein'], [state.sortType]), state.pageNumber, state.pageLimit)
                case "iron": return paginate(_.orderBy(state.products, ['iron'], [state.sortType]), state.pageNumber, state.pageLimit)
                default: return paginate(state.products, state.pageNumber, state.pageLimit)
            }
        },
        productsCount: (state) => {
            return state.products.length
        },
        allProductsIds: (state) => {
            const ids = state.products.map(item => item.id)
            return ids
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

        selectedIds: (state) => {
            return state.selectedIds
        },
        selectedIdsCount: (state) => {
            return state.selectedIds.length
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
        },

        updateSelectedIds(state, payload) {
            state.selectedIds = payload
        },
        deleteByID: (state, payload) => {
            state.products = state.products.filter(item => item.id !== payload)
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
        },

        changeSelectedIds(ctx, payload) {
            ctx.commit("updateSelectedIds", payload)
        },
        async deleteSelectedProducts(ctx) {
            await ctx.commit("setLoading", true)
            await deleteProducts().then(() => ctx.state.selectedIds.map(id => ctx.commit("deleteByID", id))).catch((err) => alert(`При удалении произошла ошибка: ${err.error}`))
            ctx.commit("setLoading", false)

        }
    }
}