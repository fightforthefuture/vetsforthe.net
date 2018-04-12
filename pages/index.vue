<template>
  <div class="container">
    <section>
      <h1>
        <small>May 2nd, 2018:</small>
        Small Businesses Can Save the Internet
      </h1>
      <p>The first week of May is national “Small Business Week.” Thousands of small businesses are signing on to this open letter to Congress, just weeks before they’re expected to vote on the Congressional Review Act (CRA) resolution to block the FCC’s repeal of net neutrality</p>
      <p>Small businesses will be hurt the most by the loss of net neutrality, but can also play a key role in saving it. Members of Congress take businesses owners from their district very seriously. We’re delivering the letter on May 2, so we have until then to get as many businesses to sign as possible. Please spread the word!</p>
      <p>
        <a class="btn btn-block" href="#signon">Sign the letter</a>
      </p>
      <nav class="section-links flex-center">
        <a href="#letter">Read the Letter</a>
        <a href="#businesses">Participating Businesses</a>
        <a href="#events">Join an Event</a>
      </nav>
    </section>

    <section id="signon">
      <div v-if="!hasSigned">
        <h2>
          Sign the Letter
          <small>Business owners: enter your company information below</small>
        </h2>
        <action-network-form></action-network-form>
      </div>
      <div class="thanks" v-else>
        <h2>Thanks for signing!</h2>
        <p>Thank you for signing on the to the open letter. We will be sure to add your name.</p>
        <p>Now, will you take the next step and share this campaign to maximize your impact? Share now with just a couple of clicks:</p>

        <p class="buttons">
          <facebook-button></facebook-button>
          &nbsp;
          <twitter-button></twitter-button>
          &nbsp;
          <linked-in-button></linked-in-button>
        </p>

        <p>And please forward this open letter to any small or medium-sized businesses that might be interested in signing on.</p>

        <p>Email or text the URL <a href="https://www.businessesfornetneutrality.com">https://www.businessesfornetneutrality.com</a> to everyone you know in the business community.</p>

        <p>If the business community can show Congress and FCC Chairman Ajit Pai that they are deeply concerned about the loss of net neutrality, we can win. But this only works if you help spread the word.</p>

        <p>This is one of the best opportunities since the historic July 12th day of action to speak up for net neutrality. The letter will help send a clear message to decison-makers that small businesses cannot afford to lose these common sense protections, and put us in the strongest possible position to protect the open Internet going forward.</p>
      </div>
    </section>

    <section id="letter">
      <h2>
        Read the Letter
        <small><a href="/businesses_for_net_neutrality.pdf">Download the Letter to Congress</a></small>
      </h2>
      <div v-html="letterToCongress"></div>
    </section>

    <section id="businesses">
      <h2>Participating Businesses</h2>
      <p>Thousands of businesses have signed the letter to support the CRA to save net neutrality.  Will your business join us?</p>
      <div class="logos">
        <img src="~/assets/images/logos/asbc.png" alt="The American Sustainable Business Council">
        <img src="~/assets/images/logos/engine.png" alt="Engine Advocacy">
        <img src="~/assets/images/logos/fftf-dark.svg" alt="Fight for the Future">
        <img src="~/assets/images/logos/good-business-colorado.png" alt="Good Business Colorado">
        <img src="~/assets/images/logos/msa.png" alt="The Main Street Alliance">
        <img src="~/assets/images/logos/small-business-majority.png" alt="Small Business Majority">
      </div>

      <a @click.prevent="businessListIsVisible = !businessListIsVisible" href="#" class="view-all"><span v-if="businessListIsVisible"><strong>-</strong> Hide</span><span v-else><strong>+</strong> View</span> all {{ businesses.length }} Businesses</a>
      <div v-if="businessListIsVisible">
        <ul>
          <li v-for="biz in businesses" :key="biz.name">
            {{ biz.name }}
            <small v-if="biz.city && biz.state">{{ biz.city }}, {{ biz.state }}</small>
          </li>
        </ul>
      </div>
    </section>

    <section id="events">
      <h2><strong>May 2:</strong> Host or Join an Event</h2>
      <p>
        <b>Check out the map to find events related to net neutrality in your area</b><br>
        If you’d like to organize a letter delivery to a congressperson in your area, read the instructions below and click the link to Organize a Delivery.
      </p>
      <iframe class="map" src="https://events.battleforthenet.com/iframe"></iframe>

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
          <p>Once you add your event to the map, we’ll contact other small business owners and net neutrality supporters in your area and encourage them to attend. But you should spread the word too! Invite others to join you directly via email, text message, and social media <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/" target="_blank">(sample content here)</a>. Send a simple Media Advisory <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/" target="_blank">(sample here)</a> to local reporters and invite them to come.</p>
        </li>
        <li>
          <h4>Deliver the Letter</h4>
          <p>Select your state below to print out the letter and complete list of businesses who have signed on. Show up a few minutes early and wait outside the office for others to come. Around 15 minutes after the start time, go into the office with your crew of people and deliver the letter to the staffer at the front desk. Be friendly and polite, note the number of businesses in their district that have signed, and ask them to make sure the lawmaker gets it. Reiterate the ask of the letter: we want the Congress member to support the Congressional Review Act (CRA) resolution to overturn the FCC’s repeal of net neutrality.</p>
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
          <p>After you deliver the letter, host a short “press conference” outside the office. Gather all your supporters together in a tight group right in front of the building. Think about how it will look in a photo in the local paper. Face the press with your crowd behind you. Have any small business owners in attendance speak for no more than 2 minutes about why they signed the letter and why net neutrality is important to them <a href="https://docs.google.com/document/d/1dS-GtwKUxFPnjcpXzTtEroEiGmct1L6B-aUVBewN1YQ/edit" target="_blank">(sample talking points here)</a>. Have copies of the letter and/or your press advisory to hand to reporters. The whole thing should be quick, wrap it up after 30 minutes or so! Be sure to post photos on social media using the hashtags #SmallBusinessWeek and #NetNeutrality, and send them to us at <a href="mailto:team@fightforthefuture.org">team@fightforthefuture.org</a> so we can share them with the world on social media!</p>

          <div class="organize">
            <p><b>Don’t worry if you’ve never done anything like this before.  Many people who organize a delivery are doing it for the first time.  Organizing a delivery will make a difference, and we’ll be here to help you.</b></p>
            <a href="http://act.demandprogress.org/event/team-internet/create/" target="_blank">Organize a Delivery</a>
          </div>
        </li>
      </ol>
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
import ActionNetworkForm from '~/components/ActionNetworkForm'
import SocialSidebar from '~/components/SocialSidebar'
import FacebookButton from '~/components/FacebookButton'
import TwitterButton from '~/components/TwitterButton'
import LinkedInButton from '~/components/LinkedInButton'
import states from '~/assets/data/states.json'
import businesses from '~/assets/data/businesses.json'
import { geocodeState, simpleFormat } from '~/assets/js/helpers.js'
import settings from '~/config.json'

export default {
  components: {
    ActionNetworkForm,
    SocialSidebar,
    FacebookButton,
    TwitterButton,
    LinkedInButton
  },

  computed: {
    ...mapState(['hasSigned']),
    states: () => states,
    businesses: () => businesses,
    letterToCongress: () => simpleFormat(settings.letterToCongress)
  },

  data() {
    return {
      selectedState: null,
      businessListIsVisible: false
    }
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

  methods: {
    printLetter() {
      this.$ga.event('button', 'clicked', 'Print the Letter')
      window.open(`/pdfs/${this.selectedState.toLowerCase()}.pdf`, '_blank')
    }
  }
}
</script>
