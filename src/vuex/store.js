import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import player from './modules/player';
import weixin from './modules/weixin';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        player,
        weixin
    }
    // strict: debug
});