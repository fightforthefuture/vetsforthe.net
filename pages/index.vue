<template>
  <div class="container">
    <section>
      <h1>
        <Counter :count="signatureCount" /><br />
        Veterans for net neutrality
      </h1>
      <p>Veterans, service members and military families rely on the open Internet to stay in touch with loved ones
      overseas, and to access essential services at home such as health care, education and employment. The repeal
      of net neutrality gives cable companies the authority to throttle traffic, censor online free speech and charge
      new fees that veterans can’t afford. If you are a US veteran or active-duty service member, please sign this open
      letter calling on our elected officials in Congress to restore net neutrality. </p>
      <p><a class="btn btn-block" href="#signon" @click.prevent="scrollTo('#signon')">Sign the letter</a></p>
      <nav class="section-links flex-center">
        <a href="#letter" @click.prevent="scrollTo('#letter')">Read the Letter</a>
        <a href="#events" @click.prevent="scrollTo('#events')">Attend a Letter Delivery</a>
        <a href="#participants" @click.prevent="scrollTo('#participants')">Participating Organizations</a>
      </nav>
    </section>

    <section id="signon">
      <div v-if="!hasSigned">
        <h2>
          Sign the Letter
        </h2>
        <action-network-form></action-network-form>
      </div>
      <div class="thanks" v-else>
        <h2>Thanks for signing on.</h2>
        <p>Thank you for signing on the to the open letter in support of the Congressional Review Act (CRA) resolution to restore net neutrality. Please forward widely and spread the word to other veterans and patriots you know:</p>

        <p>Thank you for signing on the to the open letter. We will be sure to add your name.</p>
        <p>Now, will you take the next step and share this campaign to maximize your impact? Share now with just a couple of clicks:</p>

        <p class="buttons">
          <facebook-button></facebook-button>
          &nbsp;
          <twitter-button></twitter-button>
        </p>

        <p>Now we need you to help deliver the open letter directly to Congress:</p>

        <p>
          <a class="btn btn-block" href="#events">Let's go!</a>
        </p>

        <p>Sharing the open letter widely and helping a delivery and press conference happen will make a difference, and we’ll be here to help you every step of the way.</p>
      </div>
    </section>

    <section id="letter">
      <h2>
        Read the Letter
        <small><a href="/Veterans.pdf">Download the Letter to Congress</a></small>
      </h2>
      <div v-html="letterToCongress"></div>
    </section>

    <section id="quotes">
      <h2 ref="quotesWidth">What Vets are saying:</h2>
      <p>Thousands of veterans from all five branches of service have signed this open letter to Congress, urging our lawmakers to listen to the voices of the people and overturn the FCC's repeal of net neutrality.  These are just a few comments from men and women who feel that the destruction of net neutrality is counter to the values they have fought to protect:
      </p>
      <quote-scroller :init-quotes-width="initQuotesWidth"></quote-scroller>
    </section>

    <section id="participants">
      <h2>Participating Organizations</h2>
      <p>These organizations support the veterans and active service members who have signed the open letter to Congress to restore net neutrality.</p>
      <LogoCloud />
    </section>

    <section id="events">
      <h2>JOIN A VETERANS DELEGATION TO DELIVER THE LETTER ON AUGUST 28</h2>
      <p>Our Congressional representatives are home in their districts for August recess. On Tuesday, August 28th, US veterans and supporters across the country will gather outside our elected officials' offices and present them with our open letter calling on lawmakers to restore net neutrality.</p>
      <p><a href="https://www.battleforthenet.com/map/"><img src="https://data.battleforthenet.com/events.png" alt="Events map" class="rounded" /></a></p>

      <form>
        <div class="row">
          <input type="tel" v-model="zipCode" placeholder="ZIP Code">
          <a class="btn" :href="`https://www.battleforthenet.com/map/?zip=${zipCode || ''}`">Find a Delivery</a>
          <a class="btn" href="mailto:team@fightforthefuture.org?subject=I%20want%20to%20host%20a%20Veterans%20for%20Net%20Neutrality%20Letter%20Delivery">Host a Delivery</a>
        </div>
      </form>

      <br>
      <h2 id="print">Print the Letter</h2>
      <p>Select your state below to print out the letter and complete list of veterans who have signed on. Show up a few minutes early and wait outside the office for others to come. Around 15 minutes after the start time, go into the office with your crew of people and deliver the letter to the staffer at the front desk. Be friendly and polite, note the number of veterans in their district that have signed, and ask them to make sure the lawmaker gets it. Reiterate the ask of the letter: we want the Congress member to support the Congressional Review Act (CRA) resolution to overturn the FCC’s repeal of net neutrality.</p>
      <div class="state-selector flex-row">
        <select v-model="selectedState">
          <option :value="null">Select your state</option>
          <option v-for="(name, abbr) in states" :key="abbr" :value="abbr">{{ name }}</option>
        </select>
        <button class="btn" :disabled="!selectedState" @click="printLetter()">Print the Letter</button>
      </div>

