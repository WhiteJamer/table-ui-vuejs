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
            <th class="active">
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
            <th>Calories</th>
            <th>Fat (g)</th>
            <th>Carbs (g)</th>
            <th>Protein (g)</th>
            <th>Iron (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" name="row2" id="row2" values="yes" class="input-checkbox" />
              <label for="row2"></label>
            </td>
            <td>Frozen Yogurt</td>
            <td>557</td>
            <td>546</td>
            <td>123</td>
            <td>4323</td>
            <td>12</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="row3" id="row3" values="yes" class="input-checkbox" />
              <label for="row3"></label>
            </td>
            <td>Frozen Yogurt</td>
            <td>557</td>
            <td>546</td>
            <td>123</td>
            <td>4323</td>
            <td>12</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="row4" id="row4" values="yes" class="input-checkbox" />
              <label for="row4"></label>
            </td>
            <td>Frozen Yogurt</td>
            <td>557</td>
            <td>546</td>
            <td>123</td>
            <td>4323</td>
            <td>12</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="row5" id="row5" values="yes" class="input-checkbox" />
              <label for="row5"></label>
            </td>
            <td>Frozen Yogurt</td>
            <td>557</td>
            <td>546</td>
            <td>123</td>
            <td>4323</td>
            <td>12</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" name="row6" id="row6" values="yes" class="input-checkbox" />
              <label for="row6"></label>
            </td>
            <td>Frozen Yogurt</td>
            <td>557</td>
            <td>546</td>
            <td>123</td>
            <td>4323</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/colors";
.table-container {
  table {
    tbody{
      tr:hover{
        background: rgba(0, 161, 30, 0.07);
      }
    }
    width: 100%;
    text-align: start;
    border-radius: 4px;
    th, td{
      padding: 1rem 2rem;
      vertical-align: middle;
      text-align: start;
    }
    th {
      font-weight: 600;
      svg {
        vertical-align: middle;
        margin-left: 7px;
      }
      &.active {
        color: $active;
      }
    }
    td {}
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
</style>
