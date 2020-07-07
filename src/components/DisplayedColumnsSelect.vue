<template>
  <div href="/" class="select-wrap">
    <ul class="wrap__ul">
      <li class="ul__current-option">
        {{selectedColumnsCount}} columns selected
        <svg
          v-on:click.prevent="toggleSelect()"
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
      </li>
    </ul>
    <ul class="wrap__select-ul" :class="{active: active}">
      <li v-for="column in allColumns" class="select-ul__option" :key="column.id">
        <div class="checkbox-wrap">
          <input
            @change="handleCheckboxChange"
            type="checkbox"
            :name="column.tag"
            :id="column.tag"
            :value="column"
            class="input-checkbox"
            v-model="checkboxSelectedColumns"
          />
          <label :for="column.tag">{{column.name}}</label>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DisplayedColumnsSelect",
  data: function() {
    return {
      active: false,
      checkboxSelectedColumns: [{ id: 1, tag: 'product', name: 'Product(100g serving)' }, { id: 2, tag: 'calories', name: 'Calories' }, { id: 3, tag: 'fat', name: 'Fat (g)' }, { id: 4, tag: 'carbs', name: 'Carbs (g)' }, { id: 5, tag: 'protein', name: 'Protein (g)' }, { id: 6, tag: 'iron', name: 'Iron (%)' }]
    };
  },
  computed: {
    ...mapGetters(["selectedColumns", "selectedColumnsCount", "allColumns"])
  },
  methods: {
    ...mapActions(["changeSelectedColumns"]),
    toggleSelect() {
      this.active = !this.active;
    },
    handleCheckboxChange(){
      this.changeSelectedColumns(this.checkboxSelectedColumns)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
@import "../scss/form-elements";
</style>