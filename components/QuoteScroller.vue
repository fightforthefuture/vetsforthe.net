<style lang="scss" scoped>
.quote-scroller {
  .scroll-container {
    transition: transform .3s;
    display: flex;
  }

  blockquote {
    width: 550px;
    float: left;
    padding: 0;
    margin: 0 15px 5px 0;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: 20px;
    font-size: 96%;
    opacity: 0.5;
    transition: opacity .4s;
    transition-delay: .2s;

    &.active {
      opacity: 1;
    }
  }

  @include mobile {
    overflow: hidden;
    width: 100%;
    height: auto;

    blockquote {
      width: 300px;
      height: auto;
      font-size: 90%;
    }
  }

}

nav {
  padding: 0.5rem;

  button {
    background: none;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    display: block;
    float: left;
    padding: 0;
    transition: opacity .4s;
    transition-delay: .2s;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
    }

    &.prev {
      transform: rotate(180deg);
      float: left;
    }

    &.next {
      float: right;
    }
  }
}
</style>

<template>
  <div>
    <div class="quote-scroller" @touchstart="touchStart" @touchend="touchEnd">
      <div class="scroll-container" :style="{ width: `${totalWidth}px`, transform: translate3d }">
        <blockquote v-for="(quote, index) in quotes" :key="`quote-${index}`" ref="quote" :class="index == page ? 'active' : ''" v-html="quote"></blockquote>
      </div>
    </div>
    <nav class="clearfix">
      <button class="prev" @click="prevPage()" :disabled="page < 1"><img src="~/assets/images/scroller-arrow.svg" alt=""></button>
      <button class="next" @click="nextPage()" :disabled="page == lastPage"><img src="~/assets/images/scroller-arrow.svg" alt=""></button>
    </nav>
  </div>
</template>

<script>
import quotes from '~/assets/data/quotes.json'
const paddingRight = 15

export default {
  data() {
    return {
      page: 0,
      contentWidth: 570
    }
  },

  computed: {
    quotes: () => quotes,

    totalWidth() {
      return this.quotes.length * this.contentWidth
    },

    lastPage() {
      return Math.ceil(this.totalWidth / this.contentWidth) - 1
    },

    translate3d() {
      const x = this.page * this.contentWidth * -1
      return `translate3d(${x}px, 0, 0)`
    }
  },

  mounted() {
    this.resizeContent()
  },

  methods: {
    resizeContent() {
      if (this.$refs.quote && this.$refs.quote[0]) {
        this.contentWidth = this.$refs.quote[0].clientWidth + paddingRight
      }
    },

    nextPage() {
      if (this.page < this.lastPage) {
        this.page++
      }
    },

    prevPage() {
      if (this.page > 0) {
        this.page--
      }
    },

    touchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX
    },

    touchEnd(event) {
      const endX = event.changedTouches[0].screenX

      // swipe left
      if (endX < this.touchStartX) {
        this.nextPage()
      }
      // swipe right
      else if (endX > this.touchStartX) {
        this.prevPage()
      }
    }
  }
}
</script>
