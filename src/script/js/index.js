require('scss/page/index.scss');

// Banner
// let Vue = require('vue');
// let Swiper = require('vue-swiper');

import Vue from 'vue'
import Swiper from 'vue-swiper'

new Vue({
    el: 'body',
    components: {Swiper},
    methods: {
        onSlideChangeStart(currentPage) {
        },
        onSlideChangeEnd(currentPage) {
        }
    }
});


