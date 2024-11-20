<template>
  <aside class="country-details">
    <div>
      <button class="close" @click="handleCountryDetailClosure()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="190 -780 580 600"
          width="24px"
          fill="none"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            fill="#e8eaed"
            stroke="#e8eaed"
          />
        </svg>
      </button>
      <img :src="countryDetail.imageUrl" class="image" alt="" />
      <div class="footer special-footer">
        <img :src="countryDetail.flag" alt="" />
        <div>
          <span>{{ countryDetail.name }}</span>
          <span>{{ countryDetail?.continent.name }}</span>
        </div>
      </div>
      <ExtraCountryDetailPlaceholder :key="countryDetail.code" v-if="loading" />
      <ExtraCountryDetailError v-else-if="error" />
      <ExtraCountryDetail v-else :countryDetail="countryExtra" />
    </div>
  </aside>
</template>

<script lang="ts">
import { Country, CountryDetail } from "@/types/types";
import Vue from "vue";
import ExtraCountryDetail from "./ExtraCountryDetail.vue";
import ExtraCountryDetailError from "./ExtraCountryDetailError.vue";
import ExtraCountryDetailPlaceholder from "./ExtraCountryDetailPlaceholder.vue";
import { GET_COUNTRY_QUERY } from "@/api/querys";
import { ApolloQueryResult } from "@apollo/client/core";
export default Vue.extend({
  data() {
    return {
      loading: true,
      error: null as string | null,
      countryExtra: {} as CountryDetail,
    };
  },
  watch: {
    countryDetail: {
      immediate: true,
      handler() {
        this.loading = true;
        this.error = null;
        this.countryExtra = {} as CountryDetail;
        this.$apollo.queries.country.refetch();
      },
    },
  },
  props: {
    countryDetail: {
      type: Object as () => Country,
      required: true,
    },
    handleCountryDetailClosure: Function,
  },
  apollo: {
    country: {
      query: GET_COUNTRY_QUERY,
      variables() {
        return {
          code: this.countryDetail.code,
        };
      },
      loading() {
        this.loading = true;
      },
      error(err) {
        this.error = err;
        this.loading = false;
      },
      result(res: ApolloQueryResult<{ country: CountryDetail }>) {
        this.countryExtra = res.data.country;
        this.loading = false;
      },
    },
  },
  components: {
    ExtraCountryDetail,
    ExtraCountryDetailError,
    ExtraCountryDetailPlaceholder,
  },
});
</script>
