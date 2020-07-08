<template>
  <div id="table" class="table-container">
    <div class="table-top-bar">
      <table class="table">
        <thead>
          <tr>
            <!-- {{selectedIds}} -->
            <th>
              <!-- обработать handleCheckboxAll() -->
              <input
                @change="handleCheckboxAll()"
                type="checkbox"
                name="checkbox_product-all"
                id="checkbox_product-all"
                v-model="isSelectedIdsAll"
                class="input-checkbox"
              />
              <label for="checkbox_product-all"></label>
            </th>

            <!-- Primary column -->
            <th
              v-if="isPrimaryColumn('product') && isIncludesColumn('product')"
              :class="{active: isPrimaryColumn('product')}"
              v-on:click.prevent="switchSortType"
            >
              Product(100g serving)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('calories') && isIncludesColumn('calories')"
              :class="{active: isPrimaryColumn('calories')}"
              v-on:click.prevent="switchSortType"
            >
              Calories
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('fat') && isIncludesColumn('fat')"
              :class="{active: isPrimaryColumn('fat')}"
              v-on:click.prevent="switchSortType"
            >
              Fat (g)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('carbs') && isIncludesColumn('carbs')"
              :class="{active: isPrimaryColumn('carbs')}"
              v-on:click.prevent="switchSortType"
            >
              Carbs (g)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('protein') && isIncludesColumn('protein')"
              :class="{active: isPrimaryColumn('protein')}"
              v-on:click.prevent="switchSortType"
            >
              Protein (g)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('iron') && isIncludesColumn('iron')"
              :class="{active: isPrimaryColumn('iron')}"
              v-on:click.prevent="switchSortType"
            >
              Iron (%)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <!-- END Primary Column -->

            <th
              v-if="!isPrimaryColumn('product') && isIncludesColumn('product')"
              :class="{active: isPrimaryColumn('product')}"
              v-on:click.prevent="setPrimaryColumn('product')"
            >Product(100g serving)</th>
            <th
              v-if="!isPrimaryColumn('calories') && isIncludesColumn('calories')"
              :class="{active: isPrimaryColumn('calories')}"
              v-on:click.prevent="setPrimaryColumn('calories')"
            >Calories</th>
            <th
              v-if="!isPrimaryColumn('fat') && isIncludesColumn('fat')"
              :class="{active: isPrimaryColumn('fat')}"
              v-on:click.prevent="setPrimaryColumn('fat')"
            >Fat (g)</th>
            <th
              v-if="!isPrimaryColumn('carbs') && isIncludesColumn('carbs')"
              :class="{active: isPrimaryColumn('carbs')}"
              v-on:click.prevent="setPrimaryColumn('carbs')"
            >Carbs (g)</th>
            <th
              v-if="!isPrimaryColumn('protein') && isIncludesColumn('protein')"
              :class="{active: isPrimaryColumn('protein')}"
              v-on:click.prevent="setPrimaryColumn('protein')"
            >Protein (g)</th>
            <th
              v-if="!isPrimaryColumn('iron') && isIncludesColumn('iron')"
              :class="{active: isPrimaryColumn('iron')}"
              v-on:click.prevent="setPrimaryColumn('iron')"
            >Iron (%)</th>
            <th></th>
          </tr>
        </thead>

        <div class="align-center-wrapper" v-if="isLoading || isError">
          <div class="loading-box" v-if="isLoading">
            <img src="/loading.gif" alt="loading" />
          </div>
          <div class="err-box" v-if="isError">
            <strong>Ошибка: {{error.error}}</strong>
            <a class="link" href="/" v-on:click.prevent="fetchProducts">Попробовать снова</a>
          </div>
        </div>

        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>
              <input
                @change="handleChangeCheckboxRow"
                type="checkbox"
                :name=" 'product ' + product.id"
                :id=" 'product ' + product.id"
                :value="product.id"
                class="input-checkbox"
                v-model="checkboxSelectedIds"
              />
              <label :for=" 'product ' + product.id"></label>
            </td>

            <!-- Primary column -->
            <td v-if="isPrimaryColumn('product') && isIncludesColumn('product')">{{product.product}}</td>
            <td
              v-else-if="isPrimaryColumn('calories') && isIncludesColumn('calories')"
            >{{product.calories}}</td>
            <td v-else-if="isPrimaryColumn('fat') && isIncludesColumn('fat')">{{product.fat}}</td>
            <td v-else-if="isPrimaryColumn('carbs') && isIncludesColumn('carbs')">{{product.carbs}}</td>
            <td
              v-else-if="isPrimaryColumn('protein') && isIncludesColumn('protein')"
            >{{product.protein}}</td>
            <td v-else-if="isPrimaryColumn('iron') && isIncludesColumn('iron')">{{product.iron}}</td>
            <!-- END Primary Column -->

            <td
              v-if="!isPrimaryColumn('product') && isIncludesColumn('product')"
            >{{product.product}}</td>
            <td
              v-if="!isPrimaryColumn('calories') && isIncludesColumn('calories')"
            >{{product.calories}}</td>
            <td v-if="!isPrimaryColumn('fat') && isIncludesColumn('fat')">{{product.fat}}</td>
            <td v-if="!isPrimaryColumn('carbs') && isIncludesColumn('carbs')">{{product.carbs}}</td>
            <td
              v-if="!isPrimaryColumn('protein') && isIncludesColumn('protein')"
            >{{product.protein}}</td>
            <td v-if="!isPrimaryColumn('iron') && isIncludesColumn('iron')">{{product.iron}}</td>
            <td>
              <a href="/" class="delete-btn" v-on:click.prevent="handleDeleteById(product)">
                <svg
                  class="delete-btn__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M13.2326 1.88398H11.0963V0.495768C11.0963 0.216339 10.8709 0 10.5915 0C10.5644 0 10.5463 0.00905115 10.5375 0.0180816C10.5284 0.00905115 10.5103 0 10.5013 0H5.48046H5.4445H5.40834C5.12893 0 4.91259 0.216339 4.91259 0.495768V1.884H2.76726C2.1542 1.884 1.67651 2.36169 1.67651 2.97475V3.76801V4.75952H2.62302V14.9183C2.62302 15.5314 3.09168 16 3.70474 16H12.2951C12.9082 16 13.3859 15.5314 13.3859 14.9183V4.75952H14.3233V3.76801V2.97475C14.3233 2.36169 13.8455 1.88398 13.2326 1.88398ZM5.90411 0.991515H10.0957V1.88398H5.90411V0.991515ZM12.3853 14.9183C12.3853 14.9816 12.3582 15.0085 12.2951 15.0085H3.70474C3.64167 15.0085 3.61456 14.9816 3.61456 14.9183V4.7595H12.3853V14.9183ZM13.3228 3.76799H2.67706V2.97473C2.67706 2.91164 2.70417 2.8755 2.76724 2.8755H13.2326C13.2957 2.8755 13.3228 2.91164 13.3228 2.97473V3.76799Z"
                      fill="#5B5E77"
                    />
                    <path d="M10.8169 5.92236H9.81635V14.1251H10.8169V5.92236Z" fill="#5B5E77" />
                    <path d="M8.50915 5.92236H7.50861V14.1251H8.50915V5.92236Z" fill="#5B5E77" />
                    <path d="M6.20153 5.92236H5.20099V14.1251H6.20153V5.92236Z" fill="#5B5E77" />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SortDirectionArrow from "./SortDirectionArrow";

