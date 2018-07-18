import React from 'react';
import { translate } from 'react-i18next';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions
  } from 'react-native';
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
import LargeImage from '../components/smart/LargeImage';

const couponList = [
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/restaurant-01.jpg',
        title: 'Restaurant 1',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/restaurant-02.jpg',
        title: 'Restaurant 2',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/restaurant-03.jpg',
        title: 'Restaurant 3',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/restaurant-04.jpg',
        title: 'Restaurant 4',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/viajes-01.jpg',
        title: 'Viajes 1',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/viajes-02.jpg',
        title: 'Viajes 2',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/viajes-03.jpg',
        title: 'Viajes 3',
        description: 'this is a picture of a coupon'
    },
    {
        sourceString: 'https://s3-us-west-2.amazonaws.com/biossoft-files/PEWTestImages/viajes-04.jpg',
        title: 'Viajes 4',
        description: 'this is a picture of a coupon'
    },
];

const { width, height } = Dimensions.get('window');

@translate(['coupons', 'common'], { wait: true })
export default class CouponViewer extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: screenProps.t('coupons:title')
    });

    state = {
        showLargeImage: false,
        imageSource: '',
        selectedIndex: null
    }

    showLargeImage = ({ pageX, pageY, locationX, locationY }, source, index) => {
        const topLeftX = pageX - locationX;
        const topLeftY = pageY - locationY;
        console.log('original topLeft Location - y: ' + topLeftY + ' x: ' + topLeftX);
        this.setState({topLeftX, topLeftY, showLargeImage: true, imageSource: source, selectedIndex: index});
    }

    hideImage = () => {
        this.setState({showLargeImage: false, selectedIndex: null})
    }

    render() {
        const { t, i18n } = this.props;

        return (
        <View style={styles.container}>
            <View style={{height: '100%'}} >
                <ScrollView contentContainerStyle={styles.scrollView}>
                {
                    couponList.map((coupon, index) => {
                        console.log(coupon.sourceString);
                        return (
                            <TouchableOpacity 
                                key={index}
                                activeOpacity={0.8}
                                onPress={(e)=>{
                                    nE = e.nativeEvent;
                                    this.showLargeImage(nE, coupon.sourceString, index);
                                }}
                                style={styles.coupon} 
                            >
                                    <Image 
                                        source={{uri: coupon.sourceString}} 
                                        style={{
                                            opacity: this.state.selectedIndex == index ? 0 : 1,
                                            width: 180, height: 241
                                        }}
                                    />
                            </TouchableOpacity>
                        );
                    })
                }
                </ScrollView>
                { 
                    this.state.showLargeImage && 
                    <LargeImage 
                        simpleHide={this.state.simpleHide} 
                        hideStyle={this.state.slideDownFade} 
                        source={this.state.imageSource} 
                        hideImage={this.hideImage.bind(this)} 
                        topLeftX={this.state.topLeftX} 
                        topLeftY={this.state.topLeftY}
                    />
                }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    scrollView: {
        paddingBottom: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    coupon: {
        width: width/2, 
        alignItems: 'center',
        paddingTop: 15,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 1.0
    }
});