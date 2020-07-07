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
    ...mapActions(["fetchProducts", "changeSelectedIds"]),
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
      tr:hover {
        background: rgba(0, 161, 30, 0.07);
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
