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
        <a
          v-on:click.prevent="handleDeleteButton()"
          href="/"
          class="delete-count"
          :class="{active: selectedIdsCount > 0}"
        >Delete ({{selectedIdsCount}})</a>
        <PerPageSelect />
      </div>
      <Paginator />
      <DisplayedColumnsSelect />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Paginator from "./Paginator";
import PerPageSelect from "./PerPageSelect";
import DisplayedColumnsSelect from "./DisplayedColumnsSelect";
export default {
  name: "TopBar",
  computed: { ...mapGetters(["sortBy", "selectedIdsCount"]) },
  methods: {
    ...mapMutations(["setSortBy"]),
    ...mapActions(["deleteSelectedProducts"]),
    isSortBy(value) {
      return this.sortBy === value;
    },
    handleDeleteButton(){
      if(confirm(`Вы действительно хотите удалить выбранные ${this.selectedIdsCount} продуктов?`)){
        this.deleteSelectedProducts()
      }
    }
  },
  components: {
    Paginator: Paginator,
    PerPageSelect: PerPageSelect,
    DisplayedColumnsSelect: DisplayedColumnsSelect
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
      &.active{
        opacity: 1;
      }
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
