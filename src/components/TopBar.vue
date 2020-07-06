<template>
  <div class="top-bar">
    <div class="sort-by">
      <span class="sort-by__label">Sorting by:</span>
      <a
        href="/"
        class="sort-by__item"
        :class="{ active: isSortBy('product') }"
        v-on:click.prevent="setSortBy('product')"
      >Product (100g serving)</a>
      <a
        href="/"
        class="sort-by__item"
        :class="{ active: isSortBy('calories') }"
        v-on:click.prevent="setSortBy('calories')"
      >Calories</a>
      <a
        href="/"
        class="sort-by__item"
        :class="{ active: isSortBy('fat') }"
        v-on:click.prevent="setSortBy('fat')"
      >Fat (g)</a>
      <a
        href="/"
        class="sort-by__item"
        :class="{ active: isSortBy('carbs') }"
        v-on:click.prevent="setSortBy('carbs')"
      >Carbs (g)</a>
      <a
        href="/"
        class="sort-by__item"
        :class="{ active: isSortBy('protein') }"
        v-on:click.prevent="setSortBy('protein')"
      >Protein (g)</a>
      <a
        href="/"
        class="sort-by__item"
        :class="{ active: isSortBy('iron') }"
        v-on:click.prevent="setSortBy('iron')"
      >Iron (%)</a>
    </div>
    <div class="other">
      <div class="options">
        <a href="/" class="delete-count">Delete (3)</a>
        <PerPageSelect />
      </div>
      <Paginator />
      <div class="colums-selected">
        6 columns selected
        <a href="/">
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.0625 0L8 0.9375L4 4.9375L0 0.9375L0.9375 0L4 3.0625L7.0625 0Z"
              fill="#5B5E77"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Paginator from "./Paginator";
import PerPageSelect from "./PerPageSelect";
export default {
  name: "TopBar",
  computed: { ...mapGetters(["sortBy"]) },
  methods: {
    ...mapMutations(["setSortBy"]),
    isSortBy(value) {
      return this.sortBy === value;
    }
  },
  components: {
    Paginator: Paginator,
    PerPageSelect: PerPageSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
@media (max-width: 1208px) {
  .top-bar {
    padding: 15px;
    .sort-by {
      width: 100%;
      justify-content: center;
    }
    .other {
      margin-top: 10px;
      width: 100%;
      justify-content: center;
    }
  }
}
.top-bar {
  display: flex;
  flex-wrap: wrap;
  margin-top: 36px;
  //   justify-content: center;
  .sort-by {
    display: flex;
    color: $blueDark1;
    align-items: center;
    &__label {
      font-weight: 600;
    }
    &__item {
      color: $black;
      margin-left: 16px;
      padding: 0.5rem;
      text-decoration: none;
      border-radius: 2px;
      &.active {
        color: $white;
        background: $active;
      }
    }
  }
  .other {
    display: flex;
  }
  .options {
    display: flex;

    .delete-count {
      color: $blueDark1;
      border: 1px solid $grey2;
      border-radius: 2px;
      opacity: 0.3;
      padding: 0.5rem 1rem;
      text-decoration: none;
      text-align: center;
    }
  }
  .colums-selected {
    display: flex;
    align-items: center;
    color: $blueDark2;
    border: 1px solid $grey1;
    margin-left: 16px;
    padding: 0 1rem;
    svg {
      margin-left: 6px;
      vertical-align: middle;
    }
  }
}
</style>
