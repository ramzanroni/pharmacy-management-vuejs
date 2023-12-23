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
          <img @click="editFormData=vendor; editModel=true;" src="/img/edit.png" alt="" class="action-icon" />
          <img @click="selectedVendor=vendor; deleteModel=true; " src="/img/trash.png" alt="" class="action-icon action-icon--delete ml-3" />
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
      <the-button class="mt-3" :loading="adding">Add</the-button>
    </form>
  </TheModal>

  <TheModal v-model="editModel" heading="Update vendor">
    <form @submit.prevent="editVendor">
      <label for="" class="block">Vendor Name</label>
      <input type="text" placeholder="Enter vendor name" class="mt-1 w-100" required v-model="editFormData.name">

      <label for="" class="block mt-3">Sort Description</label>
      <input type="text" placeholder="Enter sort description" class="mt-1 w-100" required v-model="editFormData.description">
      <the-button class="mt-3" :loading="editing">Update</the-button>
    </form>
  </TheModal>

  <TheModal v-model="deleteModel" heading="Are you sure?">
    <p>
      Do you really want to delete <strong>{{selectedVendor.name}}</strong> ?
    </p>
    <the-button class="mt-4" @click="deleteVendor" :loading="deleting">Yes</the-button>
    <the-button class="mt-4 ml-4" color="gray" @click="deleteModel=false">No</the-button>
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
      deleteModel:false,
      editModel:false,

      newVendor: {
        name: '',
        description: ''
      },
      editFormData: {
        name: '',
        description: ''
      },
      selectedVendor:{},
      selectedVendorEdit:{},
      adding: false,
      editing:false,
      deleting:false,
      vendors:[],
      gettingVendors:false,
    }
  },
  components: {
    TheButton,
    TheModal
  },
  mounted(){
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
          this.vendors=[];
          this.getAllVendors();
        }).catch(err => {
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message
          });
        }).finally(() => {
          this.adding = false;
        })
    },
    deleteVendor(){
      this.deleting = true;
      axios.delete("https://api.rimoned.com/api/pharmacy-management/v1/private/vendor/"+this.selectedVendor._id,
          {
            headers:{
              authorization:localStorage.getItem("accessToken")
            }
          }).then((res) => {
        this.$eventBus.emit("toast", {
          type: "Success",
          message: res.data.message
        });
        this.deleteModel=false;
        this.vendors=[];
        this.getAllVendors();
      }).catch(err => {
        this.$eventBus.emit("toast", {
          type: "Error",
          message: err.response.data.message
        });
      }).finally(() => {
        this.deleting = false;
      })
    },
    editVendor(){

      this.adding = true;
      axios.put("https://api.rimoned.com/api/pharmacy-management/v1/private/vendor/"+this.editFormData._id,
          this.editFormData,{
            headers:{
              authorization:localStorage.getItem("accessToken")
            }
          }).then((res) => {
        this.$eventBus.emit("toast", {
          type: "Success",
          message: res.data.message
        });
        this.editModel=false;
        this.resetForm();
        this.vendors=[];
        this.getAllVendors();
      }).catch(err => {
        this.$eventBus.emit("toast", {
          type: "Error",
          message: err.response.data.message
        });
      }).finally(() => {
        this.editing = false;
      })
    }
  }
};
</script>