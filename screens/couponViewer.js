import React from 'react';
import { translate, Trans } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Ionicons, 
  FontAwesome, 
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons
} from 'react-native-vector-icons';
import colors from '../utils/colors';

const couponList = [
    {
        uri: '../img/restaurant-01.jpg',
        thumbnail: '../img/restaurant-01.jpg',
        title: 'Restaurant 1',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/restaurant-02.jpg',
        thumbnail: '../img/restaurant-02.jpg',
        title: 'Restaurant 2',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/restaurant-03.jpg',
        thumbnail: '../img/restaurant-03.jpg',
        title: 'Restaurant 3',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/restaurant-04.jpg',
        thumbnail: '../img/restaurant-04.jpg',
        title: 'Restaurant 4',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/viajes-01.jpg',
        thumbnail: '../img/viajes-01.jpg',
        title: 'Viajes 1',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/viajes-02.jpg',
        thumbnail: '../img/viajes-02.jpg',
        title: 'Viajes 2',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/viajes-03.jpg',
        thumbnail: '../img/viajes-03.jpg',
        title: 'Viajes 3',
        description: 'this is a picture of a coupon'
    },
    {
        uri: '../img/viajes-04.jpg',
        thumbnail: '../img/viajes-04.jpg',
        title: 'Viajes 4',
        description: 'this is a picture of a coupon'
    },
];


@translate(['coupons', 'common'], { wait: true })
export default class CouponViewer extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('coupons:title')
  });

  render() {
    const { t, i18n } = this.props;
    return <View></View>
  }
}

// const styles = StyleSheet.create({

// });