import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, 
    TouchableOpacity, ActivityIndicator, 
    Dimensions, Animated, Easing, Button, TextInput } from 'react-native';
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
import timeConvert from '../utils/timeConvert';
import sendMail from '../utils/sendMail';
import { invalidateCache } from "redux-cache";

class NewMessage extends React.Component {
    state = {
      sendingMessage: false,
      
      m: {
        idColegio: this.props.idColegio,

        remidxMaestro: this.props.idxMaestro,
        remTipoMaestro: this.props.tipoMaestro,
        remCedula: this.props.cedula,
        remNombre: this.props.nombre,

        respondeAidxMsg: 0,

        desidxMaestro: '',
        desNombre: '',
        desidxMaestroCC: '',
        desNombreCC: '',
        desidxMaestroCCO: '',
        desNombreCCO: '',

        asunto: '',
        contenido: '',
        urgente: 0,
        archivo: '0',
        paraApps: 1,
        background: ''
      }
    }

    handleMessageSend = (m) => {
      this.setState({sendingMessage: true})
      const { token, navigation, invalidate } = this.props;
      sendMail(m, token);
      invalidate();
      navigation.goBack();
    }

    render() {
      const { m, sendingMessage } = this.state;
      const { t, i18n } = this.props;
      const { messageID, type, date } = this.props.navigation.state.params;
      const { messages, contacts, idColegio, idxMaestro, tipoMaestro, cedula, nombre } = this.props;

      var message;
      const currentDate = new Date();
      currentDate.setTime(currentDate.getTime() - currentDate.getTimezoneOffset()*60*1000);

      if(messages.length > 0){
        message = messages.filter(message => message.idxMensaje == messageID)[0];
      }

      if(sendingMessage){
        return(
          <View>
            <ActivityIndicator />
          </View>
        )
      }

      switch(type){
        case 'Reply':
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white}}>
              <View style={{height: '100%', width: '100%'}}>

                <View style={styles.newMsgBar}>
                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <FontAwesome name={'close'} size={25} color={colors.blue} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.sendMsg}
                    onPress={() => console.log('messege sent')}
                  >
                    <FontAwesome name={'send'} size={25} color={colors.blue} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 10 }}>
                    <View>
                      <Text style={styles.infoHeader}>{t('message:from')}</Text>
                      <Text>You</Text>
                      <Text style={styles.infoHeader}>{t('message:to')}</Text>
                      <Text>{}...</Text>
                      <View style={styles.divider}></View>
                      <TextInput 
                        style={styles.infoHeader}
                        placeholder="Subject"
                        multiline={false}
                        onChangeText={(text) => this.setState({subject: text})}
                        value={this.state.subject}
                      />
                      <Text style={styles.date}>{timeConvert(currentDate.toJSON(), i18n.language)}</Text>
                      <View style={styles.divider}></View>
                    </View>
                    <View style={{paddingBottom: 100}}>
                      <TextInput
                        style={{width: '100%', height: 800, borderWidth: 0.5, borderColor: colors.greyLight, padding: 10}}
                        placeholder="Type here..."
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(text) => this.setState({body: text})}
                        value={this.state.body}
                      />
                    </View>
                </ScrollView>
              </View>
            </View>
          );
        case 'ReplyAll':
        case 'Forward':
        case 'New':
          var sendOptions;
          if(tipoMaestro == 'F'){
            sendOptions = <Text></Text>
          } else {
            sendOptions = <Text>.. not F</Text>;
          }

          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white}}>
              <View style={{height: '100%', width: '100%'}}>
                <View style={styles.newMsgBar}>
                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <FontAwesome name={'close'} size={25} color={colors.blue} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.sendMsg}
                    onPress={() => this.handleMessageSend(m)}
                  >
                    <FontAwesome name={'send'} size={25} color={colors.blue} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 10 }}>
                    <View>
                      <Text style={styles.infoHeader}>{t('message:from')}</Text>
                      <Text>{t('message:you')}</Text>
                      <Text style={styles.infoHeader}>{t('message:to')}</Text>
                      {sendOptions}
                      <View style={styles.divider}></View>
                      <TextInput 
                        style={styles.infoHeader}
                        placeholder={t('message:subject')}
                        multiline={false}
                        onChangeText={(text) => this.setState({
                          m: {
                            ...m,
                            asunto: text
                          }
                        })}
                        value={this.state.m.asunto}
                      />
                      <Text style={styles.date}>{timeConvert(currentDate.toJSON(), i18n.language)}</Text>
                      <View style={styles.divider}></View>
                    </View>
                    <View style={{paddingBottom: 100}}>
                      <TextInput
                        style={{width: '100%', height: 800, borderWidth: 0.5, borderColor: colors.greyLight, padding: 10}}
                        placeholder="..."
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(text) => this.setState({
                          m: {
                            ...m,
                            contenido: text
                          }
                        })}
                        value={this.state.m.contenido}
                      />
                    </View>
                </ScrollView>
              </View>
            </View>
          );
        default: 
          return <View></View>
      }
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
  newMsgBar:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.greyLight,
    backgroundColor: colors.greyLight,
    shadowColor: colors.black,
    shadowOffset: { width: 1.5, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  cancel:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50
  },
  sendMsg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50
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
    contacts: state.loginReducer.Contactos,
    cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
    messages: state.messagesReducer.messages,
    nombre: state.loginReducer.IsFamilia ? state.loginReducer.FamilyOptions[state.loginReducer.CurrentFamilyMemberIndex] : state.loginReducer.Student.Nombre
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    invalidate: () => {
      dispatch(invalidateCache([
        'inboxReducer',
        'sentBoxReducer',
        'deletedBoxReducer',
        'messagesReducer'
      ]));
    }
  }
}

export default translate(['message', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessage));
