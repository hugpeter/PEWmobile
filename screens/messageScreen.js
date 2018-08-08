import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, 
    TouchableOpacity, ActivityIndicator, 
    Dimensions, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { messageFetchData, messageIsRead } from '../actions/inboxActions';
import colors from '../utils/colors';
import { 
  Ionicons,
  FontAwesome, 
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons
} from 'react-native-vector-icons';
import NavigationStateNotifier from '../NavigationStateNotifier';
import HTML from 'react-native-render-html';

class Message extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('message:title'),
    headerStyle: {
      backgroundColor: colors.white
    },
    headerTintColor: colors.blue
  });

  constructor (props) {
    super(props);
    this.state = {
        showDetail: false
    }

    NavigationStateNotifier.newListener(
      this,
      () => {
        // anything else that you'd like to do when this screen is navigated to
        console.log('message screen was navigated to');
        const { messageID } = this.props.navigation.state.params;
        const { getMessage, idxMaestro, tipoMaestro, token } = this.props;
        getMessage(messageID, idxMaestro, tipoMaestro, token);
        
      },
      () => {
        // anything else that you'd like to do when this screen is navigated off of
        console.log('message screen was navigated away from');
        const { messageID, isSentMsg } = this.props.navigation.state.params;
        if(!isSentMsg){
          const { updateMessageState } = this.props;
          updateMessageState(messageID);
        }
        this.closeMessageOptions();
      }
    );

    //define animation props
    this.aBottom = new Animated.Value(0);
    this.aOpacity = new Animated.Value(0);
  }

  componentDidMount = () => {

  }

  openMessageOptions = () => {
    this.aBottom.setValue(0);
    this.aOpacity.setValue(0);

    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    }

    Animated.parallel([
      createAnimation(this.aBottom, 300, Easing.ease),
      createAnimation(this.aOpacity, 300, Easing.ease)       
    ]).start();
  }

  closeMessageOptions = () => {
    this.aBottom.setValue(1);
    this.aOpacity.setValue(1);

    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
        value,
        {
          toValue: 0,
          duration,
          easing,
          delay
        }
      )
    }

    Animated.parallel([
      createAnimation(this.aBottom, 300, Easing.ease),
      createAnimation(this.aOpacity, 300, Easing.ease)
    ]).start();
  }

  render() {
    const { t, i18n, navigation } = this.props;
    const { messageID, date } = this.props.navigation.state.params;
    const { messages, showDetail } = this.props;
    const { isFetching, hasError } = this.props;
    var message;

    const aBottom = this.aBottom.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0]
    })

    const aOpacity = this.aOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    if(messages.length > 0){
        message = messages.filter(message => message.idxMensaje == messageID)[0];
        
    }

    if(message == undefined && !isFetching){
      return (
        <View style={styles.msgContainer}>
        </View>
      )
    }

    if (isFetching) {
      return (
        <View style={styles.msgContainer}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }

    if (hasError) {
      return (
        <View style={styles.msgContainer}>
              <Text>{t('message:hasError')}</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.composeMsg}
          onPress={() => this.openMessageOptions()}
        >
          <Entypo name={'dots-three-horizontal'} size={30} color={colors.white} />
        </TouchableOpacity>
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'absolute',
            left: 0,
            bottom: aBottom,
            opacity: aOpacity,
            backgroundColor: colors.white,
            padding: 10,
            width: '100%',
            height: 300,
            zIndex: 1
          }}>
          <TouchableOpacity 
            style={styles.messageAction}
            onPress={() => navigation.navigate('NewMessage', {
              messageID: message.idxMensaje,
              type: 'Reply',
              date: date
            })}
          >
            <Entypo name={'reply'} size={30} color={colors.white} />
            <Text style={{color: colors.white}}>{t('message:reply')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.messageAction}
            onPress={() => navigation.navigate('NewMessage', {
              messageID: message.idxMensaje,
              type: 'ReplyAll',
              date: date
            })}
          >
            <Entypo name={'reply-all'} size={30} color={colors.white} />
            <Text style={{color: colors.white}}>{t('message:replyall')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.messageAction}
            onPress={() => navigation.navigate('NewMessage', {
              messageID: message.idxMensaje,
              type: 'Forward',
              date: date
            })}
          >
            <Entypo name={'forward'} size={30} color={colors.white} />
            <Text style={{color: colors.white}}>{t('message:forward')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.messageAction, {backgroundColor: 'red'}]} 
            onPress={() => this.closeMessageOptions()}
          >
            <MaterialIcons name={'cancel'} size={30} color={colors.white} />
            <Text style={{color: colors.white}}>{t('message:cancel')}</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={{height: '100%', width: '100%'}}>
          <ScrollView style={{ width: '100%', flex: 1, backgroundColor: '#fff', padding: 10 }}>
              <View>
                <Text style={styles.infoHeader}>{t('message:from')}</Text>
                <Text>{message.RemNombre}</Text>
                <Text style={styles.infoHeader}>{t('message:to')}</Text>
                <Text>{message.DesNombre}</Text>
                <View style={styles.divider}></View>
                <Text style={styles.infoHeader}>{message.Asunto}</Text>
                <Text style={styles.date}>{date}</Text>
                <View style={styles.divider}></View>
              </View>
              <View style={{paddingBottom: 100}}>
                  <HTML html={message.Contenido === '' ? ' ' : message.Contenido} imagesMaxWidth={Dimensions.get('window').width} />
              </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  msgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  composeMsg: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 20,
    backgroundColor: colors.blue,
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowOffset: {  width: 2.5,  height: 5,  },
    shadowColor: colors.black,
    shadowOpacity: 0.5,
  },
  messageAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '100%',
    backgroundColor: colors.blue,
    marginBottom: 10,
    borderRadius: 5
  },
  messageInfo: {
      width: '100%',
      padding: 10,
      borderWidth: 0.5,
      borderColor: 'green'
  },
  infoHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      color: colors.blue
  },
  date: {
      marginTop: 10,
      marginBottom: 10
  },
  divider: {
    marginTop: 10, 
    marginBottom: 10,
    height: 1,
    backgroundColor: colors.greyLight,
    width: '100%'
  },
});

const mapStateToProps = (state) => {
  return {
    isFetching: state.messagesReducer.isFetchingMessage,
    hasError: state.messagesReducer.messageHasError,
    token: state.loginReducer.Token,
    idColegio: state.loginReducer.Student.IdColegio,
    idxMaestro: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].IdxEstudiante : state.loginReducer.Student.IdxMaestro,
    tipoMaestro: state.loginReducer.Student.TipoMaestro,
    cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
    messages: state.messagesReducer.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessage: (idMensaje, idxMaestro, tipoMaestro, token) => {
      dispatch(messageFetchData(idMensaje, idxMaestro, tipoMaestro, token)); 
    },
    updateMessageState: (idMensaje) => {
      dispatch(messageIsRead(idMensaje));
    }
  }
}

export default translate(['message', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Message));