import { action, observable } from 'mobx';
import { AsyncStorage } from 'react-native';

export class UserStore {
    static USER_DATA_KEY = 'user_data';

    @observable user;
    @action async initialize() {
        const user = await AsyncStorage.getItem(UserStore.USER_DATA_KEY);
        if (user) {
            await this.setUser(JSON.parse(user));
        }
    }

    @action async setUser(user) {
        this.user = user;
        await AsyncStorage.setItem(UserStore.USER_DATA_KEY, JSON.stringify(this.user));
    }

    @action async removeUser() {
        this.user = undefined;
        await AsyncStorage.removeItem(UserStore.USER_DATA_KEY);
    }
}

const userStore = new UserStore();
export default userStore;