<!--
      <h3>
        How to Organize a Letter Delivery
        <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/" target="_blank">(Click Here to View a Downloadable Package):</a>
      </h3>

      <ol>
        <li>
          <h4>Pick a Congressional Office and Add It to the Map</h4>
          <p>First, decide which member of Congress’ office you want to deliver the letter to. <a href="https://www.battleforthenet.com/scoreboard/" target="_blank">Check here</a> to see where your lawmakers stand on the CRA to save net neutrality and, if you can, organize the letter delivery at the office of a lawmaker who does not yet support the CRA. Preserving the open Internet matters to the overwhelming majority of Americans, so it’s important that we persuade as many members of Congress as possible to vote for the CRA.</p>
        </li>
        <li>
          <h4>Recruit Others and Alert Local Media</h4>
          <p>Once you add your event to the map, we’ll contact other veterans and net neutrality supporters in your area and encourage them to attend. But you should spread the word too! Invite others to join you directly via email, text message, and social media <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/" target="_blank">(sample content here)</a>. Send a simple Media Advisory <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/" target="_blank">(sample here)</a> to local reporters and invite them to come.</p>
        </li>
        <li>
          <h4 id="deliver-the-letter">Deliver the Letter</h4>
          <p>Select your state below to print out the letter and complete list of veterans who have signed on. Show up a few minutes early and wait outside the office for others to come. Around 15 minutes after the start time, go into the office with your crew of people and deliver the letter to the staffer at the front desk. Be friendly and polite, note the number of businesses in their district that have signed, and ask them to make sure the lawmaker gets it. Reiterate the ask of the letter: we want the Congress member to support the Congressional Review Act (CRA) resolution to overturn the FCC’s repeal of net neutrality.</p>
          <div class="state-selector flex-row">
            <select v-model="selectedState">
              <option :value="null">Select your state</option>
              <option v-for="(name, abbr) in states" :key="abbr" :value="abbr">{{ name }}</option>
            </select>
            <button class="btn" :disabled="!selectedState" @click="printLetter()">Print the Letter</button>
          </div>
        </li>
        <li>
          <h4>Talk to the Press</h4>
          <p>After you deliver the letter, host a short “press conference” outside the office. Gather all your supporters together in a tight group right in front of the building. Think about how it will look in a photo in the local paper. Face the press with your crowd behind you. Every veteran in attendance is encouraged to speak about why they signed the letter and why net neutrality is important to them <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/edit" target="_blank">(sample talking points here)</a>, but we encourage each veteran to limit their speaking time to 2 minutes so everyone has a chance to be heard. Have copies of the letter and/or your press advisory to hand to reporters. The whole thing should be quick; you can wrap it up after 30 minutes or so! Be sure to post photos on social media using the hashtags #VetsForTheNet and #NetNeutrality, and send them to us at <a href="mailto:team@fightforthefuture.org">team@fightforthefuture.org</a> so we can share them with the world on social media!</p>

          <div class="organize">
            <p><b>Don’t worry if you’ve never done anything like this before.  Many people who organize a delivery are doing it for the first time.  Organizing a delivery will make a difference, and we’ll be here to help you.</b></p>
            <a :href="createEventURL" target="_blank" @click="$ga.event('button', 'clicked', 'Organize a Delivery')">Organize a Delivery</a>
          </div>
        </li>
      </ol>
 -->
    </section>

    <footer class="site-footer">
      <p>Built by:</p>
      <a href="https://www.fightforthefuture.org"><img src="~/assets/images/logos/fftf-dark.svg" alt="Fight for the Future"></a>
      <p>
        Press contact:
        <a href="mailto:press@fightforthefuture.org">press@fightforthefuture.org</a> /
        <a href="tel:15084745248">+1 508 474 5248</a>
      </p>
    </footer>

    <social-sidebar/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { stringify } from 'querystring'
