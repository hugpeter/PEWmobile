import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  ActivityIndicator
 } from 'react-native';
import { connect } from 'react-redux';
import { inboxFetchData } from '../actions/inboxActions';
import colors from '../utils/colors';
import timeConvert from '../utils/timeConvert';
import { 
  Ionicons
} from 'react-native-vector-icons';
import NavigationStateNotifier from '../NavigationStateNotifier';
import Swipeout from 'react-native-swipeout';


class Inbox extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: screenProps.t('inbox:title'),
    headerStyle: {
      backgroundColor: colors.white
    },
    headerTintColor: colors.blue,
    headerLeft: (
      <TouchableOpacity
        style={styles.drawerToggle}
        onPress={() => navigation.toggleDrawer()}
      > 
        <Ionicons name={'ios-menu'} size={30} color={colors.blue} />
      </TouchableOpacity>
    )
  });

  constructor (props) {
    super(props);
    NavigationStateNotifier.newListener(
      this,
      () => {
        // anything else that you'd like to do when this screen is navigated to
        console.log('inbox screen was navigated to');
        const { idColegio, cedula, token, getInbox } = this.props;
        getInbox( idColegio, cedula, token );
      },
      () => {
        // anything else that you'd like to do when this screen is navigated off of
        console.log('inbox screen was navigated away from');
      }
    );
    
  }

  componentDidMount = () => {

  }

  render() {
    const { t, i18n, navigation } = this.props;
    const { inbox } = this.props;
    const { isFetching, hasError } = this.props;

    if(inbox.length == 0 && !isFetching){
      return (
        <View style={styles.msgContainer}>
          <Text>{t('inbox:noMessages')}</Text>
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
              <Text>{t('inbox:hasError')}</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.composeMsg}
          onPress={() => navigation.navigate('NewMessage', {
            messageID: 0,
            type: 'New'
          })}
        >
          <Ionicons name={'md-create'} size={30} color={colors.white} />
        </TouchableOpacity>
        <View style={{height: '100%'}} >
          <ScrollView contentContainerStyle={styles.scrollView}>
            {
              inbox.map((message, index) => {
                // Buttons
                var swipeoutBtns = [
                  {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                      console.log(message.asunto)
                    }
                  }
                ]
                var date = timeConvert(message.FECHAENVIO, i18n.language);
                  if(message.estado.substring(0, 1) == '<'){
                    return (
                      <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor={'transparent'} key={index}>                  
                        <TouchableOpacity 
                          style={styles.inboxMessage}
                          onPress={() => navigation.navigate('Message',
                            {
                              messageID: message.idmensaje,
                              date: date
                            }
                          )}
                        >
                          <View style={styles.new}>
                          </View>
                          <Text style={styles.name}>
                              {message.REMITENTE_NOMBRE}
                          </Text>
                          <Text style={styles.date}>
                              {date}
                          </Text>
                          <Text style={styles.subject}>
                              {message.asunto}
                          </Text>
                          <View style={styles.divider}></View>
                        </TouchableOpacity>
                      </Swipeout>
                    )  
                  } else {
                    return (
                      <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor={'transparent'} key={index}>
                        <TouchableOpacity 
                          style={styles.inboxMessage}
                          onPress={() => navigation.navigate('Message',
                            {
                              messageID: message.idmensaje,
                              date: date
                            }
                          )}
                        >
                          <Text style={styles.name}>
                              {message.REMITENTE_NOMBRE}
                          </Text>
                          <Text style={styles.date}>
                              {date}
                          </Text>
                          <Text style={styles.subject}>
                              {message.asunto}
                          </Text>
                          <View style={styles.divider}></View>
                        </TouchableOpacity>
                      </Swipeout>
                    )  
                  }
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
  drawerToggle:{
    marginLeft: 20
  },
  scrollView: {
    paddingTop: 0,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  inboxMessage: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 25,
    paddingBottom: 0,
    marginTop: 5,
    marginBottom: 5,
    width: '99%',
    // borderWidth: 0.5,
    // borderColor: 'black',
    // borderRadius: 5,
    // backgroundColor: colors.greyLight,
    flexWrap:'wrap',
    alignContent: 'stretch'
  },
  divider: {
    marginTop: 20,
    height: 1,
    backgroundColor: colors.greyLight,
    width: '100%'
  },
  headerRight: {
    height: 45,
    width: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    marginRight: 20,
    margin: 5,
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
  new: {
    position: 'absolute',
    zIndex: 1,
    left: 5,
    top: 2,
    backgroundColor: colors.blue,
    width: 10,
    height: 10,
    borderRadius: 10,
    // shadowOffset: {  width: 1,  height: 1,  },
    // shadowColor: colors.black,
    // shadowOpacity: 1,
  },
  name: {
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '50%',
    fontSize: 18,
    fontWeight: 'bold',
    // alignSelf: 'flex-start'
  },
  date: {
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '50%',
    fontSize: 15,
    // alignSelf: 'flex-end'
  },
  subject: {
    width: '100%',
    fontSize: 16,
    marginTop: 15,
    alignSelf: 'flex-start'
  }
});

const mapStateToProps = (state) => {
  console.log(state.loginReducer.CurrentFamilyMemberIndex);
  console.log(state.inboxReducer.inbox);
  return {
    isFetching: state.inboxReducer.isFetchingInbox,
    hasError: state.inboxReducer.inboxHasError,
    token: state.loginReducer.Token,
    idColegio: state.loginReducer.Student.IdColegio,
    cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
    inbox: state.inboxReducer.inbox
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInbox: (idColegio, cedula, token) => {
      dispatch(inboxFetchData(idColegio, cedula, token)); 
    }
  }
}

export default translate(['inbox', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox));