<template>
  <div href="/" class="select-wrap">
    <ul class="wrap__ul">
      <li class="ul__current-option">
        {{pageLimit}} Per Page
        <svg
          v-on:click.prevent="toggleSelect"
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
      <li class="select-ul__option" v-on:click.prevent="onSwitchPerPage(10)">10 Per Page</li>
      <li class="select-ul__option" v-on:click.prevent="onSwitchPerPage(25)">25 Per Page</li>
      <li class="select-ul__option" v-on:click.prevent="onSwitchPerPage(50)">50 Per Page</li>
      <li class="select-ul__option" v-on:click.prevent="onSwitchPerPage(100)">100 Per Page</li>
    </ul>
  </div>
</template>


<script>
import {mapGetters, mapActions } from "vuex";
export default {
  name: "PerPageSelect",
  data: function() {
    return {
      active: false
    };
  },
  computed: {...mapGetters(['pageLimit'])},
  methods: {
    ...mapActions(["switchPerPage"]),
    toggleSelect() {
      this.active = !this.active
    },
    onSwitchPerPage(payload){
        this.switchPerPage(payload)
        this.active = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
@import "../scss/form-elements";
</style>