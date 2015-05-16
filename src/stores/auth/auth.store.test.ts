import MockAdapter = require('axios-mock-adapter');
import { AsyncStorageMock } from '../../../__mocks__/AsyncStorage';
import userStore from '../user/user.store';
import { default as authStore, AuthStore } from './auth.store';
import request from '../../utils/request';
import { Facebook } from 'expo';
jest.mock('expo', () => ({
        Facebook: {
            logInWithReadPermissionsAsync: jest.fn()
        }
    }
));

describe('AuthenticationStore', () => {
   let store: AuthStore;
   const localStorage = new AsyncStorageMock();
   jest.setMock('AsyncStorage', localStorage);

   beforeEach(() => {
      store = new AuthStore();
   });

   describe('Facebook authentication', () => {
      beforeEach(() => {
          Facebook.logInWithReadPermissionsAsync.mockClear();
      });

       it('should fail authenticate with facebook sdk', async () => {
           Facebook.logInWithReadPermissionsAsync.mockReturnValue({ type: 'fail' });
           await store.facebookLogin();

           expect(Facebook.logInWithReadPermissionsAsync).toHaveBeenCalledTimes(1);
       });

       it('should authenticate with facebook sdk', async () => {
           Facebook.logInWithReadPermissionsAsync.mockReturnValue({ type: 'success', token: '123' });
           store.signIn = jest.fn();

           await store.facebookLogin();
           expect(store.signIn).toHaveBeenCalledWith('123');
           expect(Facebook.logInWithReadPermissionsAsync).toHaveBeenCalledTimes(1);
       });
   });


   it('should get token from local storage if available', async () => {
      const token = await store.getToken();
      expect(token).toBeUndefined();

      localStorage.setItem('id_token', '123');
      const validToken = await store.getToken();
      expect(validToken).toBe('123');
   });

   it('should check if token exists and mark auth as checked after', async () =>{
       expect(store.authChecked).toBe(false);
       await store.checkAuth();
       expect(store.authChecked).toBe(true);
   });

   it('should remove the user and token from storage after logout', async () => {
       await localStorage.setItem('id_token', 123);
       await store.logOut();
       expect(await localStorage.getItem('id_token')).toBeUndefined();
   });

   it('should check if user is logged by the existence of the token', async () => {
      expect(store.isLoggedIn).toBe(false);
      store.token = '123';
      expect(store.isLoggedIn).toBe(true);
   });

   it('should sign in using access token and save user data and token', async () => {
      const mock = new MockAdapter(request);
      mock.onGet(`/auth/facebook?access_token=123123`).reply(200, {
         token: '123',
         user: {
            name: 'john'
         }
      });

      await authStore.signIn('123123');
      expect(authStore.isLoggedIn).toBe(true);
      expect(userStore.user).toEqual({
          name: 'john'
      });
   });
});