import { StackNavigator } from 'react-navigation';
import { Home } from '../containers/home/Home';
import { Login } from '../containers/login/Login';

const MainNavigationStack = StackNavigator({
    Home: {
        screen: Home
    }
}, {
    initialRouteName: 'Home'
});

export const createRootNavigator = (loggedIn: boolean) => {
    return StackNavigator({
        Login: { screen: Login },
        Main: { screen: MainNavigationStack }
    }, {
        initialRouteName: loggedIn ? 'Main' : 'Login',
        headerMode: 'none'
    });
};