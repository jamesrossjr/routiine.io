<template>
  <main class="bg-white text-slate-900 dark:bg-brandDark dark:text-white" role="main">


    <!-- Hero Section -->
    <HeroSection1 />

    <!-- Supporting Headline Section -->
     <Headline />

     <!-- SalesPainPoints-->
      <SalesPainPoints />

      <!-- Philosophy Teaser -->
       <Philosophy />

      <!--Process Map-->
        <ProcessMap />

      <!--Mental Shifts-->
      <MentalShifts />

      <!--MicroPrompts-->
      <MicroPrompt />


      <!--Persona Call Outs-->
      <PersonalCallOuts />

      <!-- Book Callout -->
      <BookCallout />

    <!-- Call to Action Section -->
     <CallToAction />



  </main>
</template>

<script setup>
  import Headline from '~/components/sections/Headline.vue';
  import HeroSection1 from '~/components/sections/HeroSection1.vue'
  import SalesPainPoints from '~/components/sections/SalesPainPoints.vue'
  import Philosophy from '~/components/sections/Philosophy.vue'
  import MentalShifts from '~/components/sections/MentalShifts.vue'
  import MicroPrompt from '~/components/sections/MicroPrompt.vue'
  import PersonalCallOuts from '~/components/sections/PersonalCallOuts.vue';
  import BookCallout from '~/components/sections/BookCallout.vue';
  import CallToAction from '~/components/sections/CallToAction.vue';
  import ProcessMap from '~/components/sections/ProcessMap.vue';
</script>


<style scoped>
/* Global section animations or overrides can go here */
</style>
