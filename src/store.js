import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wxUser: {}
  },
  mutations: {
    setUserInfo(state, data) {
      state.wxUser = data;
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('setUserInfo', data);
    }
  }
});
