import React from 'react';
import { 
  createSwitchNavigator, 
  createStackNavigator, 
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

import HomeScreen from './screens/home';

import AlertScreen from './screens/alerts';

import InboxScreen from './screens/inbox';
import MessageScreen from './screens/messageScreen';
import SentScreen from './screens/sent';
// import DeletedScreen from './screens/deleted';
import NewMessageScreen from './screens/newMessage';

import CouponsScreen from './screens/coupons';
import CouponViewerScreen from './screens/couponViewer';

import CalendarScreen from './screens/calendar';
import CalendarDetailScreen from './screens/calendarDetail';

import CashflowScreen from './screens/cashflow';

import GradesScreen from './screens/grades';
import GradesDetailScreen from './screens/gradesDetail';

import DocumentsScreen from './screens/documents';

import settingsScreen from './screens/settings';

import AuthLoadingScreen from './screens/authLoadingScreen';
import SignInScreen from './screens/signInScreen';

import colors from './utils/colors';

const InboxStack = createStackNavigator(
  {
    Inbox: InboxScreen,
    Message: MessageScreen,
    
  },
  {
    initialRouteName: 'Inbox',
    navigationOptions: {
      
    }
  }
)

const mainInboxStack = createStackNavigator(
  {
    Inbox: InboxStack,
    NewMessage: {
      screen: NewMessageScreen,
      navigationOptions: {
        gesturesEnabled: false,
        headerStyle:{
          marginTop: Expo.Constants.statusBarHeight 
        }
      } 
    }
  }, 
  {
    initialRouteName: 'Inbox',
    mode: 'modal',
    headerMode: 'none',
  }
)

const SentStack = createStackNavigator(
  {
    Sent: SentScreen,
    Message: MessageScreen,
    
  },
  {
    initialRouteName: 'Inbox',
    navigationOptions: {
      
    }
  }
)

const mainSentStack = createStackNavigator(
  {
    Sent: SentStack,
    NewMessage: {
      screen: NewMessageScreen,
      navigationOptions: {
        gesturesEnabled: false,
        headerStyle: {
          marginTop: Expo.Constants.statusBarHeight
        }
      }
    }
  },
  {
    initialRouteName: 'Sent',
    mode: 'modal',
    headerMode: 'none'
  }
)

const MessagesDrawer = createDrawerNavigator(
  {
    Inbox: {
      screen: mainInboxStack,
      navigationOptions: ({screenProps}) => ({
        drawerLabel: screenProps.t('inbox:title'),
        drawerIcon:(
          <FontAwesome name={'inbox'} size={25} color={colors.blue}/>
        )
      })
    },
    Sent: {
      screen: mainSentStack,
      navigationOptions: ({screenProps}) => ({
        drawerLabel: screenProps.t('sent:title'),
        drawerIcon:(
          <Ionicons name={'md-send'} size={25} color={colors.blue}/>
        )
      })
    }
    // Deleted: DeletedScreen,
    // NewMessage: NewMessageScreen
  },
  {
    initialRouteName: 'Inbox',
    contentOptions: {
        activeTintColor: colors.blue,
        activeBackgroundColor: colors.greyLight,
        inactiveTintColor: colors.grey,
        inactiveBackgroundColor: colors.white
    }
  });

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Alerts: AlertScreen,
    Coupons: CouponsScreen,
    CouponViewer: CouponViewerScreen,
    Calendar: CalendarScreen,
    CalendarDetail: CalendarDetailScreen,
    Cashflow: CashflowScreen,
    Grades: GradesScreen,
    GradesDetail: GradesDetailScreen,
    Documents: DocumentsScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: colors.blue,
      headerBackTitle: null,
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
    Messages: {
      screen: MessagesDrawer,
      navigationOptions: ({navigation, screenProps}) => ({
        tabBarIcon: (
          <Ionicons name={'ios-mail'} size={30} color={colors.blue} />
        ),
        tabBarLabel: screenProps.t('navigation:messagesTab')
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