import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,  
  KeyboardAvoidingView, 
  ActivityIndicator,
  AsyncStorage,
  Platform
} from 'react-native';
import { translate } from 'react-i18next';
import { 
  sessionFetchData } from '../actions/loginActions';
import logo from '../img/logos/PEW-Logo-180x180.png';
import {Button, Input, CheckBox } from 'react-native-elements';
import colors from '../utils/colors';
import { connect } from 'react-redux';

class SignInScreen extends React.Component {
  state = {
    localUsername: '',
    localPassword: '',
    rememberUsernameChecked: true
  }

  onChangePassword = (password) => {
    this.setState({localPassword: password});
  }

  onChangeUsername = (username) => {
    if(this.state.rememberUsernameChecked){
      AsyncStorage.setItem('username', username);
    }
    this.setState({localUsername: username});
  }

  componentDidMount = () => {
    AsyncStorage.getItem('rememberUsername')
      .then((value) => {
        if(value.toString() == 'true'){
          AsyncStorage.getItem('username').then((value) => {
            if(value.toString() != ''){
              this.setState({
                localUsername: value,
                rememberUsernameChecked: true
              });
            }else{
              this.setState({
                localUsername: '',
                rememberUsernameChecked: true
              });
            }
          }).catch((error) => {
            AsyncStorage.setItem('username', '');
          });
        } else {
          AsyncStorage.setItem('username', '');
          this.setState({rememberUsernameChecked: false});
        }
      });
  }

  toggleUsername = () => {
    console.log('was: ' + this.state.rememberUsernameChecked);
    AsyncStorage.setItem('rememberUsername', (!this.state.rememberUsernameChecked).toString());
    this.setState({rememberUsernameChecked: !this.state.rememberUsernameChecked});
  }

  componentDidUpdate = () => {
    console.log('now: ' + this.state.rememberUsernameChecked);
    if(this.state.rememberUsernameChecked){
      console.log('setting username in storage to: ' + this.state.localUsername);
      AsyncStorage.setItem('username', this.state.localUsername);
    } 
  }

  componentWillReceiveProps(nextProps){
    if (this.props.token != nextProps.token){
      if(nextProps.token != null){
        this.props.navigation.navigate('Home');
      }
    }      
  }

  render() {
      const {getSession, hasError} = this.props;
      const {t, i18n, navigation} = this.props;

      const errorMsg  = navigation.getParam('errorMsg', '');
      var errorItem;

      if (hasError || errorMsg != '') {
        if(hasError){
          errorItem = t('signInScreen:loginError');
        } else {
          errorItem = errorMsg;
        }
      }

      if (this.props.isFetching) {
          return <View style={styles.fetchingContainer}><Text>{t('signInScreen:loggingIn')}</Text><ActivityIndicator size='large'/></View>
      }

      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <Image 
            source={logo} 
            style={styles.logo}
          />
          <Input
            type='text'
            inputContainerStyle={styles.input}
            placeholder={t('signInScreen:user')}
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={this.onChangeUsername}
            value={this.state.localUsername}
          />
          <Input
            type='text'
            secureTextEntry={true}
            inputContainerStyle={styles.input}
            placeholder={t('signInScreen:pass')}
            leftIcon={{ type: 'font-awesome', name: 'unlock' }}
            onChangeText={this.onChangePassword}
            value={this.state.localPassword}
          />
          <CheckBox
            center
            containerStyle={styles.checkbox}
            title={t('signInScreen:rememberUsername')}
            checked={this.state.rememberUsernameChecked}
            uncheckedColor={colors.blue}
            checkedColor={colors.blue}
            onPress={this.toggleUsername}
          />
          <Button
            onPress={() => getSession(this.state.localUsername, this.state.localPassword)}  
            title={t('signInScreen:actions.signIn')}
            buttonStyle={{
              backgroundColor: colors.blue,
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
          />
          <Text style={{marginTop: 30}}>{errorItem}</Text>
        </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  fetchingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    borderRadius: 5,
    marginBottom: 20,
  },
  checkbox: {
   marginBottom: 10,
  },
  input: {
   marginBottom: 10,
  }
});

const mapStateToProps = (state) => {
  console.log(state.loginReducer);
  return {
    isFetching: state.loginReducer.isFetching,
    hasError: state.loginReducer.hasError,
    token: state.loginReducer.Token
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSession: (username, password ) => {
      dispatch(sessionFetchData(username, password)); 
    }
  }
}

export default translate(['signInScreen', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen));


