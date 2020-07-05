<template>
  <div id="table" class="table-container">
    <div class="table-top-bar">
      <table class="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="row1" id="row1" values="yes" class="input-checkbox" />
              <label for="row1"></label>
            </th>

            <!-- Primary column -->
            <th
              v-if="isPrimaryColumn('product')"
              :class="{active: isPrimaryColumn('product')}"
              v-on:click.prevent="switchSortType"
            >
              Product(100g serving)
              <SortDirectionArrow :sortType="sortType"  />
            </th>
            <th
              v-else-if="isPrimaryColumn('calories')"
              :class="{active: isPrimaryColumn('calories')}"
              v-on:click.prevent="switchSortType"
            >
              Calories
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('fat')"
              :class="{active: isPrimaryColumn('fat')}"
              v-on:click.prevent="switchSortType"
            >
              Fat (g)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('carbs')"
              :class="{active: isPrimaryColumn('carbs')}"
              v-on:click.prevent="switchSortType"
            >
              Carbs (g)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('protein')"
              :class="{active: isPrimaryColumn('protein')}"
              v-on:click.prevent="switchSortType"
            >
              Protein (g)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <th
              v-else-if="isPrimaryColumn('iron')"
              :class="{active: isPrimaryColumn('iron')}"
              v-on:click.prevent="switchSortType"
            >
              Iron (%)
              <SortDirectionArrow :sortType="sortType" />
            </th>
            <!-- END Primary Column -->

            <th
              v-if="!isPrimaryColumn('product')"
              :class="{active: isPrimaryColumn('product')}"
              v-on:click.prevent="setPrimaryColumn('product')"
            >
              Product(100g serving)
            </th>
            <th
              v-if="!isPrimaryColumn('calories')"
              :class="{active: isPrimaryColumn('calories')}"
              v-on:click.prevent="setPrimaryColumn('calories')"
            >Calories</th>
            <th
              v-if="!isPrimaryColumn('fat')"
              :class="{active: isPrimaryColumn('fat')}"
              v-on:click.prevent="setPrimaryColumn('fat')"
            >Fat (g)</th>
            <th
              v-if="!isPrimaryColumn('carbs')"
              :class="{active: isPrimaryColumn('carbs')}"
              v-on:click.prevent="setPrimaryColumn('carbs')"
            >Carbs (g)</th>
            <th
              v-if="!isPrimaryColumn('protein')"
              :class="{active: isPrimaryColumn('protein')}"
              v-on:click.prevent="setPrimaryColumn('protein')"
            >Protein (g)</th>
            <th
              v-if="!isPrimaryColumn('iron')"
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
              <input type="checkbox" name="row2" id="row2" values="yes" class="input-checkbox" />
              <label for="row2"></label>
            </td>

            <!-- Primary column -->
            <td v-if="isPrimaryColumn('product')">{{product.product}}</td>
            <td v-else-if="isPrimaryColumn('calories')">{{product.calories}}</td>
            <td v-else-if="isPrimaryColumn('fat')">{{product.fat}}</td>
            <td v-else-if="isPrimaryColumn('carbs')">{{product.carbs}}</td>
            <td v-else-if="isPrimaryColumn('protein')">{{product.protein}}</td>
            <td v-else-if="isPrimaryColumn('iron')">{{product.iron}}</td>
            <!-- END Primary Column -->

            <td v-if="!isPrimaryColumn('product')">{{product.product}}</td>
            <td v-if="!isPrimaryColumn('calories')">{{product.calories}}</td>
            <td v-if="!isPrimaryColumn('fat')">{{product.fat}}</td>
            <td v-if="!isPrimaryColumn('carbs')">{{product.carbs}}</td>
            <td v-if="!isPrimaryColumn('protein')">{{product.protein}}</td>
            <td v-if="!isPrimaryColumn('iron')">{{product.iron}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SortDirectionArrow from './SortDirectionArrow';

export default {
  name: "Table",
  computed: {
    ...mapGetters([
      "filteredProducts",
      "isLoading",
      "isError",
      "error",
      "primaryColumn",
      "sortType"
    ])
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    ...mapMutations(["setPrimaryColumn", "switchSortType"]),
    isPrimaryColumn(value) {
      return this.primaryColumn === value;
    },

  },
  async mounted() {
    this.fetchProducts();
  },
  components: {
    'SortDirectionArrow': SortDirectionArrow
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
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

.input-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.input-checkbox + label {
  display: flex;
  align-items: center;
  vertical-align: middle;
  user-select: none;
}

.input-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 1px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 70% 70%;
}

.input-checkbox:checked + label::before {
  border-color: $active;
  background-color: $active;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.56354 2.61235L0.666992 3.41618L3.54877 5.99991L9.33366 0.803736L8.43711 -9.15527e-05L3.54877 4.39225L1.56354 2.61235Z' fill='%23fff'/%3E%3C/svg%3E%0A");
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
