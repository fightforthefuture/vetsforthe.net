<style lang="scss">
.counter {
  display: inline-block;
  .counter-card-s {
    color: white;
    display: inline-block;
    margin: 0 5px 0 0;
    font-size: 0.9em;
  }
  .counter-card-n {
    color: black;
    background-color: white;
    display: inline-block;
    margin: 0 5px 0 0;
    border-radius: 3px;
    font-size: 0.9em;
    width: 0.8em;
    text-align: center;
  }
}
</style>
<template>
  <div class="counter">
    <span :class="`counter-card-${card.t}`" v-for="(card, index) in cards" :key="`card-${index}`">{{ card.v }}</span>
  </div>
</template>

<script>
import settings from '~/config.json'

export default {
  data() {
    return {
      c: null,
      count: null
    }
  },

  computed: {
    cards() {
      if (this.c == null) {
        return null;
      }
      const s = this.c.toString();
      var cards = s.split("").map(c => {return {v: c, t: "n"};});
      if (cards.length > 3) {
        cards.splice(-3, 0, {v: ",", t: "s"});
      }
      return cards;
    }
  },

  methods: {
    async doCountdown() {
      var delta = Math.max(1, Math.floor(this.count / 50));
      function doTick() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 10);
        });
      }
      while (true) {
        this.c += delta;
        if (this.c > this.count) {
          this.c = this.count;
          return;
        }
        await doTick();
      }
    },
    async getCount() {
      function fakeGetCount() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(settings.signatureCount);
          }, 200);
        });
      }
      const count = await fakeGetCount();
      this.count = count;
      this.c = 0;
      this.doCountdown();
    },
    init() {
      this.getCount();
    }
  },

  mounted() {
    this.init();
  }
}
</script>
