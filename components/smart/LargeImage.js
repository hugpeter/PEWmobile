import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity
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
import colors from '../../utils/colors';

const { height, width } = Dimensions.get('window');

export default class LargeImage extends Component{

    state={
        animateImageX: new Animated.Value(0),
        animateImageY: new Animated.Value(0),
        scaleImageX: new Animated.Value(1),
        scaleImageY: new Animated.Value(1),
        viewOpacity: new Animated.Value(0),
        scaleViewX: new Animated.Value(1),
        scaleViewY: new Animated.Value(1),
    }

    componentDidMount(){
        const moveY = (height/2 - 361.5/2) - this.props.topLeftY;
        const moveX = (width/1.5 - 270/2) - this.props.topLeftX;
        const newY = moveY + this.props.topLeftY;
        const newX = moveX + this.props.topLeftX;
        console.log('old y: ' + this.props.topLeftY);
        console.log('old x: ' + this.props.topLeftX);
        console.log('--------------------------------');
        console.log('new y: ' + newY);
        console.log('new x: ' + newX);
        Animated.parallel([
            Animated.timing(
                this.state.viewOpacity,
                {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.animateImageY,
                {
                    toValue: (height/2.5 - 120.5) - this.props.topLeftY,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.animateImageX,
                {
                    toValue: (width/2 - 90) - this.props.topLeftX,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.scaleImageX,
                {
                    toValue: 1.8,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.scaleImageY,
                {
                    toValue: 1.8,
                    duration: 200,
                    useNativeDriver: true
                }
            )
         ]).start()
    }

    animateBack(){
        Animated.parallel([
            Animated.timing(
                this.state.viewOpacity,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.animateImageY,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.animateImageX,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.scaleImageX,
                {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.scaleImageY,
                {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true
                }
            )
        ]).start(()=>this.props.hideImage())
    }

    render(){
        return( 
            <Animated.View style={{height, width, backgroundColor:'rgba(0,0,0,0.9)', position:'absolute', opacity:this.state.viewOpacity, transform:[{scaleX:this.state.scaleViewX}, {scaleY:this.state.scaleViewY}]}} >
                <Animated.Image
                    resizeMode='cover'
                    source={{uri: this.props.source}}
                    style={{top:this.props.topLeftY, left:this.props.topLeftX, height: 241, width:180, transform:[{translateX: this.state.animateImageX}, {translateY: this.state.animateImageY}, {scaleX: this.state.scaleImageX}, {scaleY: this.state.scaleImageY}]}} 
                />
                <TouchableOpacity 
                    onPress={()=>this.animateBack()}
                    style={{left:0, top:0, position:'absolute', height:'100%', width:'100%', justifyContent:'center', alignItems:'center'}}
                >
                </TouchableOpacity>
            </Animated.View>
        )
    }
}