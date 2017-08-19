// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Router from "vue-router";
import VueResource from "vue-resource";
import iView from "iView";
import locale from 'iview/dist/locale/en-US';
import App from "./App";
import router from "./router";

import "iView/dist/styles/iview.css";

Vue.use(iView, { locale });
Vue.use(VueResource);

Vue.use(Router);

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: {
		App
	}
});
