<template>
  <div class="container relative">
    <div class="my-10 mx-auto max-w-lg text-center">      
      <div>
        <nuxt-link to="/">
          <img src="/img/logo.png" alt="OneClickDB logo" width="50" class="inline" />
        </nuxt-link>
      </div>
      
      <div class="text-blueGray-600 bg-blue-100 inline-block  py-2 px-5 rounded-md mt-5">
               
        <nuxt-link to="/home" class="text-blue-600 font-bold hover:underline">login</nuxt-link>
        <nuxt-link to="/auth/start" class="button text-blue-600 bg-amber-300 font-bold ml-5" v-if="!$auth.loggedIn">sign up for free</nuxt-link>
      </div>
    </div>  

     <div class="absolute left-0 right-0 hidden lg:block" style="z-index: -1;">
       <div class="mx-auto max-w-5xl -mt-10">
        <span class="text-8xl font-black text-blue-50 float-left transform rotate-6">&#123;&#123;</span>
        <span class="text-8xl font-black text-blue-50 float-right transform -rotate-6">&#125;&#125;</span>
       </div>
    </div>  

    <div class="prose mx-auto max-w-4xl text-center mt-12">      
      <h1 class="">Static Site. Dynamic Data.</h1>      
      <div class="mx-auto max-w-2xl">
        <p>Is OneClickDB the <em><strong>fastest</strong></em> way to edit your website? Sure, but nevermind that. <br class="hidden md:block"/>Because it’s the most <em><strong>enjoyable</strong></em> way. Ahhhh. Refreshing. <nuxt-link to="/auth/start" class='button'>See for yourself --></nuxt-link></p>      
      </div>
      
       <div class="text-center mt-20">
        <p><nuxt-link to="/#developers">Enjoyed by <strong>Developers</strong></nuxt-link></p>
        <p><nuxt-link to="/#editors">Enjoyed by <strong>Editors</strong></nuxt-link></p>
        <p><nuxt-link to="/#visitors">Enjoyed by <strong>Visitors</strong></nuxt-link></p>
      </div>
    </div>

   

    <section class="mx-auto mt-20 max-w-3xl border-2 rounded-lg border-black h-full bg-white">
        <div class="px-5 pt-3 pb-2 leading-none border-b-2 border-black">
            <span class="h-5 w-5 inline-block rounded-full bg-rose-600"></span>
            <span class="h-5 w-5 inline-block rounded-full bg-amber-400 ml-2"></span>
            <span class="h-5 w-5 inline-block rounded-full bg-lime-600 ml-2"></span>
        </div>
        <div>
          <video width="100%" autoplay loop muted class="mx-auto">
            <source src="/demo.mp4" type="video/mp4">
          </video> 
        </div>
    </section>


    <div class="prose mx-auto max-w-xl mt-32" id="developers">  
      <h2>Enjoyed by Developers</h2>
      <div>
        <p><strong>C. M. S.</strong> <em>CMS.</em> <strong><em>CMS.</em></strong> Oh boy, those three letters scare me.</p>
        <p>But worry not! Instead of spending 4 hours setting up a headless CMS or 40 hours setting up a WordPress site... it'll take you about <strong>4 minutes</strong> to get all of this up and running.</p>
        <ol>
          <li>Create, edit, and publish your database(s) in a matter of seconds.</li>
          <li>Optionally hand it off to teammmates or clients to do all the data entry.</li>
          <li>Use your favorite JavaScript (or Python, or PHP, or Rails, or whatever) package to fetch the JSON API endpoint.</li>
          <li>Insert the data wherever you want it on the page.</li>
          <li>Your website automatically shows your most up-to-date content!</li>
        </ol>
        <p>Here's an example that <a href="https://twitter.com/brianball" target="_blank">Brian</a> made using oldschool vanilla JavaScript...</p>
      </div>      
    </div>
    <div class="mx-auto max-w-4xl">
      <p class="codepen" data-height="392" data-theme-id="dark" data-default-tab="js,result" data-user="ideabrian" data-slug-hash="abpooOd" style="height: 392px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="TeamMrPatGriffith">
        <span>See the Pen <a href="https://codepen.io/ideabrian/pen/abpooOd">
        TeamMrPatGriffith</a> by Brian Ball (<a href="https://codepen.io/ideabrian">@ideabrian</a>)
        on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    </div>

    <div class="prose mx-auto max-w-xl mt-32" id="editors">  
      <h2>Enjoyed by Editors</h2>
      <div>
        <p>Life is busy. Between work and frisbee practice it’s really hard to make time for slightly less important things, like updating your website with your new contact info. Or editing that typo that your dad told you about. Or publishing your latest blog post.</p>
        <p>That’s where OneClickDB comes in. OCDB takes all the friction out of the editing process, so you can go from idea to edit in 4.7 seconds (seriously, I timed it) whether you’re at your desk or your daughter's soccer practice.</p>
      </div>
    </div>

    <div class="prose mx-auto max-w-xl mt-32" id="visitors">  
      <h2>Enjoyed by Visitors</h2>
      <div>        
        <p>Content Management Systems are slow. But OneClickDB is fast, with an average response time of <code>0.052 seconds</code>.</p>
        <p>Does speed matter? <a href="https://www.nngroup.com/articles/website-response-times/" target="_blank">These</a> <a href="https://neilpatel.com/blog/speed-is-a-killer/" target="_blank">smart</a> <a href="https://moz.com/blog/why-site-speed-still-matters" target="_blank">folks</a> <a href="https://moz.com/learn/seo/page-speed" target="_blank">sure</a> <a href="https://www.cloudflare.com/learning/performance/why-site-speed-matters/" target="_blank">think</a> <a href="https://web.dev/why-speed-matters/" target="_blank">so</a>.</p>
      </div>
    </div>    

    <div id="pricing" class=" mt-32">
      <div class="prose mx-auto max-w-xl mb-10">
        <h2>Grab Your Wallet!</h2>
        <div v-html="$md.render(content.pricing_content.value )"></div>        
      </div>
      <div class="grid md:grid-cols-3 gap-5 mx-auto">
        <div class="bg-blue-100 py-5 px-8 rounded-md prose">
          <h2 class="mb-0">Solo</h2>
          <h4>FREE</h4>
          <p>1 user. 1 database.<br/>Perfect for your personal website.</p>
          <nuxt-link to="/auth/start" class="text-blue-600 font-bold button"  v-if="!$auth.loggedIn">Sign Up Now</nuxt-link>
        </div>
        <div class="bg-blue-100 py-5 px-8 rounded-md prose">
          <h2>Early Bird</h2>
          <h4>$75 once</h4>
          <p>Lifetime access to the Pro plan. Probably hurry up if you want this.</p>
          <nuxt-link to="/auth/start" class="text-blue-600 font-bold button" v-if="!$auth.loggedIn">Sign Up Now</nuxt-link>
          <upgrade v-else />
          
        </div>
        <div class="bg-gray-100 py-5 px-8 rounded-md prose">
          <h2>Pro</h2>
          <h4>$15/mo</h4>
          <p>Unlimited users + databases.<br/>Perfect for freelancers and entrepreneurs.</p>
          <span>Available Soon</span>
        </div>
      </div>
    </div>

    <div id="pricing" class=" mt-32">
      <div class="prose mx-auto max-w-xl mb-10">
        <h2>Getting Started</h2>
        <p>Brian tweeted a complete step-by-step of how to implement OneClickDB. He said it better than I ever could, so...</p>
      </div>
      <div class="twitter-wrapper"><blockquote class="twitter-tweet tw-align-center"  data-conversation="none"><p lang="en" dir="ltr">Implementing <a href="https://twitter.com/MrPatGriffith?ref_src=twsrc%5Etfw">@MrPatGriffith</a> &#39;s OneClickDB idea with the help of <a href="https://twitter.com/panphora?ref_src=twsrc%5Etfw">@panphora</a> ( who&#39;s challenging us all to a hackathon )<br><br>Here are the steps in a thread:<br><br>🧵<br><br>1. - Sign up at <a href="https://t.co/2TWTsVJsjP">https://t.co/2TWTsVJsjP</a><br><br>👇</p>&mdash; Brian Ball (@brianball) <a href="https://twitter.com/brianball/status/1373724308212654081?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </div>
      <div class="text-center mt-5">
        <a class="button text-blue-600 font-bold" href="https://twitter.com/brianball/status/1373724308212654081?ref_src=twsrc%5Etfw" target="_blank">View this thread --></a>      
      </div>

    </div>

    <div class="prose mx-auto max-w-xl mt-32" id="roadmap">  
      <h2>Roadmap</h2>
      <div>
        <p>OneClickDB was built during <a href="https://twitter.com/panphora/status/1372575280049631238" target="_blank">a hackathon</a> in March 2021. It’s already super useful for a lot of use cases, and I’m actively working on making it even more so (without compromising the absurd simplicity).</p>        
        <p>Here is some of what’s in store for the next month.</p>
        <ul>
          <li><strong>A bunch of small stuff</strong> like autosave notifications, form error handlers, input autofocus, drag-to-reorder, etc.</li>
          <li><strong>Images:</strong> adding an image content type that let's editors easily upload or paste an image, then stores the file and returns the url in the response.          
          <li><strong>Multi-DB:</strong> <em>Pro</em> users will be able to manage unlimited databases from one account.</li>
          <li><strong>Collaboration:</strong> <em>Pro</em> users will be able to add unlimited collaborators to their account.</li>
          <li><strong>Restricted Client Mode:</strong> Are you using OneClickDB as a CMS for a client? This feature let's you disable "structure mode" for clients, so they can update the content but not mess with the schema.</li>
          <li><strong>Deploy Script:</strong> Automatically do something whenever you click publish. eg you could use use dynamic data with a static site generator 🤯</li>
          <li><strong>Versioning:</strong> A simple way to go back in time in case you break something :)</li>
          <li><strong>Templates:</strong> Export your database structure and share it with a friend. They can then install the exact same database with one click.</li>
          <li><strong>API:</strong> some very simple endpoints to allow for two-way editing. Eg, your database can edit your website, and your website can edit your database. This will open the door for a whoooollleeee bunch of new use cases.</li>
        </ul>
      </div>
    </div>  

    <div class="prose mx-auto max-w-xl mt-32 mb-32">
      <h2>Questions</h2>
      <p>Questions? Concerns? Feedback?</p> 
      <p><a href="mailto:mister@patgriffith.com">Email me</a> or <a href="https://twitter.com/mrpatgriffith" target="_blank">tweet at me</a> and I’d be happy to bend over backwards as far as I humanly can. Seriously. This is my project, you are my customer, and there’s literally no way I’d rather spend my time than talking to you. Because <em>you</em> are the key to making OneClickDB a success.</p>
      <p>And if you’re on the fence... check out how real humans are using OCDB:</p>
    </div>

    <div class="text-center">
      <div class="twitter-wrapper"><blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">✅ another item off the Todo list! I made my personal page dynamic using <a href="https://t.co/DY51sl0jLT">https://t.co/DY51sl0jLT</a> – a top contender for the OneClickDB Hackathon by <a href="https://twitter.com/MrPatGriffith?ref_src=twsrc%5Etfw">@MrPatGriffith</a>. Took about 2 minutes to add enough jQuery to make bits of my personal page dynamic. <a href="https://t.co/i8KPkHBqmF">pic.twitter.com/i8KPkHBqmF</a></p>&mdash; James Futhey 🔊 (@kidgdzilla) <a href="https://twitter.com/kidgdzilla/status/1373538524943720449?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </div>
      <div class="twitter-wrapper"><blockquote class="twitter-tweet tw-align-center"><p lang="en" dir="ltr">I&#39;m building with Pat&#39;s OneClickDB Implementation.<br><br>Here&#39;s what I&#39;m up to:<br><br>1. Layout the data in the Developer view<br>2. Label my data in the Editor view<br>3. Create a basic HTML template<br>4. Use a basic JavaScript fetch<br>5. Use JavaScript to put the data values into the HTML.<br><br>EASY! <a href="https://t.co/mSpTki4KyY">https://t.co/mSpTki4KyY</a></p>&mdash; Brian Ball (@brianball) <a href="https://twitter.com/brianball/status/1373695521735331840?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </div>
    </div>

    <div class="text-center">
      <nuxt-link to="/auth/start" class="button text-blue-600 bg-amber-300 font-bold my-10 text-3xl inline-block" v-if="!$auth.loggedIn">sign up already</nuxt-link>
    </div>

    <div class="prose mx-auto max-w-xl mb-20 text-center">
      <p>&nbsp;</p>
      <p><span class="text-gray-500">Built by <a href="https://patgriffith.com" target="_blank">Pat Griffith</a></span></p>
    </div>  


    <div class="fixed right-0 bottom-0  mr-10 bg-gray-200 hidden lg:block" style="width: 500px;" :class="[exampleVisible ? 'top-0 mt-20' : '']" v-if="false">
      <div class="bg-gray-900 py-3 px-5">
        <span class="text-gray-300 flex items-center cursor-pointer hover:text-white" @click="exampleVisible = !exampleVisible">
          <span>
            <v-icon name="chevron-circle-down" scale="1.5" v-if="exampleVisible" />
            <v-icon name="chevron-circle-up" scale="1.5" v-else />
          </span>
          <span class="ml-2 font-bold">{{ exampleVisible ? 'Hide Me' : 'Edit Me' }}</span>
        </span>
      </div>
      <div class="px-5 absolute inset-0 mt-16 mb-5 overflow-scroll" v-if="exampleVisible">
        <div v-for="(key, index) in keys" :key="index" class="mb-4">
          <label v-html="key" class="text-gray-700 text-sm block mb-1"></label>
          <textarea class="input w-full" v-if="content[key].type == 'text'" v-model="content[key].value"></textarea>
          <input class="input w-full" type="text" v-else v-model="content[key].value" />
        </div>

        <div v-if="exampleJsonVisible">          
          <div class="overflow-hidden prose pt-4">
            <p>Copy this JSON and email it to <a href="mailto:mister@patgriffith.com">mister@patgriffith.com</a> and I might just use some of it!</p>
            <code ><pre contenteditable="true">{{ content }}</pre></code>
          </div>
        </div>
        <span v-else class="button mt-5" @click="exampleJsonVisible = true">Save</span>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      exampleVisible: false,
      exampleJsonVisible: false,
      content: {
        h1: {
          value: "The fastest way to create, edit, and deploy a database.",
          type: "string"
        },
        h2: {
          value: "OneClickDB is the fastest way to add dynamic data to your website.<br/>Or your client's website. Don’t believe me? <a href='' class='button'>Try it for yourself.</a>",
          type: "string"
        },
        caption: {
          value: "Create a database in about 25 seconds.<br/>Then install it on your website in about 2 minutes.",
          type: "string"
        },
        why_title: {
          value: "Why choose OneClickDB?",
          type: "string"
        },
         why_content: {
          value: `I’m  happy you asked 🤣! Here are a few lovely use cases:
          \n\n1. **Keep your website up to date.**
          \n\n2. **Give your clients the worl's simplest CMS.**
          \n\n3. **Give your clients the worl's simplest CMS.**
          `,
          type: "text"
        },
        pricing_title: {
          value: "Pricing",
          type: "string"
        },
        pricing_content: {
          value: "OneClickDB is free forever for a single user with a single database. And pretty darn affordable if you wanna upgrade. But hurry hurry hurry if you wanna save some cash-money, because the **Early Bird** plan is going away forever as soon as the **Pro** plan is ready (literally any day now).\n\nWhy so cheap? The same reason it’s so fast. Caching!",
          type: "text"
        },
        roadmap_title: {
          value: "Roadmap",
          type: "string"
        },
        roadmap_content: {
          value: "Here go a list of features maybe?\n\n- feature 1\n\n- feature 2\n\n- oh hey, markdown is cool",
          type: "text"
        },

      }
    }
  },
  computed: {
    keys() {
      let arr = []
      for (const [key, value] of Object.entries(this.content)) {
        arr.push(key)
      }
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-weight: 900;
  font-size: 2.5em;
  margin-bottom: 0;
}
#pricing {
  h2 {
    @apply mb-2;
  }
  h4 {
    @apply text-rose-600;
  }
}
.caption {
    @apply text-xl leading-2 mt-3 mx-auto max-w-2xl text-blue-900 italic;
    p {
        @apply text-lg mt-2 not-italic text-blue-400;
    }
}
.prose {
  code {
    &:before, &:after {
      display: none!important;
    }
  }
}
</style>