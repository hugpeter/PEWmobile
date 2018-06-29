import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, 
    TouchableOpacity, ActivityIndicator, 
    Button, StatusBar, Platform, WebView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { messageFetchData, messageIsRead } from '../actions/inboxActions';
import colors from '../utils/colors';
import timeConvert from '../utils/timeConvert';
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
    super(props)
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
        const { messageID } = this.props.navigation.state.params;
        const { updateMessageState } = this.props;
        updateMessageState(messageID);
      }
    )
  }

  componentDidMount = () => {
    
  }

  render() {
    const { t, i18n, navigation } = this.props;
    const { messageID, date } = this.props.navigation.state.params;
    const { messages, showDetail } = this.props;
    const { isFetching, hasError } = this.props;
    var message;

    if(messages.length > 0){
        message = messages.filter(message => message.idxMensaje == messageID)[0];
    }

    if(message == undefined && !isFetching){
      return (
        <View style={styles.msgContainer}>
          {/* <Text>{t('message:noMessages')}</Text> */}
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
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            <View>
              <Text style={styles.infoHeader}>{t('message:from')}</Text>
              <Text>{message.RemNombre}</Text>
              <Text style={styles.infoHeader}>{t('message:to')}</Text>
              <Text>{message.DesNombre.substring(0,15)}...</Text>
              <View style={styles.divider}></View>
              <Text style={styles.infoHeader}>{message.Asunto}</Text>
              <Text style={styles.date}>{date}</Text>
              <View style={styles.divider}></View>
            </View>
            <View style={{paddingBottom: 100}}>
                <HTML  html={message.Contenido} imagesMaxWidth={Dimensions.get('window').width} />
            </View>
        </ScrollView>
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
  console.log(state.loginReducer.CurrentFamilyMemberIndex);
  console.log(state.inboxReducer.inbox);
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