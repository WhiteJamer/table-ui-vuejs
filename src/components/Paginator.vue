<template>
  <div class="paginator">
    <a href="/" class="left-arrow arrow disable" v-on:click.prevent="prevPage">
      <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 0L0 4L4 8L4.9375 7.0625L1.875 4L4.9375 0.9375L4 0Z"
          fill="#333333"
        />
      </svg>
    </a>
    <span class="page-step">{{pageStepFrom}} of {{pageStepTo}}</span>
    <a href="/" class="right-arrow arrow" v-on:click.prevent="nextPage">
      <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.9375 0L4.9375 4L0.9375 8L0 7.0625L3.0625 4L0 0.9375L0.9375 0Z"
          fill="#5B5E77"
        />
      </svg>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Paginator",
  computed: {
    ...mapGetters([
      "productsCount",
      "pageNumber",
      "allPages",
      "pageLimit",
      "pageStepFrom",
      "pageStepTo"
    ])
  },
  methods: {
    ...mapActions(["prevPage", "nextPage"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
.paginator {
  display: flex;
  justify-content: space-between;
  margin-left: 16px;
  align-items: center;
  .arrow {
    padding: 0.5rem 1rem;
    border: 1px solid $grey1;
    border-radius: 2px;
    svg {
      vertical-align: middle;
    }
    &.disable {
      opacity: 0.3;
    }
  }
  .page-step {
    color: $blueDark1;
    font-weight: 600;
    margin: 0 8px;
  }
}
</style>