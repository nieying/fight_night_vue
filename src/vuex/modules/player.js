import * as types from '../mutation-types';

// initial state
// shape: [{ id, quantity }]
const state = {
    base: {
        playerName: '',
        sex: '1',
        birth: '',
        birthPlace: '',
        country: '',
        nation: '',
        weight: '',
        height: '',
        passportName: '',
        passportId: '',
        passportTerm1: '',
        passportTerm2: '',
        passportAddr: '',
        visaType: '',
        visaCategory: '',
        visaId: '',
        visaTerm1: '',
        visaTerm2: '',
        deadline: '',
        visaDate: '',
        mobile: '',
        addr: '',
        email: '',
        postcode: ''
    },
    agent: {
        agentName: '',
        sex: '',
        age: '',
        companyName: '',
        companyAddr: '',
        postcode: '',
        mobile: '',
        email: '',
        signTime1: ''
    },
    record: {
        honor: '',
        win: '',
        deuce: '',
        fail: '',
        ko: '',
        macthTime: '',
        coach: '',
        drillVideo: '',
        item: []
    },
    pic: {
        img1: '',
        img2: '',
        img3: '',
        img4: []
    },
    other: {
        boxing: 0,
        kick: 0,
        speed: 0,
        defense: 0,
        power: 0,
        selfRate: ''
    }
};

// getters
const getters = {
    // checkoutStatus: state => state.checkoutStatus
    playerBaseInfo: state => state.base,
    playerAgentInfo: state => state.agent,
    playerRecordInfo: state => state.record,
    playerPicInfo: state => state.pic,
    playerOtherInfo: state => state.other
}

// actions
const actions = {
    getNation({commit, state}, name) {
        // const savedCartItems = [...state.added]
        //     commit(types.CHECKOUT_REQUEST)
        //     shop.buyProducts(
        //       products,
        //       () => commit(types.CHECKOUT_SUCCESS),
        //       () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
        //     )
    }
};

// mutations
const mutations = {
    [types.PLAYER_SAVE_BASE](state, item) {
        state.base = item;
    },
    [types.PLAYER_SAVE_AGENT](state, item) {
        state.agent = item;
    },
    [types.PLAYER_SAVE_RECORD](state, item) {
        state.record = item;
    },
    [types.PLAYER_SAVE_PIC](state, item) {
        state.pic = item;
    },
    [types.PLAYER_SAVE_OTHER](state, item) {
        state.other = item
    },
    [types.PLAYER_SAVE_RECORDITEM](state, item) {
        if (state.record.item[item.id - 1]) {
            state.record.item[item.id - 1] = item;
        } else {
            item.id = state.record.item.length + 1;
            state.record.item.push(item);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
