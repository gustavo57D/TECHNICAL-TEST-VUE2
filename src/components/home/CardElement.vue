<template>
  <label class="card">
    <div>
      <img :src="country.imageUrl" alt="" />
    </div>
    <input
      type="radio"
      name="country"
      class="hidden"
      @change="handleRadioChange"
    />
    <div class="footer">
      <img :src="country.flag" alt="" />
      <div>
        <span>{{ country.name }}</span>
        <span>{{ country.continent.name }}</span>
      </div>
    </div>
  </label>
</template>

<script lang="ts">
import Vue from "vue";

interface Country {
  code: string;
  name: string;
  emoji: string;
  continent: { name: string };
  imageUrl?: string;
  flag?: string;
}

export default Vue.extend({
  name: "CardElement",
  props: {
    country: {
      type: Object as () => Country,
      required: true,
    },
  },
  methods: {
    handleRadioChange(e: Event) {
      this.$emit("handleRadioChange", this.country, e);
    },
  },
});
</script>
