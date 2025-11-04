<script setup lang="ts">
import SeparatorIcon from '../components/SeparatorIcon.vue'

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

useSeoMeta({
  titleTemplate: 'Routiine.io - Sales Reinvented',
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      class=".font-satoshi-500 tracking-normal"
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #top>
        <div class="absolute rounded-full dark:bg-(--ui-primary) blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80" />
      </template>

      <PromotionalVideo />
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      class="font-satoshi-800"
      :title="section.title"
      :description="section.description"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
    >
      <ScoreCard class="border-0" />
    </UPageSection>
    <UPageSection
      v-for="(signalDiscoverySection, index) in page.signalDiscoverySection"
      :key="index"
      class="font-satoshi-800"
      :title="signalDiscoverySection.title"
      :description="signalDiscoverySection.description"
      :orientation="signalDiscoverySection.orientation"
      reverse
      :features="signalDiscoverySection.features"
    >
      <DiscoveryTracker />
    </UPageSection>

    <UPageSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          spotlight
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <SeparatorIcon />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <div class="absolute rounded-full dark:bg-(--ui-primary) blur-[250px] size-40 sm:size-50 transform -translate-x-1/2 left-1/2 -translate-y-80" />
    </UPageCTA>
  </div>
</template>
