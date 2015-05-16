import { AsyncStorageMock } from '../../../__mocks__/AsyncStorage';
import { UserStore } from './user.store';

describe('UserStore', () => {
    let userStore: UserStore;
    const localStorage = new AsyncStorageMock();
    jest.setMock('AsyncStorage', localStorage);

    beforeEach(() => {
        localStorage.__clearAll();
        userStore = new UserStore();
    });

    it('should initialize user store with saved user', async () => {
        const spy = jest.spyOn(userStore, 'setUser');
        await localStorage.setItem(UserStore.USER_DATA_KEY, JSON.stringify({ name: 'dima' }));
        await userStore.initialize();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(userStore.user).toEqual({ name: 'dima' })
    });

    it('should not initializer user when no user found in storage', async () => {
        await userStore.initialize();
        expect(userStore.user).toBeUndefined();
    });


    it('should store user to store instance and local storage', async () => {
        const demoUser = {
            name: 'john'
        };

        expect(await localStorage.getItem(UserStore.USER_DATA_KEY)).toBeUndefined();
        await userStore.setUser(demoUser);
        expect(await localStorage.getItem(UserStore.USER_DATA_KEY)).toBe(JSON.stringify(demoUser));
        expect(userStore.user).toEqual(demoUser);
    });

    it('should remove user locally', async () => {
        const demoUser = {
            name: 'john'
        };
        await userStore.setUser(demoUser);
        await userStore.removeUser();
        expect(userStore.user).toBeUndefined();
        expect(await localStorage.getItem(UserStore.USER_DATA_KEY)).toBeUndefined();
    });


});