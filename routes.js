import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';

import HomeScreen from './screens/home';
import AlertScreen from './screens/alerts';
import MessagesScreen from './screens/messages';
import CouponsScreen from './screens/coupons';
import CalendarScreen from './screens/calendar';
import CalendarDetailScreen from './screens/calendarDetail';
import CashflowScreen from './screens/cashflow';
import GradesScreen from './screens/grades';
import GradesDetailScreen from './screens/gradesDetail';
import PrintScreen from './screens/print';
import settingsScreen from './screens/settings';
import AuthLoadingScreen from './screens/authLoadingScreen';
import SignInScreen from './screens/signInScreen';

import colors from './utils/colors';
import { translate } from 'react-i18next';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Alerts: AlertScreen,
    Messages: MessagesScreen,
    Coupons: CouponsScreen,
    Calendar: CalendarScreen,
    CalendarDetail: CalendarDetailScreen,
    Cashflow: CashflowScreen,
    Grades: GradesScreen,
    GradesDetail: GradesDetailScreen,
    Print: PrintScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        // paddingTop: 0, // clears the default Header margin for the status bar
        height: 60 // sets new height for the Header
      }
    }
  }
);

const SettingsStack = createStackNavigator(
  {
    SettingsScreen: settingsScreen
  },
  {
    initialRouteName: 'SettingsScreen',
    navigationOptions: {
      headerStyle: {
        // paddingTop: 0, // clears the default Header margin for the status bar
        height: 60 // sets new height for the Header
      }
    }
  }
);

const AppTab = createBottomTabNavigator(
  { 
    Home: {
      screen: HomeStack,
      navigationOptions: ({navigation, screenProps}) => ({
        tabBarIcon: (
          <Ionicons name={'ios-home'} size={30} color={colors.blue} />
        ),
        tabBarLabel: screenProps.t('navigation:homeTab')
      })
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: ({navigation, screenProps}) => ({
        tabBarIcon: (
          <Ionicons name={'ios-settings'} size={30} color={colors.blue} />
        ),
        tabBarLabel: screenProps.t('navigation:settingsTab') 
      })
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.blue,
      activeBackgroundColor: colors.white,
      inactiveBackgroundColor: colors.greyLight
    }
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTab,
    Auth: SignInScreen,
  },
  {
    initialRouteName: 'AuthLoading'
  }
);