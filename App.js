import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, translate } from 'react-i18next';
import configureStore from './configureStore';
import i18n from './i18n';
import NavigationStateNotifier from './NavigationStateNotifier';


//--------------------IMPORTANT NOTE FOR ANYONE TRYING TO TEST THIS APP ON THEIR COMPUTER-------------
// In order to have the PEW-API running locally, and test this app on their phone through expo, they will need
// to install "iisexpress-proxy". Google that term and look for it on npm for installation instructions.
// running this cmd will help remove a CORS issue when running the server locally.
// you can type the following command in a secondary terminal --> iisexpress-proxy 56700 to 3000 <--- (leave it running when testing the app)
// The first number is your local host, the second is what ever new port you want it to point to. 
// In the dbConnection.js file in the utils folder, make sure the connection string has the new port you specificed in the above command.


//this is just to remove a particular warning
// import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

//store setup
const store = configureStore();

import SwitchNav from './routes';
//Wrapping a navigation element with translation hoc asserts
//we trigger new render on language change.
//The hoc is set to only trigger rerender on
//languageChanged
const WrappedStack = () => {
  return (
    <SwitchNav 
    screenProps={{ t: i18n.getFixedT() }} 
    onNavigationStateChange={(prevState, currentState) =>
      NavigationStateNotifier.onNavigationStateChange(prevState, currentState)}
  />
  );
}
const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(WrappedStack);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ReloadAppOnLanguageChange />
        </I18nextProvider >
      </Provider>
    );
  }
}
