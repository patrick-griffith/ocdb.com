<template>
  <div class="container">    
    <div class="my-10 mx-auto max-w-lg text-center">      
      <div>
        <nuxt-link to="/">
          <img src="/img/logo.png" alt="One Click DB logo" width="50" class="inline" />
        </nuxt-link>
      </div>
      
      <div class="text-gray-600 bg-blue-100 inline-block  py-2 px-5 rounded-md mt-5">
        <nuxt-link to="/#why" class="hover:underline">why?</nuxt-link>
        <nuxt-link to="/#pricing" class="ml-5 hover:underline">pricing</nuxt-link>        
        <nuxt-link to="/home" class="text-blue-600 font-bold ml-5 hover:underline">login</nuxt-link>
      </div>
    </div>

    <div class="prose mx-auto max-w-xl text-center">
      
      <h1 v-html="content.h1.value"></h1>      
      <p v-html="content.h2.value"> </p>
      <nuxt-link to="/auth/start" class="button" v-html="content.button_text.value"></nuxt-link>
      
    </div>


    <div class="mt-20 relative max-w-4xl mx-auto">
        <img src="https://picsum.photos/1200/600" width="1200" height="600" alt="" class="rounded" />
    </div>        
    <!-- <h2 class="caption">Collaborate with coworkers, clients, and alpha testers named Susan.</h2> -->
    <div class="caption text-center">
      <div v-html="content.caption.value"></div>
    </div>


    <div class="prose mx-auto max-w-xl mt-20" id="why">  
      <h2  v-html="content.why_title.value"></h2>
      <div v-html="$md.render(content.why_content.value )"></div>
    </div>
    
    <div id="pricing" class=" mt-20">
      <div class="prose mx-auto max-w-xl mb-10">
        <h2 v-html="content.pricing_title.value"></h2>
        <div v-html="$md.render(content.pricing_content.value )"></div>        
      </div>
      <div class="grid md:grid-cols-3 gap-5 mx-auto">
        <div class="bg-blue-100 p-5 prose">
          <h2 class="mb-0">Solo</h2>
          <h4>FREE</h4>
          <p>1 user. 1 database.<br/>Perfect for your personal website.</p>
          <nuxt-link to="/auth/start" class="button">Sign Up Now</nuxt-link>
        </div>
        <div class="bg-blue-100 p-5 prose">
          <h2>Early Bird</h2>
          <h4>$75 once</h4>
          <p>Lifetime access to the Pro plan.</p>
          <nuxt-link to="/auth/start" class="button">Sign Up Now</nuxt-link>
        </div>
        <div class="bg-gray-100 p-5 prose">
          <h2>Pro</h2>
          <h4>$15/mo</h4>
          <p>Unlimited users + databases.<br/>Perfect for freelancers and entrepreneurs.</p>
          <span>Available Soon</span>
        </div>
      </div>
    </div>

    <div class="prose mx-auto max-w-xl mt-20" id="roadmap">  
      <h2 v-html="content.roadmap_title.value"></h2>
      <div v-html="$md.render(content.roadmap_content.value )"></div>
    </div>  

    <div class="prose mx-auto max-w-xl mt-20 mb-20">
      <h2>Questions</h2>
      <p>Questions? Concerns? Feedback?</p> 
      <p><a href="mailto:mister@patgriffith.com">Email me</a> and I’d be happy to bend over backwards as far as I humanly can. Seriously. This is my project, you are my customer, and there’s literally no way I’d rather use my time than talking to you. Because <em>you</em> are the key to making One Click DB a success.</p>
      <p>&nbsp;</p>
      <p><span class="text-gray-500">&copy; 2021 Nobody</span></p>
    </div>  


    <div class="fixed right-0 bottom-0  mr-10 bg-gray-200 hidden lg:block" style="width: 500px;" :class="[exampleVisible ? 'top-0 mt-20' : '']">
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
          value: "Add a CMS to your website faster than you can spell WordPress.",
          type: "string"
        },
        h2: {
          value: "One Click DB is the fastest way to add dynamic data to any website. For yourself and for clients. No fancy interface. No plugins. Just data.",
          type: "string"
        },
        button_text: {
          value: "Generate DB -->",
          type: "string"
        },
        caption: {
          value: "Create a database in about 25 seconds.<br/>Then install it on your website in about 2 minutes.",
          type: "string"
        },
        why_title: {
          value: "Why choose One Click DB?",
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
          value: "Databases shouldn’t be complicated. And they shouldn’t be expensive either. One Click DB is free forever for a single user with a single database. And pretty darn affordable if you wanna upgrade.\n\nWhy so cheap? The same reason it’s so fast. Caching!",
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
#pricing {
  h2 {
    @apply mb-2;
  }
  h4 {
    @apply text-rose-600;
  }
}
#roadmap {
  ul {
    li {
      @apply pl-0;
      &:before {
        display: none
      }
    }
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