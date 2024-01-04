<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="px-52 py-12">
    <p class="text-xl font-semibold underline">Detail Sales Order</p>
    <div class="flex flex-col gap-3 mt-3">
      <input v-model="entries.soNumber" @input="_handleSoNumberInput"
        :class="{ 'focus:border-blue-300 focus:border-2': !isSoNumberInvalid }" disabled
        class="w-1/2 p-3 border-2 border-black placeholder:p-2 rounded-lg" type="text" placeholder="SO NUMBER">
      <input v-model="entries.namaCustomer" class="w-1/2 p-3 border-2 border-black placeholder:p-2 rounded-lg" disabled
        type="text" placeholder="Nama Customer">
      <input v-model="entries.date" class="w-1/2 p-3 border-2 border-black placeholder:p-2 rounded-lg" type="date"
        disabled placeholder="Tanggal Pesanan">
    </div>
    <!-- <button @click="openModalStyle" class="p-2 bg-blue-200 mt-2 rounded-md hover:bg-blue-400">Add Styles</button> -->
    <!-- <StyleCard :entries="entries" :styleData="styleData" /> -->
    <div v-for="(entry, index) in entries" :key="index">
      <div class="border border-black px-2 py-3 mt-3">
        <p>{{ entry.name_style }}</p>
        <p>QTY: {{ computedData[index].qty }}</p>
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
              <td class="border border-black py-2 text-center">{{ row.name }}</td>
              <td class="border border-black py-2 text-center">
                <button @click="openModalColorName(row.id, index, rowIndex)"
                  class=" text-sm p-2 bg-blue-200 hover:bg-blue-300 rounded-md">{{ row.colorName.length ?
                    '+ ' + row.colorName.length + ' Selected'
                    : "Add Color Name" }}
                </button>
                <div v-if="isModalColorName" class="fixed inset-0 z-10 overflow-y-auto">
                  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div @click="closeModalColorName(indexMethod, indexColor)" class="fixed inset-0 transition-opacity"
                      aria-hidden="true">
                      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div
                      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <!-- Modal Content -->
                      <div class="bg-white p-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900 underline">Color Method</h3>
                        <div class="text-center">

                          <table class="border-collapse w-full">
                            <thead>
                              <tr class="bg-gray-200">
                                <!-- <th class="border border-black py-2">No</th> -->
                                <th class="border border-black py-2 text-center">Select</th>
                                <th class="border border-black py-2 text-center">Name</th>
                                <th class="border border-black py-2 text-center">Qty</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(rowColor, rowIndexColor) in colorNameData" :key="rowIndexColor"
                                class="border border-black">
                                <!-- <td class="border border-black py-2 text-center">{{ rowIndex + 1 }}</td> -->
                                <td class="border border-black py-2 text-center">
                                  <input type="checkbox" :onChange="(e) => {
                                    updateValsColor(e.target.value, indexMethod, indexColor, rowIndexColor)
                                    test(rowIndexColor)
                                  }" :value="rowColor.id" disabled
                                    :checked="isCheckedColor(rowColor.id, indexMethod, indexColor)" />
                                </td>
                                <td class="border border-black py-2 text-center">

                                  <p>{{ rowColor.name }}</p>

                                </td>
                                <td class="border border-black py-2 text-center"
                                  v-if="entries[indexMethod].row[indexColor].colorName[rowIndexColor]">
                                  <input type="number" class="border border-black p-2" disabled
                                    v-model="entries[indexMethod].row[indexColor].colorName[rowIndexColor].qty" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="closeModalColorName(indexMethod, indexColor)" type="button"
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Close
                        </button>
                        <!-- <button @click="saveModalColorName(indexMethod, indexColor)" type="button"
                          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Save
                        </button> -->
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="border border-black py-2 text-center">{{ row.colorName ? row.colorName.reduce((sum, items) => sum
                + items.qty, 0) : 0
              }}</td>
            </tr>
          </tbody>
        </table>
        <!-- <button @click="openModalMethod(index)" class="p-2 bg-blue-200 mt-2 rounded-md hover:bg-blue-400">Add
          Method
        </button> -->
        <div v-if="isModalMethodOpen" class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div @click="closeModalMethod(indexMethod)" class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <!-- Modal Content -->
              <div class="bg-white p-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900 underline">Color Method</h3>
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
                      <tr v-for="(row, rowIndex) in methodData" :key="rowIndex" class="border border-black">
                        <!-- <td class="border border-black py-2 text-center">{{ rowIndex + 1 }}</td> -->
                        <td class="border border-black py-2 text-center">
                          <input type="checkbox" :onChange="(e) => updateVals(e.target.value, indexMethod)"
                            :value="row.id" :checked="isChecked(row.id, indexMethod)" />
                        </td>
                        <td class="border border-black py-2 text-center">

                          <p>{{ row.name }}</p>

                        </td>
                        <!-- <p class="text-gray-900">{{ entries[indexMethod].row[rowIndex] }}</p> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button @click="closeModalMethod(indexMethod)" type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
                <button @click="saveModalMethod(indexMethod)" type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- MODAL METHOD  -->

    </div>
    <div class="flex justify-end">
      <!-- <button @click="sendData()" :disabled="isSubmitDisabled" :class="{ 'pointer-events-none': isSubmitDisabled }"
        class="p-2 bg-blue-200 mt-2 rounded-md hover:bg-blue-400">Save</button> -->
    </div>

    <!-- Modal -->
    <AddStyleModal :isModalOpen="isModalOpen" :closeModalStyle="closeModalStyle" :styleData="styleData" />


  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import AddStyleModal from '@/components/modal/AddStyleModal.vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const route = useRoute();


