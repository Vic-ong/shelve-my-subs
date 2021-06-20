<template>
  <div class="flex justify-between items-center space-x-5 mb-10">
    <div class="heading-2">
      <slot />
    </div>

    <div>
      <slot name="side-button" />
    </div>
  </div>
</template>
