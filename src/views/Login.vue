<template>
    <div class="login-page">
        <div class="login-card">
            <div class="text-center">
                <img src="/img/logo.png" class="login-card__icon" alt="">
                <h2>User Login</h2>
            </div>
            <form action="#" @submit.prevent="handelSubmit">
                <label for="" class="block">Username</label>
                <input type="text" placeholder="Enter your username" v-model="formData.username" ref="username" required>
                <label class="mt-3 block" for="">Password</label>
                <input type="password" placeholder="Enter your password" v-model="formData.password" required
                    ref="password">
                <TheButton :block="true" :loading="logging" class="mt-3">Login</TheButton>
                <div class="d-flex jc-between mt-3">
                    <div>
                        <label>
                            <input type="checkbox">
                            Remember Me
                        </label>
                    </div>
                    <div>
                        <a href="#">Forgot Password ?</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import TheButton from '../components/TheButton.vue';
import {setPrivateHeader} from "../service/axiosInstance.js";
export default {
    name: "Login",
    components: {
        TheButton
    },
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            logging: false,
        }
    }
    ,
    methods: {
        handelSubmit() {
            if (!this.formData.username) {
                this.$eventBus.emit("toast", {
                    type: "Error",
                    message: "Username cannot be empty.."
                });
                this.$refs.email.focus();
                return;
            }
            if (this.formData.password.length < 5) {
                this.$eventBus.emit("toast", {
                    type: "Error",
                    message: "Password must be at last 6 digit."
                });
                this.$refs.password.focus();
                return;
            }
            this.logging = true;
            axios.post("https://api.rimoned.com/api/pharmacy-management/v1/login",
                this.formData).then((res) => {
                    this.$eventBus.emit("toast", {
                        type: "Success",
                        message: res.data.message
                    });
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setPrivateHeader();
                    this.$router.push('/dashboard');
                }).catch(err => {
                    this.$eventBus.emit("toast", {
                        type: "Error",
                        message: err.response.data.message
                    });
                }).finally(() => {
                    this.logging = false;
                })

        }
    }
}
</script>
<style>
.box {
    width: 55px;
    height: 55px;
    background-color: greenyellow;
    margin-bottom: 22px;
    transition: all 0.5s;
}

.box--right {
    margin-left: 222px;
}

.box1 {
    width: 55px;
    height: 55px;
    background-color: greenyellow;
    margin-bottom: 22px;
    /* animation: showhide 1s ease-in; */
}

.login-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(235, 235, 235);
}

.login-card {
    width: 400px;
    /* border: 1px solid gray; */
    min-height: 193px;
    box-shadow: 0px 2px 9px 4px #dfdfdf;
    background-color: #fff;
    border-radius: 5px;
    padding: 44px 33px;
}

.login-card input[type="text"],
.login-card input[type="password"] {
    width: 100%;
}

.login-card__icon {
    max-width: 77px;
}

@keyframes showhide {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    50% {
        opacity: 0.5;
        transform: scale(1.2);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.showhide-enter-active {
    animation: showhide 1s ease-in;
    /* transition: all 0.5s; */
}

.showhide-enter-from {
    /* opacity: 0;
  transform: scale(0.5); */
}

.showhide-enter-to {
    /* opacity: 1;
  transform: scale(1); */
}

.showhide-leave-active {
    animation: showhide 1s ease-in reverse;
    /* transition: all 0.5s; */
}

.showhide-leave-from {
    /* opacity: 1;
  transform: scale(1); */
}

.showhide-leave-to {
    /* opacity: 0;
  transform: scale(0.5); */
}
</style>