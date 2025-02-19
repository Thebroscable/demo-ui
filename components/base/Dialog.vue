<template>
  <UIDialog v-model:open="open">
    <UIDialogContent :class="cn('sm:max-w-[425px]', contentClass)">
      <slot />
    </UIDialogContent>
  </UIDialog>
</template>

<script lang="ts" setup>
export type BaseDialogProps = {
  loading?: boolean
  contentClass?: string
  headerClass?: string
}

defineProps<BaseDialogProps>()

const open = defineModel<boolean>('open')
</script>

<style lang="scss" scoped></style>
