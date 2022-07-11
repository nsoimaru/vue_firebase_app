import { createStore } from 'vuex';

export default createStore({
  state: {
    authModalShow: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.AuthModalShow;
    },
    ofAuthModal: (state) => {
      state.authModalShow = false;
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
  },
});
