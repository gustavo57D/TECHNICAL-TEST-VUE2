<template>
  <main class="main">
    <SearchSection
      :handleInputChangue="handleInputChangue"
      :handleCheckboxChange="handleCheckboxChange"
      :handleFilterCleaning="handleFilterCleaning"
    />
    <div class="content-section">
      <section class="content">
        <template v-if="loading">
          <CardPlaceholder v-for="index in 24" :key="index" />
        </template>
        <template v-else-if="error">
          <div class="request-error">{{ error }}</div>
        </template>
        <template v-else>
          <template v-if="countries.length === 0">
            <div class="request-error">
              No results found for <span>{{ inputSearch }}</span>
            </div>
          </template>
          <template v-else>
            <CardElement
              @handleRadioChange="handleRadioChange"
              v-for="country in countries"
              :key="country.code"
              :country="country"
            />
          </template>
        </template>
      </section>
      <template v-if="countryDetail">
        <CountryDetailElement
          :countryDetail="countryDetail"
          :handleCountryDetailClosure="handleCountryDetailClosure"
        />
      </template>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import SearchSection from "@/components/home/SearchSection.vue";
import CardPlaceholder from "@/components/home/CardPlaceholder.vue";
import CardElement from "@/components/home/CardElement.vue";
import {
  fetchPixabayAndFlags,
  searchAndFilter,
} from "@/services/countryService";
import { Country, HomeViewState } from "@/types/types";
import { GET_COUNTRIES_QUERY } from "@/api/querys";
import CountryDetailElement from "@/components/home/CountryDetailElement.vue";

function isHTMLInputElement(
  element: EventTarget | null
): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}

export default Vue.extend({
  name: "HomeView",
  components: {
    SearchSection,
    CardPlaceholder,
    CardElement,
    CountryDetailElement,
  },
  data(): HomeViewState {
    return {
      countries: [],
      loading: true,
      error: null,
      initialCountries: [],
      selectedContinents: [],
      inputSearch: "",
      inputRadioRef: null,
      countryDetail: null,
    };
  },
  async mounted() {
    await this.fetchCountries();
  },
  methods: {
    async fetchCountries() {
      try {
        const { data } = await this.$apollo.query<{ countries: Country[] }>({
          query: GET_COUNTRIES_QUERY,
        });
        const { countriesWithImages } = await fetchPixabayAndFlags(
          data.countries
        );
        this.countries = countriesWithImages;
        this.initialCountries = countriesWithImages;
      } catch (err) {
        this.error = "An error occurred while loading data. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    updateFilteredResults() {
      const filteredResults = searchAndFilter(
        this.initialCountries,
        this.inputSearch,
        this.selectedContinents
      );
      this.countries = filteredResults;
    },
    handleInputChangue(e: Event) {
      if (isHTMLInputElement(e.target)) {
        this.inputSearch = e.target.value;
        this.updateFilteredResults();
      }
    },
    handleCheckboxChange(e: Event) {
      if (isHTMLInputElement(e.target)) {
        if (e.target.checked) this.selectedContinents.push(e.target.value);
        else
          this.selectedContinents.splice(
            this.selectedContinents.indexOf(e.target.value),
            1
          );
        this.updateFilteredResults();
      }
    },
    handleFilterCleaning() {
      this.selectedContinents = [];
      document.getElementsByName("continent").forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false;
        }
      });
      this.updateFilteredResults();
    },
    handleRadioChange(country: Country, e: Event) {
      if (isHTMLInputElement(e.target)) {
        this.inputRadioRef = e.target;
        this.countryDetail = country;
      }
    },
    handleCountryDetailClosure() {
      if (this.inputRadioRef instanceof HTMLInputElement)
        this.inputRadioRef.checked = false;
      this.countryDetail = null;
    },
  },
});
</script>
