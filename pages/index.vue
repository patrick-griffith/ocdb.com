<template>
  <div>    
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
      
      <h1>One Click DB is the fastest way create dynamic website data.</h1>
      <p>How about installing a database that you and your clients will actually use! Is it the world’s simplest database? You tell me!</p>
      <nuxt-link to="/auth/start" class="button">Generate DB --></nuxt-link>
      
    </div>


    <div class="mt-20 relative max-w-4xl mx-auto">
        <img src="https://picsum.photos/1200/600" width="1200" height="600" alt="" class="rounded" />
        <div class="absolute right-0 bottom-0 mb-10 -mr-4 md:-mr-6 lg:-mr-10 screenshot-switcher">
          <ul>
            <li class="active">
              Fast for Editors
            </li>
            <li>
              Fast for Developers
            </li>
            <li>
              Fast for Users
            </li>
          </ul>
        </div>
    </div>        
    <!-- <h2 class="caption">Collaborate with coworkers, clients, and alpha testers named Susan.</h2> -->
    <div class="caption text-center">
      <div>Just a single page with some text. Easy peasy.</div>
    </div>


    <div class="prose mx-auto max-w-xl mt-20">  
      <h2 id="why">Why should you care?</h2>
    </div>
    
    <div id="pricing" class=" mt-20">
      <div class="prose mx-auto max-w-xl mb-10">
        <h2>Pricing</h2>
        <p>Databases shouldn’t be complicated. And they shouldn’t be expensive either. One Click DB is free forever for a single user and website. And pretty darn affordable for every other case.</p>
        <p>Why so cheap? The same reason it’s so fast. Caching!</p>
      </div>
      <div class="grid grid-cols-3 gap-5 mx-auto">
        <div class="bg-blue-100 p-5 prose">
          <h2 class="mb-0">Solo</h2>
          <h4>FREE</h4>
          <p>1 user and 1 database.<br/>Perfect for your personal website.</p>
          <nuxt-link to="/auth/start" class="button">Sign Up Now</nuxt-link>
        </div>
        <div class="bg-blue-100 p-5 prose">
          <h2>Early Bird</h2>
          <h4>$75 once</h4>
          <p>Lifetime access to the Pro plan.<br/>Only available until <nuxt-link to="/#roadmap">this roadmap</nuxt-link> is done.</p>
          <nuxt-link to="/auth/start" class="button">Sign Up Now</nuxt-link>
        </div>
        <div class="bg-gray-100 p-5 prose">
          <h2>Pro</h2>
          <h4>$15/mo</h4>
          <p>Unlimited users and databases.<br/>Perfect for freelancers and entrepreneurs.</p>
          <span>Available Soon</span>
        </div>
      </div>
    </div>

    <div class="prose mx-auto max-w-xl mt-20 mb-20" id="roadmap"> 
      <h2>Roadmap</h2>
      <p>One Click DB is already awesome. And it’s about to get even awesomer (while staying simple).</p>
      <p>Here's a list features coming in Spring 2021.</p>
      <p>Note that the early-bird plan will <strong>disappear forever</strong> once this list is completed. So.. what’re you waiting for 😬</p>
      <ul>
        <li>✅ <strong>Deploy hook:</strong></li>
      </ul>
      
    </div>  

    <div class="prose mx-auto max-w-xl mt-20 mb-20">
      <h2>Questions</h2>
      <p>Questions? Concerns? Feedback?</p> 
      <p><a href="mailto:mister@patgriffith.com">Email me</a> and I’d be happy to bend over backwards as far as I humanly can. Seriously. This is my project, you are my customer, and there’s literally no way I’d rather use my time than talking to you. Because <em>you</em> are the key to making One Click DB a success.</p>
      <p>&nbsp;</p>
      <p><span class="text-gray-500">&copy; 2021 Nobody</span></p>
    </div>  
  </div>
</template>
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
.screenshot-switcher {
    ul {
      li {
        @apply bg-blue-300 text-blue-800 font-bold py-3 px-4 w-64 rounded mb-2 text-left cursor-default;
        &:hover {
          @apply bg-blue-400;
          &:not(.active) {
            cursor: pointer;
          }
        }
        &.active {
          @apply bg-blue-800 text-blue-200;
        }
      }
    }
}
.caption {
    @apply text-xl leading-2 mt-6 mx-auto max-w-2xl text-blue-900 italic;
    p {
        @apply text-lg mt-2 not-italic text-blue-400;
    }
}
</style>