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
import { fetchPixabayAndFlags } from "@/services/countryService";
import { Country } from "@/types/types";
import { GET_COUNTRIES_QUERY } from "@/api/querys";
import CountryDetailElement from "@/components/home/CountryDetailElement.vue";

const searchAndFilter = (
  data: Country[],
  search: string,
  continents: string[]
) => {
  return data.filter((item) => {
    const matchesSearch = item.name
      .toString()
      .toLowerCase()
      .startsWith(search.toLowerCase());

    const matchesContinent =
      continents.length === 0 || continents.includes(item.continent.name);

    return matchesSearch && matchesContinent;
  });
};

export default Vue.extend({
  name: "HomeView",
  components: {
    SearchSection,
    CardPlaceholder,
    CardElement,
    CountryDetailElement,
  },
  data() {
    return {
      countries: [] as Country[],
      loading: true,
      error: null as string | null,
      initialCountries: [] as Country[],
      selectedContinents: [] as string[],
      inputSearch: "",
      inputRadioRef: null as HTMLInputElement | null,
      countryDetail: null as Country | null,
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
        console.error("Error al obtener datos: ", err);
        this.error =
          "Ocurrió un error al cargar los datos. Por favor, intenta nuevamente.";
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
      const inputElement = e.target as HTMLInputElement;
      this.inputSearch = inputElement.value;
      this.updateFilteredResults();
    },
    handleCheckboxChange(e: Event) {
      const inputCheckedElement = e.target as HTMLInputElement;
      if (inputCheckedElement.checked)
        this.selectedContinents.push(inputCheckedElement.value);
      else
        this.selectedContinents.splice(
          this.selectedContinents.indexOf(inputCheckedElement.value),
          1
        );
      this.updateFilteredResults();
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
      this.inputRadioRef = e.target as HTMLInputElement;
      this.countryDetail = country;
    },
    handleCountryDetailClosure() {
      if (this.inputRadioRef instanceof HTMLInputElement)
        this.inputRadioRef.checked = false;
      this.countryDetail = null;
    },
  },
});
</script>
