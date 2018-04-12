<template>
  <form @submit.prevent="submitForm()">
    <div class="row">
      <input v-model="name" type="text" placeholder="Name*" required>
      <input v-model="email" type="email" placeholder="Email*" required="">
    </div>
    <div class="row">
      <input v-model="company" type="text" placeholder="Company Name*" required="">
      <input v-model="companyURL" type="text" placeholder="Company Website or LinkedIn*" required>
    </div>
    <div class="row">
      <input v-model="phone" type="tel" placeholder="Phone">
      <input v-model="zipCode" type="tel" placeholder="ZIP Code*" required>
    </div>
    <div class="comments">
      <textarea v-model="comments" placeholder="Comments" class="display-block"></textarea>
      <label>
        <input type="checkbox" v-model="isAuthorized" required>
        <small>&nbsp;I am authorized to represent my company's position on net neutrality</small>
      </label>
    </div>
    <div class="row">
      <button class="btn btn-block" :disabled="isSending">
        <span v-if="isSending">Saving...</span>
        <span v-else>Sign the Letter</span>
      </button>
    </div>
    <div class="disclaimer">
      <a href="https://www.fightforthefuture.org">Fight for the Future</a> will email you updates, and you can unsubscribe at any time. If you enter your number (it's optional) we will follow up by SMS. Message &amp; data rates apply. You can always text STOP to stop receiving messages. <a href="https://www.fightforthefuture.org/privacy/">Privacy Policy</a>
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
      company: null,
      companyURL: null,
      phone: null,
      zipCode: null,
      comments: null,
      isAuthorized: false,
      isSending: false,
      modalVisible: false,
      errorMessage: null
    }
  },

  methods: {
    ...mapMutations(['setHasSigned']),

    async submitForm() {
      this.isSending = true

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
              company: this.company,
              company_url: this.companyURL,
            }
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
      this.company = null
      this.companyURL = null
    }
  }
}
</script>
