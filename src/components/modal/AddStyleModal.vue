<template>
  <div v-if="props.isModalOpen" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div @click="props.closeModalStyle" class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Modal Content -->
        <div class="bg-white p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900 underline">Style</h3>
          <div class="text-center">

            <table class="border-collapse w-full">
              <thead>
                <tr class="bg-gray-200">
                  <!-- <th class="border border-black py-2">No</th> -->
                  <th class="border border-black py-2 text-center">Select</th>
                  <th class="border border-black py-2 text-center">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in props.styleData" :key="rowIndex" class="border border-black">
                  <!-- <td class="border border-black py-2 text-center">{{ rowIndex + 1 }}</td> -->
                  <td class="border border-black py-2 text-center">
                    <input type="checkbox" v-model="row.isSelected" :checked="row.isSelected === true" />
                  </td>
                  <td class="border border-black py-2 text-center">

                    <p>{{ row.style_name }}</p>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="props.closeModalStyle" type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Close
          </button>
          <button @click="handleSave" type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

// Local data

const props = defineProps([
  'isModalOpen',
  'closeModalStyle',
  'styleData',
  'saveModalStyle'
])
const localStyleData = ref(props.styleData);

watchEffect(() => {
  localStyleData.value = props.styleData
})
const isOneSelected = computed(() => {
  const data = Array.isArray(props.styleData) && props.styleData.some(row => row.isSelected === true);
  return data
})

const handleSave = () => {
  if (!props.styleData || !isOneSelected.value) {
    $toast.error('Please select at least one row before saving.', {
      duration: 3000,
      dismissible: true,
      position: 'top-right'
    })
    return;
  }
  props.saveModalStyle();

  // Proceed with saving logic
};
</script>
