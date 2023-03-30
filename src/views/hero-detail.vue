<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">Edit Hero</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ hero.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input class="input" name="firstName" v-model="hero.firstName" />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input class="input" name="lastName" v-model="hero.lastName" />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input class="input" name="description" v-model="hero.description" />
            </div>
            <div class="field">
              <label class="label" for="originDate">origin date</label>
              <input type="date" class="input" id="originDate" v-model="hero.originDate" />
              <p class="comment">
                My origin story began on
                {{ new Date(hero.originDate) | shortDate }}
              </p>
            </div>
            <div class="field">
              <label class="label" for="capeCounter">cape counter</label>
              <input class="input" name="capeCounter" type="number" v-model="hero.capeCounter" />
            </div>
            <div class="field">
              <label class="label" for="capeMessage">cape message</label>
              <label class="input" name="capeMessage">{{ hero.capeMessage }}</label>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button class="link card-footer-item cancel-button" @click="cancelHero()">
            <i class="fas fa-undo"></i>
            <span>Cancel</span>
          </button>
          <button class="link card-footer-item" @click="saveHero()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { displayDateFormat } from '../shared';
//import { dataService } from '../shared';
import { mapActions, mapGetters } from 'vuex';
import { cloneDeep } from 'lodash';

export default {
  name: 'HeroDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hero: {},
    };
  },
  created() {
    if (this.isAddMode) {
      this.hero = { id: undefined, firstName: '', lastName: '', description: '' };
    } else {
      //this.hero = cloneDeep(this.getHeroById(this.id));
      this.hero = cloneDeep(this.getHero(this.id));
    }
  },
  computed: {
    ...mapGetters(['getHeroById']),
    isAddMode() {
      return !this.id;
    },
    fullName() {
      return this.hero ? `${this.hero.firstName} ${this.hero.lastName}` : '';
    },
  },
  methods: {
    ...mapActions(['addHeroAction', 'updateHeroAction']),
    cancelHero() {
      this.$emit('cancel');
      this.$router.push({ name: 'heroes' });
    },
    async saveHero() {
      this.$emit('save', this.hero);
      //await dataService.updateHero(this.hero);
      this.hero.id ? await this.updateHeroAction(this.hero) : await this.addHeroAction(this.hero);
      this.$router.push({ name: 'heroes' });
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
  },
  watch: {
    'hero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`CapeCounter watcher evalauted. old=${oldValue}, new=${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
  filters: {
    shortDate: function(value) {
      return format(value, displayDateFormat);
    },
  },
};
</script>
