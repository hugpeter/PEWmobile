import React from 'react';
import { translate, Trans } from 'react-i18next';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input, Overlay, CheckBox } from 'react-native-elements';
import { notasFetchData } from '../actions/notasActions';
import { connect } from 'react-redux';
import colors from '../utils/colors';
import gradeColor from '../utils/gradeColor';
import { 
  Entypo
} from 'react-native-vector-icons';

class Grades extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('grades:title'),
    headerTintColor: colors.blue,
    headerRight: (
      <TouchableOpacity  
        style={styles.headerRight}
        onPress={() => navigation.navigate('Alerts')}
      >
        <Entypo name={'bell'} size={25} color={colors.blue}/>
      </TouchableOpacity> 
    )
  });

  state = {
    notas: []
  }

  componentDidMount = () => {
    const { getNotas } = this.props;
    const {ano, idColegio, idioma, cedula, bimestre, token} = this.props;
    getNotas(ano, idColegio, idioma, cedula, bimestre, token);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.notas);
  }

  render() {
    const { isFetching, hasError } = this.props;
    const {t, i18n, navigation} = this.props;
    const { navigate } = navigation;
    const { notas } = this.props;

    if(notas.length == 0 && !isFetching){
      return <View style={styles.msgContainer}><Text>{t('grades:noClasses')}</Text></View>
    }

    if (isFetching) {
      return <View style={styles.msgContainer}><Text>{t('grades:isFetching')}</Text><ActivityIndicator size='large'/></View>
    }

    if (hasError) {
      return <View style={styles.msgContainer}><Text>{t('grades:hasError')}</Text></View>
    }

    return (
      <View style={styles.container}>
        <View style={{height: '100%'}} >
          <View style={styles.notas}>
            <View style={styles.grade}>
              <Text style={styles.header}>
                {t('grades:headers.class')}
              </Text>
            </View>
            <View style={styles.grade}>
              <Text style={styles.header}>
              {t('grades:headers.grade')}
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {
              notas.map((nota, index) => {
                if(index & 1){
                  return (
                    <TouchableOpacity 
                      style={styles.notas}
                      key={index}
                      onPress={() => navigation.navigate('GradesDetail',
                        {
                          assignments: nota.assignments,
                          class: nota.class
                        }
                      )}
                    >
                      <View style={styles.class}>
                        <Text style={styles.data}>
                          {nota.class}
                        </Text>
                      </View>
                      <View style={styles.grade}>
                        <Text style={{...gradeColor[Math.floor(nota.average)]}}>
                          { (Math.round(nota.average * 10) / 10).toFixed(1) }
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
                          assignments: nota.assignments,
                          class: nota.class
                        }
                      )}
                    >
                      <View style={styles.class}>
                        <Text style={styles.data}>
                          {nota.class}
                        </Text>
                      </View>
                      <View style={styles.grade}>
                        <Text style={{...gradeColor[Math.floor(nota.average)]}}>
                          { (Math.round(nota.average * 10) / 10).toFixed(1) }
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
    isFetching: state.notasReducer.isFetching,
    hasError: state.notasReducer.hasError,
    token: state.loginReducer.Token,
    ano: state.loginReducer.Student.Ano,
    idColegio: state.loginReducer.Student.IdColegio,
    idioma: state.loginReducer.Student.Idioma,
    cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
    bimestre: state.loginReducer.Student.Periodo,
    notas: state.notasReducer.notas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotas: (ano, idColegio, idioma, cedula, bimestre, token) => {
      dispatch(notasFetchData(ano, idColegio, idioma, cedula, bimestre, token)); 
    }
  }
}

export default translate(['grades', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Grades));