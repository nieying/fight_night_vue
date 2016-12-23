import * as types from '../mutation-types';

// initial state
// shape: [{ id, quantity }]
const state = {
    weixin: {
        nickname: '',
        icon: ''
    }
};

// getters
const getters = {
    // checkoutStatus: state => state.checkoutStatus
    weixinUserInfo: state => state.weixin
}

// mutations
const mutations = {
    [types.WEIXIN_SAVE_USER](state, item) {
        state.weixin = item;
    }
};

export default {
    state,
    getters,
    mutations
};
