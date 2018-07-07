<style lang="scss">
ul.logo-grid {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    padding: 0;
    height: 7rem;
    border-radius: $border-radius;
    background-color: #fff;
    width: 25%;
    margin: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @include mobile {
      width: 48%;
      margin: 1%;
    }

    img {
      max-width: 80%;
      max-height: 80%;
    }
  }
}
</style>
<template>
  <div>
    <ul class="logo-grid">
      <li v-for="(logo, index) in logos" :key="`logo-${index}`"><img :src="`/images/logos/${logo.img}`" v-bind:alt="logo.alt" /></li>
    </ul>
  </div>
</template>
<script>
import settings from '~/config.json'

export default {
  data() {
    return {
      logos: settings.logos
    }
  }
}
</script>
