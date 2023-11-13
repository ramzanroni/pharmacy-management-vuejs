<template>
  <router-view></router-view>
    <TransitionGroup name="list" tag="div" class="toasts">
      <Toast v-for="(toast,i) in toasts" :key="i" :toastType="toast.type" :message="toast.message"></Toast>
  </TransitionGroup>
</template>
<script>
import Toast from './components/Toast.vue';
export default {
  name: 'App',
  components: {
    Toast
  },
  data(){
    return{
      toasts:[
      ]
    }
  },
  mounted(){
    this.$eventBus.on('toast', (data)=>{
      this.toasts.push(data);
      this.removeOneToast()
    })
  },
  methods: {
    removeOneToast(){
      setTimeout(()=>{
        this.toasts.shift();
      }, 2222)
    }
  }
}

</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>