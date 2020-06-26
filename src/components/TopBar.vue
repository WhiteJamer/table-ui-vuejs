<template>
  <div class="top-bar">
    <div class="sort-by">
      <span class="sort-by__label">Sorting by:</span>
      <a href="/" class="sort-by__item active">Product (100g serving)</a>
      <a href="/" class="sort-by__item">Calories</a>
      <a href="/" class="sort-by__item">Fat (g)</a>
      <a href="/" class="sort-by__item">Carbs (g)</a>
      <a href="/" class="sort-by__item">Protein (g)</a>
      <a href="/" class="sort-by__item">Iron (%)</a>
    </div>
    <div class="other">
      <div class="options">
        <a href="/" class="delete-count">Delete (3)</a>
        <a href="/" class="per-page-switcher">
          10 Per Page
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
      <div class="paginator">
        <a href="/" class="left-arrow arrow disable">
          <svg
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 0L0 4L4 8L4.9375 7.0625L1.875 4L4.9375 0.9375L4 0Z"
              fill="#333333"
            />
          </svg>
        </a>
        <span class="page-step">1-10 of 25</span>
        <a href="/" class="right-arrow arrow">
          <svg
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.9375 0L4.9375 4L0.9375 8L0 7.0625L3.0625 4L0 0.9375L0.9375 0Z"
              fill="#5B5E77"
            />
          </svg>
        </a>
      </div>
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
export default {
  name: "TopBar"
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
    .per-page-switcher {
      color: $blueDark2;
      border: 1px solid $grey1;
      border-radius: 2px;
      margin-left: 12px;
      padding: 0.5rem 1rem;
      text-decoration: none;
      text-align: center;
      svg {
        margin-left: 7px;
        vertical-align: middle;
      }
    }
  }
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
