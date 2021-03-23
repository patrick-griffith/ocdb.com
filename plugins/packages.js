import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

import splitbee from '@splitbee/web';
splitbee.init({
    scriptUrl: "/bee.js",
    apiUrl: "/_hive",
    token: process.env.SPLITBEE_TOKEN
});