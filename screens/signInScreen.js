import React from 'react';
import PropTypes from 'prop-types';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,  
  KeyboardAvoidingView, 
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage 
} from 'react-native';
import { translate } from 'react-i18next';
import { 
  fetchLogin, 
  sessionFetchData, 
  updateUsername, 
  updatePassword } from '../actions/loginActions';
import biosLogo from '../logos/bios.png';
import {Button, Input, Overlay, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      const {getSession} = this.props;
      const {t, i18n, navigation} = this.props;
      const {navigate} = navigation;

      if (this.props.hasError) {
          return (
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
            >
              <Image 
                source={biosLogo} 
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
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.rememberUsernameChecked}
                onPress={this.toggleUsername}
              />
              <Button
                onPress={() => getSession(this.state.localUsername, this.state.localPassword)}  
                title={t('signInScreen:actions.signIn')}
              />
              <Text>{t('signInScreen:loginError')}</Text>
            </KeyboardAvoidingView>
          )
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
            source={biosLogo} 
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
        </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fetchingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    borderRadius: 3,
    marginBottom: 100
  },
  checkbox: {
    marginBottom: 60
  },
  input: {
    marginBottom: 20
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
      const url = `http://192.168.111.62:3000/api/auth?username=${username}&password=${password}`;
      dispatch(sessionFetchData(url)); 
    }
  }
}

export default translate(['signInScreen', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen));


