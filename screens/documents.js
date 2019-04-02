import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  ActivityIndicator
 } from 'react-native';
import { connect } from 'react-redux';
import colors from '../utils/colors';
import { 
  SimpleLineIcons,
  MaterialIcons
} from 'react-native-vector-icons';
import NavigationStateNotifier from '../NavigationStateNotifier';
import { invalidateCache } from "redux-cache";
import { documentsFetchData } from '../actions/documentsActions.js';

class Documents extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('documents:title')
  });

  constructor (props) {
    super(props);
    NavigationStateNotifier.newListener(
      this,
      () => {
        // anything else that you'd like to do when this screen is navigated to
        console.log('documents screen was navigated to');
        const { idColegio, idMaestro, tipoMaestro, idxEstudiante, cedula, token, getDocs } = this.props;
        if(idMaestro == 0){
          getDocs(idColegio, cedula, idxEstudiante, tipoMaestro, token);
        } else {
          getDocs(idColegio, cedula, idMaestro, tipoMaestro, token);
        }
      },
      () => {
        // anything else that you'd like to do when this screen is navigated off of
        console.log('documents screen was navigated away from');
      }
    );
  }

  componentDidMount = () => {

  }

  render() {
    const { t, i18n, documents, navigation } = this.props;

    const { isFetching, hasError, sessionTimeout } = this.props;

    if (sessionTimeout) {
      return (
        <View style={styles.msgContainer}>
          <Text>
            {t('common:timeout')}
          </Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={ () => {
              this.props.logOut();
              navigation.navigate('Auth', {
                errorMsg: t('common:timeout')
              })
            }}
          >
            <SimpleLineIcons name={'logout'} size={60} color={colors.blue}/>
          </TouchableOpacity>
        </View>
      )
    }

    if (hasError) {
      return (
        <View style={styles.msgContainer}>
          <MaterialIcons name={'error'} size={60} color={colors.blue}/>
          <Text>
            {t('common:hasError')}
          </Text>
        </View>
      )
    }

    if(documents.length == 0 && !isFetching){
      return (
        <View style={styles.msgContainer}>
          <Text>{t('documents:noMessages')}</Text>
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

    return (
      <View style={styles.container}>
        <View style={{height: '100%', width: '100%'}}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {
              documents.map((doc, index) => {
                return (             
                  <TouchableOpacity 
                    key={index}
                    style={styles.document}
                    onPress={() => navigation.navigate('Document',
                      {
                        document: doc
                      }
                    )}
                  >
                    <Text style={{fontSize: 25}}>{doc.Descripcion}</Text>
                    <View style={styles.divider}></View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20
  },
  scrollView: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  document: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20
  },
  divider: {
    marginTop: 20,
    height: 1,
    backgroundColor: colors.greyLight,
    width: '100%'
  },
});

const mapStateToProps = (state) => {
  return {
    isFetching: state.documentsReducer.isFetchingDocuments,
    hasError: state.documentsReducer.documentsHaveError,
    sessionTimeout: state.loginReducer.sessionTimeout,
    documents: state.documentsReducer.documents,
    token: state.loginReducer.Token,
    idColegio: state.loginReducer.Student.IdColegio,
    cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
    idMaestro: state.loginReducer.Student.IdxMaestro,
    tipoMaestro: state.loginReducer.Student.TipoMaestro,
    idxEstudiante: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].IdxEstudiante : state.loginReducer.Student.IdxMaestro,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDocs: (idColegio, cedula, userId, tipoMaestro, token) => {
      dispatch(documentsFetchData(idColegio, cedula, userId, tipoMaestro, token)); 
    },
    invalidate: () => {
      dispatch(invalidateCache([
        'inboxReducer',
        'sentBoxReducer',
        'deletedBoxReducer',
        'messagesReducer'
      ]));
    },
    logOut: () => {
      dispatch(invalidateCache([
        'notasReducer', 
        'calendarReducer', 
        'calendarDetailReducer', 
        'inboxReducer',
        'loginReducer',
        'sentBoxReducer',
        'deletedBoxReducer',
        'messagesReducer',
        'documentsReducer'
      ]));
    },
  }
}

export default translate(['documents', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents));