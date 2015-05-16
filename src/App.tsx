import { observable } from 'mobx';
import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { createRootNavigator } from './routes';
import { APP_STORES } from './stores';
import { StyleProvider } from 'native-base';
import { AppLoading, Font } from 'expo';
import authStore from './stores/auth/auth.store';
import getTheme from './theme/components';

@observer
export default class App extends React.Component<any, any> {
    @observable ready = false;
    constructor(props) {
        super(props);

    }

    async componentWillMount() {
        await this.loadFonts();
        await authStore.checkAuth();

        this.ready = true;
    }

    async loadFonts() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
    }

    render() {
        if (!this.ready) return <AppLoading />;
        const Layout = createRootNavigator(authStore.isLoggedIn);

        return (
            <Provider { ...APP_STORES }>
                <StyleProvider style={getTheme()}>
                    <Layout />
                </StyleProvider>
            </Provider>
        )
    }
}

