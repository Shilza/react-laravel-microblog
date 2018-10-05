import {Home} from '../pages/home/Home'
import Login from '../pages/login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import User from '../pages/user/page'
import Followers from '../pages/user/followers/page'
import Follows from '../pages/user/follows/page'
import Liked from '../pages/user/liked/page'

const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: '/:user',
        exact: true,
        auth: true,
        component: User
    },
    {
        path: '/:user/followers',
        exact: true,
        auth: true,
        component: Followers
    },
    {
        path: '/:user/follows',
        exact: true,
        auth: true,
        component: Follows
    },
    {
        path: '/:user/liked',
        exact: true,
        auth: true,
        component: Liked
    }
];

export default routes;