import React from 'react';
import { translate, Trans } from 'react-i18next';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { inboxFetchData } from '../actions/inboxActions';

class Messages extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('messages:title')
  });

  componentDidMount = () => {
    const { idColegio, cedula, token } = this.props;
    getInbox( idColegio, cedula, token );
  }

  render() {
    const { t, i18n, navigation } = this.props;
    const { inbox } = this.props;

    return (
      <View style={styles.container}>
        <View style={{height: '100%'}} >
          <View style={styles.notas}>
            <View style={styles.grade}>
              <Text style={styles.header}>
                {t('messages:headers.class')}
              </Text>
            </View>
            <View style={styles.grade}>
              <Text style={styles.header}>
                {t('messages:headers.grade')}
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {
              inbox.map((message, index) => {
                if(index & 1){
                  return (
                    <TouchableOpacity 
                      style={styles.notas}
                      key={index}
                      onPress={() => navigation.navigate('GradesDetail',
                        {
                          
                        }
                      )}
                    >
                      <View style={styles.class}>
                        <Text style={styles.data}>
                          {message.REMITENTE_NOMBRE}
                        </Text>
                      </View>
                      <View style={styles.grade}>
                        <Text style={}>
                          { message.asunto }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )  
                } else {
                  return (
                    <TouchableOpacity 
                      style={styles.notasAlt}
                      key={index}
                      onPress={() => navigation.navigate('GradesDetail',
                        {
                          
                        }
                      )}
                    >
                      <View style={styles.class}>
                        <Text style={styles.data}>
                          { message.REMITENTE_NOMBRE }
                        </Text>
                      </View>
                      <View style={styles.grade}>
                        <Text style={}>
                          { message.asunto }
                        </Text>
                      </View>
                    </TouchableOpacity>
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
  scrollView: {
    paddingTop: 0,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  class: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '10%'
  },
  grade: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notas: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  notasAlt: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: colors.greyLight
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  data: {
    fontSize: 18
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
});

const mapStateToProps = (state) => {
  console.log(state.loginReducer.CurrentFamilyMemberIndex);
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

export default translate(['messages', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages));