<template>
  <div class="d-flex jc-between ai-center">
    <h2>All vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>
<div class="text-center" v-if="gettingVendors">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vendor in vendors" :key="vendor.name">
        <td>
          {{ vendor.name }}
        </td>
        <td>{{ vendor.description }}</td>
        <td>
          <img src="/img/edit.png" alt="" class="action-icon" />
          <img src="/img/trash.png" alt="" class="action-icon action-icon--delete ml-3" />
        </td>
      </tr>
    </tbody>
  </table>

  <TheModal v-model="addModal" heading="Add new vendor">
    <form @submit.prevent="addNew">
      <label for="" class="block">Vendor Name</label>
      <input type="text" placeholder="Enter vendor name" class="mt-1 w-100" required v-model="newVendor.name">

      <label for="" class="block mt-3">Sort Description</label>
      <input type="text" placeholder="Enter sort description" class="mt-1 w-100" required v-model="newVendor.description">
      <the-button class="mt-3" :loading="loading">Add</the-button>
    </form>
  </TheModal>
</template>
  
<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import axios from "axios";
export default {
  name: 'Vendors',
  data() {
    return {
      addModal: false,
      newVendor: {
        name: '',
        description: ''
      },
      adding: false,
      vendors:[],
      gettingVendors:false,
    }
  },
  components: {
    TheButton,
    TheModal
  },
  mounted(){
    console.log(localStorage.getItem("accessToken"));
    this.getAllVendors();
  }, 
  methods: {
    getAllVendors(){
      this.gettingVendors=true;
      axios.get("https://api.rimoned.com/api/pharmacy-management/v1/private/vendor",
        {
          headers:{
            authorization:localStorage.getItem("accessToken")
          }
        }).then((res) => {
          this.vendors=res.data;
        }).catch(err => {
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message
          });
        }).finally(() => {
          this.gettingVendors = false;
        })
    },
    resetForm(){
      this.newVendor= {
        name: '',
        description: ''
      }
    },
    addNew() {
      this.adding = true;
      axios.post("https://api.rimoned.com/api/pharmacy-management/v1/private/vendor",
        this.newVendor,{
          headers:{
            authorization:localStorage.getItem("accessToken")
          }
        }).then((res) => {
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message
          });
          this.addModal=false;
          this.resetForm();
        }).catch(err => {
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message
          });
        }).finally(() => {
          this.adding = false;
        })
    }
  }
};
</script>