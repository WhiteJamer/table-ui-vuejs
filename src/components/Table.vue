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
            <th
              :class="{active: isPrimaryColumn('product')}"
              v-on:click.prevent="setPrimaryColumn('product')"
            >
              Product(100g serving)
              <svg
                class="arrow-up"
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.34375 12V2.5625L0.9375 4.9375L0 4L4 0L8 4L7.0625 4.9375L4.65625 2.5625V12H3.34375Z"
                  fill="#333333"
                />
              </svg>
            </th>
            <th
              :class="{active: isPrimaryColumn('calories')}"
              v-on:click.prevent="setPrimaryColumn('calories')"
            >Calories</th>
            <th
              :class="{active: isPrimaryColumn('fat')}"
              v-on:click.prevent="setPrimaryColumn('fat')"
            >Fat (g)</th>
            <th
              :class="{active: isPrimaryColumn('carbs')}"
              v-on:click.prevent="setPrimaryColumn('carbs')"
            >Carbs (g)</th>
            <th
              :class="{active: isPrimaryColumn('protein')}"
              v-on:click.prevent="setPrimaryColumn('protein')"
            >Protein (g)</th>
            <th
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
            <td>{{product.product}}</td>
            <td>{{product.calories}}</td>
            <td>{{product.fat}}</td>
            <td>{{product.carbs}}</td>
            <td>{{product.protein}}</td>
            <td>{{product.iron}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Table",
  computed: {
    ...mapGetters([
      "filteredProducts",
      "isLoading",
      "isError",
      "error",
      "primaryColumn"
    ])
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    ...mapMutations(["setPrimaryColumn"]),
    isPrimaryColumn(value) {
      return this.primaryColumn === value;
    }
  },
  async mounted() {
    this.fetchProducts();
  }
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
