import axios from 'axios'
import store from './store'
import * as actions from './store/actions'
import AuthService from './services/User/index'

const token = document.head.querySelector('meta[name="csrf-token"]');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

axios.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401)
            store.dispatch(actions.authLogout());

        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    async (config) => {
        //before every request, we check the access token for validity
        //if it is not valid we send a refresh token
        //isRefreshing variable is needed to prevent recursion
        if (localStorage.getItem('expires_in') < Math.round(Date.now() / 1000) &&
            localStorage.hasOwnProperty('refresh_token') &&
            (this.isRefreshing === undefined || !this.isRefreshing)
        ) {
            this.isRefreshing = true;
            await AuthService.refresh().catch(() => {
                //if an error was received, we interrupt the execution of requests
                throw new axios.Cancel();
            });
            this.isRefreshing = false;

            //Next request is sent with a new token
            config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        }

        return Promise.resolve(config);
    }
);

export default axios.create({
    baseURL: `http://127.0.0.1:8000/`
});
