import Axios from 'axios';

const axiosInstate = Axios.create({
    baseURL: "https://zaida-finance.herokuapp.com/v1/api"
});

axiosInstate.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });

export default axiosInstate;