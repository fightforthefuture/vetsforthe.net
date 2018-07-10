<template>
  <form @submit.prevent="submitForm()">
    <div class="row">
      <input v-model="name" name="name" type="text" placeholder="Name*" required autocomplete="name">
      <input type="text" v-model="branchOfService" placeholder="Branch of Service*" required>
<!--       <select v-model="branchOfService">
        <option :value="null">Branch of Service...</option>
        <option v-for="branch in militaryBranches" :key="branch">{{ branch }}</option>
      </select> -->
    </div>
    <div class="row">
      <input v-model="email" name="email" type="email" placeholder="Email*" required autocomplete="email">
      <input v-model="phone" name="phone" type="tel" placeholder="Phone" autocomplete="tel">
      <input v-model="zipCode" name="zip_code" type="tel" placeholder="ZIP Code*" required autocomplete="postal-code">
    </div>
    <div class="comments">
      <textarea v-model="comments" placeholder="Comments" class="display-block" autocomplete="off"></textarea>
    </div>
    <div class="row">
      <button class="btn btn-block" :disabled="isSending">
        <span v-if="isSending">Saving...</span>
        <span v-else>Sign the Letter</span>
      </button>
    </div>
    <div class="disclaimer">
      <a href="https://www.fightforthefuture.org">Fight for the Future</a> and <a href="https://demandprogress.org">Demand Progress</a> will email you updates, and you can unsubscribe at any time. If you enter your number (it's optional) we will follow up by SMS. Message &amp; data rates apply. You can always text STOP to stop receiving messages. <a href="https://www.battleforthenet.com/privacy/">Privacy Policy</a>
    </div>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import settings from '~/config.json'

export default {
  data() {
    return {
      name: null,
      email: null,
      branchOfService: null,
      phone: null,
      zipCode: null,
      comments: null,
      isAuthorized: false,
      isSending: false,
      modalVisible: false,
      errorMessage: null
    }
  },

  computed: {
    tags() {
      const tags = ['net-neutrality']

      if (this.$route.query.source) {
        tags.push(`vftn-${this.$route.query.source}`)
      }

      return tags
    },

    militaryBranches: () => [ 'Air Force', 'Army', 'Marines', 'Navy' ]
  },

  methods: {
    ...mapMutations(['setHasSigned']),

    async submitForm() {
      this.isSending = true
      this.$ga.event('form', 'submitted', 'Sign the Letter')

      try {
        const { data } = await axios.post(
          `https://fv8xpw9hri.execute-api.us-east-1.amazonaws.com/v1/petitions/${settings.actionNetworkPetitionId}/signatures`,
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            zip_code: this.zipCode,
            comments: this.comments,
            custom: {
              military_branch: this.branchOfService
            },
            tags: this.tags,
            source: this.$route.query.source
          }
        )

        this.resetForm()
        this.setHasSigned(true)
      }
      catch (error) {
        this.isSending = false
        this.errorMessage = "That didn't work for some reason :("
      }
    },

    resetForm() {
      this.isSending = false
      this.name = null
      this.email = null
      this.phone = null
      this.zipCode = null
      this.comments = null
      this.branchOfService = null
    }
  }
}
</script>
