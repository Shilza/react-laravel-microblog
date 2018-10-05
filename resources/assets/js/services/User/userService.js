import Http from '../../Http'
import * as action from '../../store/actions/index'

export function login(credentials) {
    return dispatch => (
         Http.post('api/auth/login', credentials)
            .then(({data}) => {
                dispatch(action.authLogin(data.user));

                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('expires_in', data.expires_in);

                Http.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            })
    )
}

export function me() {
    return dispatch => (
        Http.post('api/auth/me', {},
            {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}})
            .then(res => {
                const data = res.data;

                dispatch(action.authMe(data.user));
                Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            })
            .catch(err => err)
    )
}

export function refresh() {
    return new Promise((resolve, reject) => {
        Http.post('api/auth/refresh', {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    Refresh: localStorage.getItem('refresh_token'),
                }
            })
            .then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('expires_in', res.data.expires_in);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

                resolve();
            })
            .catch(err => {
                reject(err.response.status);
            })
    });
}

export function resetPassword(credentials) {
    return dispatch => Http.post('api/auth/password/create', credentials)
}

export function updatePassword(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('../../api/auth/password/reset', credentials)
                .then(res => {
                    return resolve(res.data.message);
                })
                .catch(err => {
                    const data = {
                        message: err.response.data.message,
                        statusCode: err.response.status,
                    };

                    return reject(data);
                })
        })
    )
}

export function register(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/auth/register', credentials)
                .then(() => resolve())
                .catch(err => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };
                    if (statusCode === 422) {
                        Object.values(err.response.data.message).map((value) => {
                            data.error = value
                        });

                    } else if (statusCode === 400) {
                        data.error = err.response.data.message;
                    }
                    return reject(data);
                })
        })
    )
}

export function getNotifications() {
    return dispatch => (
        Http.get('api/notifications')
            .then((res) => {
                dispatch(action.setNotifications(res.data.notifications));
            })
    )
}

export function deleteNotifications() {
    return dispatch => (
        Http.post('api/notifications/delete')
            .then(() => {
                dispatch(action.deleteNotifications());
            })
    )
}

export function follow(id) {
    return dispatch => (
        Http.post('api/friendships/follow', {id})
            .then(() => dispatch(action.follow(id)))
    )
}

export function unFollow(id) {
    return dispatch => (
        Http.post('api/friendships/unfollow', {id})
            .then(() => dispatch(action.unFollow(id)))
    )
}

export function deleteProfile() {
    return dispatch => (
        Http.post('api/delete_profile/')
            .then(() => dispatch(action.authLogout()))
    )
}
