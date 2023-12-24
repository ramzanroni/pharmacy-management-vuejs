import axios from "axios";

const API_BASE_URL='https://api.rimoned.com/api/pharmacy-management/v1';

export const axiosPublic=axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
});

export const axiosPrivate=axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000
});

export const setPrivateHeader=()=>{
    axiosPrivate.defaults.headers.common['authorization']=localStorage.getItem('accessToken');
};