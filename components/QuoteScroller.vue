<style lang="scss">
.quote-scroller {
  .scroll-container {
    transition: transform .3s;
    display: flex;
  }

  .quote {
    position: relative;
    width: 550px;
    float: left;
    padding: 0;
    margin: 0 50px 5px 0;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: 20px;
    font-size: 96%;
    opacity: 0.5;
    transition: opacity .4s, background-color .2s;
    display: flex;
    align-items: center;

    blockquote {
      padding: 0;
      margin: 0;

      .source {
        color: #7c57ff;
        text-decoration: underline;
        display: block;
        font-style: normal;
        font-size: 92%;
        margin-top: 1rem;
      }
    }

    nav {
      display: none;

      button {
        background: none;
        border: none;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
        transition: opacity .4s ease-in .2s;
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        height: 100%;

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
          left: -3.5rem;
        }

        &.next {
          right: -3.5rem;
        }
      }
    }

    &.active {
      opacity: 1;
      color: #1e1e1e;
      background-color: #fff;

      nav {
        display: block;
      }
    }
  }

  @include mobile {
    .scroller {
      overflow: hidden;
      width: 100%;
      height: auto;
    }

    .quote {
      width: 80vw;
      height: auto;
      font-size: 90%;
      margin: 0 30px 5px;
    }
  }
}
</style>

<template>
  <div class="quote-scroller">
    <div class="scroller" @touchstart="touchStart" @touchend="touchEnd">
      <div class="scroll-container" :style="{ width: `${totalWidth}px`, transform: translate3d }">
        <div class="quote" v-for="(quote, index) in quotes" :key="`quote-${index}`" ref="quote" :class="index == page ? 'active' : ''">
          <blockquote>
            “{{ quote.text }}”
            <span class="source" v-if="quote.source">{{ quote.source }}</span>
          </blockquote>
          <nav>
            <button class="prev" @click="prevPage()" :disabled="page < 1"><img src="~/assets/images/scroller-arrow.svg" alt=""></button>
            <button class="next" @click="nextPage()" :disabled="page == lastPage"><img src="~/assets/images/scroller-arrow.svg" alt=""></button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quotes from '~/assets/data/quotes.json'
const paddingRight = 50

export default {
  data() {
    return {
      page: 1,
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
