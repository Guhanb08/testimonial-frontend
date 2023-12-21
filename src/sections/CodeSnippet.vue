<script setup lang="ts">
</script>

<template>
  <div class="max-w-3xl mx-auto px-5 md:px-0">
    <div class="px-4 py-5 sm:px-6 bg-sky-950 rounded-md">
      <div>
        <h4 class="text-white text-xl font-normal">Try our sample embed code</h4>
        <p class="text-white text-sm mt-2 font-thin">
          Embed the wall of love to your website in 1 minute
        </p>
      </div>
      <!-- <div class="  ">
        <pre v-highlightjs>
      <code class="code-wrapper" >&lt;script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js">&lt;/script&gt;
&lt;iframe id="testimonialto-wall-of-love-for-testimonial-light" src="https://embed-v2.testimonial.to/w/wall-of-love-for-testimonial?theme=light&card=base" frameborder="0" scrolling="no" width="100%"&gt;&lt;/iframe&gt;
&lt;script type="text/javascript"&gt;iFrameResize({log: false, checkOrigin: false}, "#testimonialto-wall-of-love-for-testimonial-light");&lt;/script&gt;</code>
    </pre>
      </div> -->

      <div class="flex gap-2 mt-40">
        <button class="flex justify-center items-center rounded bg-indigo-100 text-indigo-900 p-2">
          <IconCopy color="indigo" :size="16" stroke-width="2" />
          <span class="ms-1 text-sm">Copy the code</span>
        </button>
        <button class="flex justify-center items-center rounded bg-yellow-100 text-yellow-900 p-2">
          <span class="ms-1 text-sm">Live Demo</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-wrapper {
  padding: 20px;
}
</style>
