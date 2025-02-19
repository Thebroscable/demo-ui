<template>
  <UITable>
    <UITableCaption>
      <slot name="caption" />
    </UITableCaption>
    <UITableHeader>
      <slot name="header">
        <UITableRow>
          <slot name="headerRow" />
        </UITableRow>
      </slot>
    </UITableHeader>
    <UITableBody>
      <slot name="body" />
    </UITableBody>
  </UITable>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