export default {
  name: "Table",
  computed: {
    ...mapGetters([
      "filteredProducts",
      "isLoading",
      "isError",
      "error",
      "primaryColumn",
      "selectedColumns",
      "sortType",
      "selectedIds",
      "allProductsIds"
    ])
  },
  data: function() {
    return {
      checkboxSelectedIds: [],
      isSelectedIdsAll: false
    };
  },
  methods: {
    ...mapActions(["fetchProducts", "changeSelectedIds", "deleteByID"]),
    ...mapMutations(["setPrimaryColumn", "switchSortType"]),

    // проверка на то что данный тег указан в store.product.primaryColumn
    isPrimaryColumn(value) {
      return this.primaryColumn === value;
    },

    // проверка массива selectedColumns на наличие переданного тега колонки.
    isIncludesColumn(columnName) {
      let value = false;
      this.selectedColumns.map(item => {
        if (item.tag === columnName) {
          value = true;
        }
      });
      return value;
    },
    handleChangeCheckboxRow() {
      this.isSelectedIdsAll = false; // делаем галочку для выбора всех продуктов uncheched
      this.changeSelectedIds(this.checkboxSelectedIds);
      if (this.selectedIds.length === this.allProductsIds.length) {
        // если выбраны все продукты, то делаем галочку checked
        this.isSelectedIdsAll = true;
      }
    },
    handleCheckboxAll() {
      if (this.isSelectedIdsAll) {
        const ids = (this.checkboxSelectedIds = this.allProductsIds); // делаем чекбоксы на всех продуктах активными
        this.changeSelectedIds(ids); // комитим в глобальный стор
      } else {
        const ids = (this.checkboxSelectedIds = []); // делаем чекбоксы на всех продуктах неактивными
        this.changeSelectedIds(ids); // комитим в глобальный стор
      }
    },
    handleDeleteById(product) {
      if(confirm(`Вы действительно хотите удалить выбранный продукт: "${product.product}"?`)){
        this.deleteByID(product.id)
      }
    }
  },
  async mounted() {
    this.fetchProducts();
  },
  components: {
    SortDirectionArrow: SortDirectionArrow
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
@import "../scss/form-elements";
.table-container {
  table {
    tbody {
      .delete-btn {
        opacity: 0;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: $blueDark2;
        &__icon {
          margin-right: 5px;
          color: inherit;
        }
        transition: all 0.2s ease-out;
      }
      tr:hover {
        background: rgba(0, 161, 30, 0.07);
      }
      tr:hover .delete-btn {
        opacity: 1;
      }
    }
    width: 100%;
    text-align: start;
    border-radius: 4px;
    th,
    td {
      padding: 1rem 2rem;
      vertical-align: middle;
      text-align: start;
    }
    th {
      font-weight: 600;
      cursor: pointer;
      svg {
        vertical-align: middle;
        margin-left: 7px;
      }
      &.active {
        color: $active;
      }
    }
    td {
    }
  }
}

.align-center-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .err-box,
  .loading-box {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
</style>
