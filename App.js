import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, translate } from 'react-i18next';
import configureStore from './configureStore';
import i18n from './i18n';

//this is just to remove a particular warning
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated in plain JavaScript React classes. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.', 'Module RCTImageLoader']);
console.disableYellowBox = true;

//store setup
const store = configureStore();

import SwitchNav from './routes';
//Wrapping a navigation element with translation hoc asserts
//we trigger new render on language change.
//The hoc is set to only trigger rerender on
//languageChanged
const WrappedStack = () => {
  return <SwitchNav screenProps={{ t: i18n.getFixedT() }} />;
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
