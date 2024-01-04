<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="px-52 py-12">
    <p>Sales Order Information</p>
    <table class="border-collapse w-full">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-black py-2 text-center">NO</th>
          <th class="border border-black py-2 text-center">SO NUMBER</th>
          <th class="border border-black py-2 text-center">CUSTOMER</th>
          <th class="border border-black py-2 text-center">TANGGAL</th>
          <th class="border border-black py-2 text-center">TOTAL PESANAN</th>
          <th class="border border-black py-2 text-center">ACTION</th>
        </tr>

      </thead>
      <tbody>
        <tr v-for="items, index in dataStyleTable" class="border border-black hover:bg-gray-50" :key="index + 1">
          <td class="border border-black py-2 text-center">{{ index + 1 }}</td>
          <td class="border border-black py-2 text-center">{{ items.sonumber }}</td>
          <td class="border border-black py-2 text-center">{{ items.customer }}</td>
          <td class="border border-black py-2 text-center">{{ items.date }}</td>
          <td class="border border-black py-2 text-center">{{ items.qty }}</td>
          <td class="border border-black p-5 text-center ">
            <RouterLink :to="`/edit/${items.sales_order_id}`" class="p-3 bg-yellow-400 hover:bg-yellow-600 rounded-md ">
              Edit
              <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path
                  d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg> -->
            </RouterLink>
            <button @click="deleteData(items.sales_order_id)" class="p-3 bg-red-400 hover:bg-red-600 rounded-md mx-2 ">
              Delete
              <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg> -->
            </button>
            <RouterLink :to="`/detail/${items.sales_order_id}`" class="p-3 bg-blue-400 hover:bg-blue-600 rounded-md ">
              Detail
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <RouterLink to="/detail/1">1</RouterLink> -->
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast();

const dataStyleTable = ref();
const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/sales_styles/tbl')
    if (response.ok) {
      const responseData = await response.json();
      dataStyleTable.value = responseData.data
    } else {
      console.error('Failet to fetch data:', response.statusText)
    }
  } catch (error) {
    console.error('An error occurred during the style data fetch:', error);

  }
}
const deleteData = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/sales_orders/new/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    if (response.ok) {
      $toast.success('Succes POST DATA', {
        duration: 3000,
        dismissible: true,
        position: 'top-right'
      });
      window.location.reload()
      return;
    }

    $toast.error('Invalid data. Please make sure each row has at least one colorName.', {
      duration: 3000,
      dismissible: true,
      position: 'top-right'
    });

  } catch (error) {
    console.error('Error:', error);
  }
};




onMounted(() => {
  fetchData()
});
</script>
