import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "@/router/index";
import Chartick from 'vue-chartkick'
import { VueSpinners } from '@saeris/vue-spinners'
import Chart from "chart.js";

Vue.use(VueSpinners)
Vue.use(Chartick.use(Chart))

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
