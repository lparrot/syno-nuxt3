<script lang="ts" setup>
const props = withDefaults(defineProps<{
  items: IAppAccordionInfoItem[]
}>(), {
  items: () => ([])
})
</script>

<template>
  <template v-for="item in props.items">
    <div class="text-xl text-gray-400">{{ item.label }}</div>
    <div class="grid">
      <template v-for="child in item.children">
        <div class="col-12 sm:col-6">
          <span>{{ child.label }}</span>
        </div>
        <div class="col-12 sm:col-6">
          <slot v-if="child.slot != null" :name="child.slot"></slot>
          <div v-else-if="child.value != null">{{ child.value }}</div>
        </div>
      </template>
    </div>
  </template>
</template>

<style lang="scss" scoped>

</style>
