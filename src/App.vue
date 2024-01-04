<script setup>
</script>

<template>
  <div class="h-auto w-full">
    <div class="flex justify-center gap-2 bg-gray-50 h-20 items-center">
      <RouterLink to="/" :class="{ 'p-2 bg-sky-400 text-black rounded-lg': $route.path === '/' }">Home</RouterLink>
      <RouterLink to="/add" :class="{ 'p-2 bg-sky-400 text-black rounded-lg': $route.path === '/add' }">Add Sales Order
      </RouterLink>
      <RouterLink to="/detail" :class="{ 'p-2 bg-sky-400 text-black rounded-lg': $route.path === '/detail' }">Sales Order
      </RouterLink>
    </div>

    <RouterView></RouterView>

  </div>
</template>

<style scoped></style>
