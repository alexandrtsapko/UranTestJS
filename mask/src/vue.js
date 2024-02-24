import { mask } from "./directives/mask.js";

const app = Vue.createApp({});
app.directive('mask', mask);
app.mount('#app');