<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Heroes</h2>
          <button class="button refresh-button" @click="loadHeroes()">
            <i class="fas fa-sync"></i>
          </button>
          <router-link tag="button" class="button add-button" :to="{ name: 'hero-detail', params: { id: 0 } }">
            <i class="fas fa-plus"></i>
          </router-link>
          <ul>
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">{{ hero.firstName }} {{ hero.lastName }}</div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link tag="button" class="link card-footer-item" :to="{ name: 'hero-detail', params: { id: hero.id } }">
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                  <button class="link card-footer-item" @click="askToDelete(hero)">
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
    <Modal :message="modalMessage" :isOpen="showModal" @handleNo="closeModal" @handleYes="deleteHero"> </Modal>
  </div>
</template>

<script>
import Modal from '@/components/modal';
//import { dataService } from '../shared';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Heroes',
  data() {
    return {
      //heroes: [],
      heroToDelete: null,
      message: '',
      capeMessage: '',
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  async created() {
    await this.loadHeroes();
  },
  methods: {
    ...mapActions(['getHeroesAction', 'deleteHeroAction']),
    askToDelete(hero) {
      this.heroToDelete = hero;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteHero() {
      this.closeModal();
      if (this.heroToDelete) {
        // dataService.deleteHero(this.heroToDelete);
        await this.deleteHeroAction(this.heroToDelete);
        this.$store.dispatch('deleteHeroAction', this.heroToDelerte);
      }
      await this.loadHeroes();
    },
    async loadHeroes() {
      //this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      //this.heroes = this.$store.state.heroes;
      //this.heroes = await dataService.getHeroes();
      await this.getHeroesAction();
      this.message = '';
    },
  },
  computed: {
    //heroes() {
    //  return this.$store.state.heroes;
    //},
    ...mapState(['heroes']),
    modalMessage() {
      const name = this.heroToDelete && this.heroToDelete.fullName ? this.heroToDelete.fullName : '';
      return `Would you like to delete ${name} ?`;
    },
  },
};
</script>