const isModalOpen = ref(false);
const isModalMethodOpen = ref(false)
const isModalColorName = ref(false)
const entries = ref([]);
const styleData = ref();
const methodData = ref()
const colorNameData = ref();
const indexMethod = ref(0);
const indexColor = ref()
const indexColorRef = ref()
const isSoNumberInvalid = computed(() => {
  return dataToPost.value.soNumber?.length <= 5;
});
const dataToPost = ref({
  soNumber: '',
  namaCustomer: '',
  date: '',
  data: []
})

const _handleSoNumberInput = () => {
  if (!isSoNumberInvalid.value) {
    $toast.error('Length Cannot more than 5', {
      duration: 3000,
      dismissible: true,
      position: 'top-right'
    });
  }
  console.log('SO Number changed:', entries.value.soNumber);

};

const test = (idx) => {
  indexColorRef.value = idx
}
const computedData = computed(() => {
  const clonedData = JSON.parse(JSON.stringify(entries.value));
  for (const style of clonedData) {
    for (const row of style.row) {
      let rowTotalQty = 0;
      for (const colorName of row.colorName) {
        rowTotalQty += colorName.qty;
      }

      row.qty = rowTotalQty;
    }

    style.qty = style.row.reduce((total, row) => total + row.qty, 0);
  }

  return clonedData;
});

const openModalColorName = async (id, index, colorIndex) => {
  await fetchColorName(id)
  isModalColorName.value = true
  indexMethod.value = index
  indexColor.value = colorIndex
}

const closeModalColorName = async () => {
  isModalColorName.value = false;
};

// const saveModalColorName = (index, rowIndex) => {
//   const rowArray = entries.value[index].row[rowIndex].colorName;
//   const hasSelectedData = rowArray.some(item => item.isSelected);
//   if (!hasSelectedData) {
//     console.error("Please select at least one data before saving.");
//     $toast.error('Please select at least one row before saving.', {
//       duration: 3000,
//       dismissible: true,
//       position: 'top-right'
//     })
//     return;
//   }

//   const isValidQty = entries.value[index].row[rowIndex].colorName[indexColorRef.value]?.qty > 0;

//   if (!isValidQty) {
//     $toast.error('Invalid quantity. Please enter a positive quantity before saving.', {
//       duration: 3000,
//       dismissible: true,
//       position: 'top-right'
//     });
//     return;
//   }

//   isModalColorName.value = false;
//   console.log(entries.value)
// };


const updateValsColor = (val, index, rowIndex) => {
  const rowArray = entries.value[index].row[rowIndex].colorName;
  const valueIndex = rowArray.findIndex(item => item.id === parseInt(val));
  let findData = colorNameData.value.find(item => item.id === parseInt(val));
  findData.isSelected = true;
  findData.qty = 0

  if (valueIndex === -1) {
    rowArray.push({ ...findData });
  } else {
    const removedItem = rowArray.splice(valueIndex, 1)[0];
    removedItem.isSelected = false;
  }
  console.log(entries.value)
}

const isCheckedColor = (val, index, rowIndex) => {
  const rowArray = entries.value[index].row[rowIndex].colorName;
  return rowArray.some(item => item.id === parseInt(val) && item.isSelected);
}


const fetchDetailData = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/sales_orders/detail/${route.params.id}`)
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData.data, '<<<');
      console.log(responseData.data[0])
      entries.value = responseData.data[0].data
      entries.value.soNumber = responseData.data[0].soNumber;
      entries.value.namaCustomer = responseData.data[0].namaCustomer;
      entries.value.date = responseData.data[0].date;

      console.log(entries.value)
    } else {
      console.error('Failed to fetch style data:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during the style data fetch:', error);

  }
}


const fetchColorName = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/color_name_method/color_method/${id}`)
    if (response.ok) {
      const responseData = await response.json();
      colorNameData.value = responseData.data;
      console.log(colorNameData.value, 'asd');
    } else {
      console.error('Failed to fetch style data:', response.statusText);
    }
  } catch (error) {
    console.error('An error occurred during the style data fetch:', error);

  }
}



const isChecked = (data, index) => {
  const rowArray = entries.value[index].row;
  return rowArray.some(item => item.id === parseInt(data));
}

const updateVals = async (data, index) => {
  const rowArray = entries.value[index].row;

  const valueIndex = rowArray.findIndex(item => item.id === parseInt(data));
  let findData = methodData.value.find(item => item.id === parseInt(data));
  findData.isSelected = true;
  findData.colorName = [];

  if (valueIndex === -1) {
    rowArray.push({ ...findData });
  } else {
    const removedItem = rowArray.splice(valueIndex, 1)[0];
    removedItem.isSelected = false;
  }

};

const saveModalMethod = (index) => {
  const rowArray = entries.value[index].row;
  const hasSelectedData = rowArray.some(item => item.isSelected);
  if (!hasSelectedData) {
    console.error("Please select at least one data before saving.");
    $toast.error('Please select at least one row before saving.', {
      duration: 3000,
      dismissible: true,
      position: 'top-right'
    })
    return;
  }


  isModalMethodOpen.value = false;
};




const closeModalStyle = () => {
  isModalOpen.value = false;
};


onMounted(() => {
  // fetchStyleData()
  fetchDetailData()
})
</script>

