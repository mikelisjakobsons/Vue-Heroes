<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Villains</h2>
          <button class="button refresh-button" @click="loadVillains()">
            <i class="fas fa-sync"></i>
          </button>
          <router-link tag="button" class="button add-button" :to="{ name: 'villain-detail', params: { id: 0 } }">
            <i class="fas fa-plus"></i>
          </router-link>
          <ul>
            <li v-for="villain in villains" :key="villain.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="villain.name" class="name">{{ villain.firstName }} {{ villain.lastName }}</div>
                    <div class="description">{{ villain.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link tag="button" class="link card-footer-item" :to="{ name: 'villain-detail', params: { id: villain.id } }">
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                  <button class="link card-footer-item" @click="askToDelete(villain)">
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
    <Modal :message="modalMessage" :isOpen="showModal" @handleNo="closeModal" @handleYes="deleteVillain"> </Modal>
  </div>
</template>

<script>
import Modal from '@/components/modal';
import { dataService } from '../shared';
import { mapState } from 'vuex';

export default {
  name: 'Villains',
  data() {
    return {
      //villains: [],
      villainToDelete: null,
      message: '',
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  async created() {
    await this.loadVillains();
  },
  methods: {
    askToDelete(villain) {
      this.villainToDelete = villain;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteVillain() {
      this.closeModal();
      if (this.villainToDelete) {
        dataService.deleteVillain(this.villainToDelete);
      }
      await this.loadVillains();
    },
    async loadVillains() {
      this.message = 'getting the villains, please be patient';
      //this.villains = this.$store.state.villains;
      //this.villains = await dataService.getVillains();
      this.message = '';
    },
  },
  computed: {
    //villains() {
    //  return this.$store.state.villains;
    //},
    ...mapState(['villains']),
    modalMessage() {
      const name = this.villainToDelete && this.villainToDelete.fullName ? this.villainToDelete.fullName : '';
      return `Would you like to delete ${name} ?`;
    },
  },
};
</script>
