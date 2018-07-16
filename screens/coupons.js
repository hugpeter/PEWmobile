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

const symbolSize = 60;
const categories = [
  {
    name: 'coupons:categories.restaurants',
    navTo: 'Restaurants',
    symbol: (<MaterialCommunityIcons name={'food'} size={symbolSize} color={colors.green}/>),
    color: colors.green
  },
  {
    name: 'coupons:categories.travel',
    navTo: 'Travel',
    symbol: (<MaterialCommunityIcons name={'airplane'} size={symbolSize} color={colors.lightBlue}/>),
    color: colors.lightBlue
  },
  {
    name: 'coupons:categories.electronics',
    navTo: 'Electronics',
    symbol: (<MaterialIcons name={'computer'} size={symbolSize} color={colors.purple}/>),
    color: colors.purple
  },
  {
    name: 'coupons:categories.entertainment',
    navTo: 'Entertainment',
    symbol: (<MaterialIcons name={'local-movies'} size={symbolSize} color={colors.red}/>),
    color: colors.red
  }
];

@translate(['coupons', 'common'], { wait: true })
export default class Coupons extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('coupons:title')
  });

  render() {
    const { t, i18n, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{height: '100%'}} >
          <ScrollView contentContainerStyle={styles.scrollView}>
            {
              categories.map((category, index) => {
                return (
                  <TouchableOpacity 
                    key={index}
                    style={styles.categories} 
                    onPress={() => navigation.navigate('CouponViewer')}
                  >
                    {category.symbol}
                    <Text style={{color: category.color, fontSize: 20, fontWeight: 'bold'}}>{t(category.name)}</Text>
                  </TouchableOpacity>
                )
              })
            }  
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 200,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  categories: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
    width: '50%',
    height: 150,
    backgroundColor: colors.white
   }
});