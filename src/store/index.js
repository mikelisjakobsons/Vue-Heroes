import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared';
import { GET_HEROES, ADD_HERO, UPDATE_HERO, DELETE_HERO } from './mutation-types';

Vue.use(Vuex);

const state = {
  heroes: [], //{ id: 1, firstName: 'Holly', lastName: 'Smith', description: 'hello' }],
  villains: [], //{ id: 1, firstName: 'VilHolly', lastName: 'VilSmith', description: 'hello villain' }],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes.push(hero);
  },
  [UPDATE_HERO](state, hero) {
    const index = state.heroes.findIndex(h => h.id === hero.id);
    state.heroes.splice(index, 1, hero);
    state.heroes = [...state.heroes];
  },
  [DELETE_HERO](state, hero) {
    state.heroes = [...state.heroes.filter(h => h.id !== hero.id)];
  },
};
const actions = {
  // actions let us get to context which contains
  // { state, getters, commit, dispatch }
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes();
    commit(GET_HEROES, heroes);
  },
  async addHeroAction({ comit }, hero) {
    const addedHero = await dataService.addHero(hero);
    comit(ADD_HERO, addedHero);
  },
  async updateHeroAction({ comit }, hero) {
    const updatedHero = await dataService.deleteHero(hero);
    comit(UPDATE_HERO, updatedHero);
  },
  async deleteHeroAction({ comit }, hero) {
    const deletedHeroId = await dataService.deleteHero(hero);
    comit(DELETE_HERO, deletedHeroId);
  },
};
const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
