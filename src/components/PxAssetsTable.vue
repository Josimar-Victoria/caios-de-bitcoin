<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{up: this.sortOrder === 1, down: this.sortOrder === -1}">
          <span class="underline cursor-pointer" @click="changeSortOrder">Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="
              bg-gray-100
              focus:outline-none
              border-b border-gray-400
              py-2
              px-4
              block
              w-full
              appearance-none
              leading-normal
            "
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="t in filteredAssets"
        :key="t.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td></td>
        <td>#{{ t.rank }}</td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: t.id } }"
            >{{ t.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ t.symbol }}</small>
        </td>
        <td>{{ t.priceUsd | dollar }}</td>
        <td>{{ t.marketCapUsd | dollar }}</td>
        <td
          :class="
            t.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ t.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block"></td>
        <PxButton @xclick="goTocoin(t.id)">
          <span>Detalle</span>
        </PxButton>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton";
import { dollarFilter, percentFilter } from "@/filter";
import Vue from "vue";

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
export default {
  name: "PxAssetsTable",
  components: {
    PxButton,
  },
  data() {
    return {
      filter: "",
      sortOrder: 1

    };
  },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredAssets() {
       const altOrder = this.sortOrder === 1 ? -1 :1

      return this.assets.filter((asset) => {
        return asset.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
        asset.name.toLowerCase().includes(this.filter.toLowerCase()) 
        
      })
      .sort((a, b) =>{
        if (parseInt(a.rank) > parseInt(b.rank)){
          return this.sortOrder
        }
        return altOrder
      })
    },
  },

  methods: {
    goTocoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },
    changeSortOrder(){
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    }
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
