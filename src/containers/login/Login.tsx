import { inject, observer } from 'mobx-react/native';
import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { AUTH_STORE } from '../../stores';
import { AuthStore } from '../../stores/auth/auth.store';
import { Facebook } from 'expo';
import NavigationHelpers from '../../utils/navigation.helpers';
import { Container, Header, Content, Button, Text } from 'native-base';

@inject(AUTH_STORE)
@observer
export class Login extends React.Component<{ authStore: AuthStore, navigation: NavigationScreenProp<Login, any> }> {
    facebookLogin = async () => {
        try {
            await this.props.authStore.facebookLogin();
            NavigationHelpers.reset(this.props.navigation, 'Main');
        } catch (e) {
            Alert.alert('Error while authenticating');
        }
    };

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Text>
                        Login page
                    </Text>
                    <Button full={true} onPress={this.facebookLogin}>
                        <Text>Login With Facebook</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}