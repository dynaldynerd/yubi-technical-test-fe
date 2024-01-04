<template>
  <div v-for="(entry, index) in entries" :key="index">
    <div class="border border-black px-2 py-3 mt-3">
      <p>{{ entry.name_style }}</p>
      <p>QTY: {{ entry.qty }}</p>
      <table class="border-collapse w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-black py-2">No</th>
            <th class="border border-black py-2 text-center">Method Name</th>
            <th class="border border-black py-2 text-center">Color Name</th>
            <th class="border border-black py-2 text-center">Qty</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in entry.row" :key="rowIndex" class="border border-black">
            <td class="border border-black py-2 text-center">{{ rowIndex + 1 }}</td>
            <td class="border border-black py-2 text-center">{{ row.methodName }}</td>
            <td class="border border-black py-2 text-center">
              <button class=" text-sm p-2 bg-blue-200 hover:bg-blue-300 rounded-md">{{ row.colorName.length ?
                row.colorName.length + 'Selected'
                : "Add Color Name" }} </button>
            </td>
            <td class="border border-black py-2 text-center">{{ row.qty }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="openModalMethod(index)" class="p-2 bg-blue-200 mt-2 rounded-md hover:bg-blue-400">Add
        Method
      </button>
    </div>
    <AddMethodModal :indexData="index" :isModalOpen="isModalMethodOpen" :closeModalMethod="closeModalMethod"
      :saveModalMethod="saveModalMethod" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddMethodModal from '../modal/AddMethodModal.vue';
const isModalMethodOpen = ref(false)
const indexMethod = ref()

const { entries, styleData } = defineProps(['entries', 'styleData'])

const openModalMethod = async (index) => {
  indexMethod.value = index;
  isModalMethodOpen.value = true;
};

console.log(entries)
const closeModalMethod = async () => {
  isModalMethodOpen.value = false;
};

const saveModalMethod = () => {
  console.log(entries.value)
  // const selectedMethods = styleData.value[indexMethod.value].row.filter((method) => method.isSelected);

  // const entryRow = entries.value[indexMethod.value].row;


  // entryRow.forEach((existingMethod, index) => {
  //   const isMethodSelected = selectedMethods.some(
  //     (selectedMethod) =>
  //       selectedMethod.name === existingMethod.methodName &&
  //       selectedMethod.colorName === existingMethod.colorName
  //   );

  //   if (!isMethodSelected) {
  //     entryRow.splice(index, 1);
  //   }
  // });

  // selectedMethods.forEach((selectedMethod) => {
  //   const { name, colorName, qty } = selectedMethod;

  //   const existingEntry = entryRow.find(
  //     (row) => row.methodName === name && row.colorName === colorName
  //   );

  //   if (!existingEntry) {
  //     entryRow.push({
  //       methodName: name,
  //       colorName: [],
  //       qty: qty,
  //     });
  //   }
  // });



  isModalMethodOpen.value = false;
};


</script>
