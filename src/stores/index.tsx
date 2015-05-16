import authStore from './auth/auth.store';
import userStore from './user/user.store';

export const USER_STORE = 'userStore';
export const AUTH_STORE = 'authStore';

export const APP_STORES = {
    [USER_STORE]: userStore,
    [AUTH_STORE]: authStore
};