import ActionNetworkForm from '~/components/ActionNetworkForm'
import Counter from '~/components/Counter'
import QuoteScroller from '~/components/QuoteScroller'
import SocialSidebar from '~/components/SocialSidebar'
import FacebookButton from '~/components/FacebookButton'
import TwitterButton from '~/components/TwitterButton'
import LinkedInButton from '~/components/LinkedInButton'
import LogoCloud from '~/components/LogoCloud'
import states from '~/assets/data/states.json'
import { geocodeState, simpleFormat, smoothScrollToElement } from '~/assets/js/helpers.js'
import settings from '~/config.json'
import axios from 'axios'

export default {
  components: {
    ActionNetworkForm,
    Counter,
    SocialSidebar,
    FacebookButton,
    TwitterButton,
    LinkedInButton,
    LogoCloud,
    QuoteScroller
  },

  computed: {
    ...mapState(['hasSigned']),
    states: () => states,
    letterToCongress: () => simpleFormat(settings.letterToCongress),

    eventsQueryString() {
      return stringify(Object.assign({
        source: 'businessesfornetneutrality'
      }, this.$route.query))
    },

    createEventURL() {
      return `https://act.demandprogress.org/event/team-internet/create/?${this.eventsQueryString}`
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },

      set(value) {
        this.$store.commit('setZipCode', value)
      }
    }
  },

  data() {
    return {
      selectedState: null,
      businessListIsVisible: false,
      businesses: [],
      isLoading: false,
      initQuotesWidth: 550
    }
  },

  async asyncData() {
    let signatureCount = 0

    try {
      const { data } = await axios.get('https://data.battleforthenet.com/vetsforthenet/data.json')
      signatureCount = data.signatureCount
    }
    catch (error) {
      // Signature count as of 10/1/18
      signatureCount = 4629
    }

    return { signatureCount: signatureCount }
  },

  async created() {
    try {
      const state = await geocodeState()
      this.selectedState = state.abbr
    }
    catch (error) {
      console.error("Geocoder error", error)
    }
  },

  mounted() {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView()
      }
    }

    this.setQuoteWidthInScroller()
    this.$nextTick(function() {
      window.addEventListener('resize', this.setQuoteWidthInScroller)
    })
  },

  methods: {
    setQuoteWidthInScroller() {
      this.initQuotesWidth = this.$refs.quotesWidth.clientWidth
    },

    printLetter() {
      this.$ga.event('button', 'clicked', 'Print the Letter')
      window.open(`https://data.battleforthenet.com/vetsforthenet/pdfs/${this.selectedState.toLowerCase()}.pdf`, '_blank')
    },

    toggleBusinessList() {
      this.businessListIsVisible = !this.businessListIsVisible

      if (this.businessListIsVisible && this.businesses.length === 0) {
        this.fetchBusinesses()
      }
    },

    async fetchBusinesses() {
      this.isLoading = true
      const { data } = await axios.get('/businesses.json')
      this.businesses = data
      this.isLoading = false
    },

    scrollTo(hash) {
      const duration = 500
      smoothScrollToElement(hash, duration)
      setTimeout(() => {
        location.hash = hash
      }, duration)
    }
  }
}
</script>
