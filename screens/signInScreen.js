import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,  
  KeyboardAvoidingView, 
  ActivityIndicator,
  AsyncStorage,
  Platform,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo';
import { translate } from 'react-i18next';
import { 
  sessionFetchData } from '../actions/loginActions';
import logo from '../img/logos/transparent/LOGO-ACUDIENTES.png';
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
          style={styles.keyboardAvoidingStyle}
          behavior="padding"
        >
          <LinearGradient 
            colors={[colors.blue, colors.white]}
            start={[0,0]}
            end={[1,1]}
            style={styles.container}
          >
            <Image 
              source={logo} 
              style={styles.logo}
            />
            <Input
              type='text'
              inputStyle={{color: 'white'}}
              inputContainerStyle={styles.input}
              placeholder={t('signInScreen:user')}
              placeholderTextColor={colors.greyLight}
              leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
              onChangeText={this.onChangeUsername}
              value={this.state.localUsername}
            />
            <Input
              type='text'
              inputStyle={{color: 'white'}}
              secureTextEntry={true}
              inputContainerStyle={styles.input}
              placeholder={t('signInScreen:pass')}
              placeholderTextColor={colors.greyLight}
              leftIcon={{ type: 'font-awesome', name: 'unlock', color: 'white' }}
              onChangeText={this.onChangePassword}
              value={this.state.localPassword}
            />
            <CheckBox
              center
              containerStyle={styles.checkbox}
              title={t('signInScreen:rememberUsername')}
              textStyle={{color: colors.white}}
              checked={this.state.rememberUsernameChecked}
              uncheckedColor={colors.white}
              checkedColor={colors.white}
              onPress={this.toggleUsername}
            />
            <TouchableOpacity
              onPress={() => getSession(this.state.localUsername, this.state.localPassword)}  
              style={styles.button}
            >
              <Text style={{color: colors.white, fontSize: 18}}>{t('signInScreen:actions.signIn')}</Text>
            </TouchableOpacity>
            <Text style={{marginTop: 30}}>{errorItem}</Text>
          </LinearGradient>
        </KeyboardAvoidingView>       
      );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingStyle: {
    flex: 1
  },
  container: {
    flex: 1,
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
    borderRadius: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'transparent',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 5
  },
  checkbox: {
   marginBottom: 30,
   backgroundColor: 'transparent',
   borderWidth: 0
  },
  input: {
   marginBottom: 10,
   borderBottomWidth: 0
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


