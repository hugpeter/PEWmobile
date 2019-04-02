import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { connect } from 'react-redux';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { 
  SimpleLineIcons,
  MaterialIcons
} from 'react-native-vector-icons';
import { calendarFetchData } from '../actions/calendarActions';
import gradeColor from '../utils/gradeColor';
import { invalidateCache } from "redux-cache";

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
};

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo', 'Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
};

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Septembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Sep','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
};

LocaleConfig.locales['ch'] = {
  monthNames: ['一月','二月','三 月','四 月','五 月','六 月','七 月','八 月','九 月','十 月','十一 月','十二 月'],
  monthNamesShort: ['一月','二月','三 月','四 月','五 月','六 月','七 月','八 月','九 月','十 月','十一 月','十二 月'],
  dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  dayNamesShort: ['日','一','二','三','四','五','六']
};

class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps}) => {
      return { 
        title: screenProps.t('calendar:title'),
        headerTintColor: colors.blue,
        // headerRight: (
        //   <TouchableOpacity  
        //     style={styles.headerRight}
        //     onPress={() => navigation.navigate('Alerts')}
        //   >
        //     <Entypo name={'bell'} size={25} color={colors.blue}/>
        //   </TouchableOpacity> 
        // )
      }
  };

  state = {
    items: {}
  };

  componentDidMount = () => {
    const {i18n} = this.props;
    console.log(i18n.language);
    LocaleConfig.defaultLocale = i18n.language;
    const { idColegio, ano, cedula, bimestre, token, getDates } = this.props;
    var d = new Date();

    const fechaI = this.getFechaI(d);
    const fechaF = this.getFechaF(d);

    getDates(idColegio, ano, cedula, bimestre, fechaI, fechaF, token);
  }

  getFechaI = (d) => {
    var currentMonth = d.getMonth() + 1;
    var month = currentMonth - 2;
    var year = d.getFullYear();

    //check to see if month is now negative, if so, subtract it from 13 to get new month and decrement current year
    if(month <= 0){
      month = 12 + month;
      year -= 1;
    }

    if(month < 10) {
      month = '0' + month;
    }

    return year + '-01-' + month;
  }

  getFechaF = (d) => {
    var currentMonth = d.getMonth() + 1;
    var month = currentMonth + 2;
    var year = d.getFullYear();

    //check to see if month is over 12, if so subtract 12 from it to get new month and increment current year
    if(month > 12){
      month = month - 12;
      year += 1;
    }

    if(month < 10) {
      month = '0' + month;
    }

    return year + '-01-' + month;
  }

  render() {
    const { t, navigation, calendarData, hasError, sessionTimeout } = this.props;

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

    return (
      <View style={styles.container}>
        <Agenda
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={3}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={3}
          items={
            calendarData
          }
          //demo data
          // {
          //   '2019-03-19': [
          //     {fecha: '2019-03-19', actividad: 'ÁLBUM1', titulo: '2D(INFORMÁTICA)', grade: 3.65 }
          //   ],
          //   '2019-03-20': [
          //     {fecha: '2019-03-20', actividad: "Baile", titulo: '2D(FOLKLORE)', grade: 5},
          //     {fecha: '2019-03-20', actividad: 'EVALUACIÓN ORAL1', titulo:'2D(INGLÉS EXPRESIÓN ORAL)', grade: 4.56}
          //   ],
          //   '2019-03-29': [
          //     {fecha: '2019-03-29', actividad: 'skate', titulo: '2D(SKATEBOARDING)', grade: 1.342}
          //   ]
          // }
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
              console.log(item);
              const ano = item.fecha.slice(0,4);
              const { idColegio, cedula } = this.props;
              var grade;
              if(item.grade == undefined){
                grade = <View></View>
              } else {
                grade = <Text style={{...gradeColor[Math.floor(item.grade)]}}>{item.grade.toFixed(1)}</Text>
              }
              return (
                <TouchableOpacity  
                  style={styles.item}
                  onPress={() => navigation.navigate('CalendarDetail', 
                    {
                      idColegio: idColegio,
                      ano: ano,
                      currentDate: item.fecha,
                      cedula: cedula
                    }
                  )}
                >
                    <Text style={styles.itemFont}>{item.titulo}</Text>
                    <Text style={styles.itemFont}>{item.actividad}</Text>
                    {grade}
                </TouchableOpacity>
              );
            }
          }
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
              return (
                <View style={styles.emptyDate}>
                  <View style={styles.divider}></View>
                </View>
              );
            }
          }
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => {
              return (
                <View style={styles.center}>
                  <Text>{t('calendar:noEvents')}</Text>
                </View>
              );
            }
          }
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: '#f2f2f2',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: colors.blue,
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'green',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: colors.blue,
            agendaKnobColor: colors.blue,
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: colors.blue,
          }}
          agenda container
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  msgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20
  },
  item: {
    width: '100%',
    height: 100,
    margin: 10,
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.blue,
    borderWidth: 0.5,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  logoutBtn:{
    padding: 50
  },
  itemFont: {
    color: colors.black,
    fontSize: 14
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  divider: {
    width: '95%',
    height: 0.5,
    backgroundColor: colors.grey,
    borderRadius: 15
  },
  headerRight: {
    height: 45,
    width: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    margin: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    isFetching: state.calendarReducer.isFetching,
    hasError: state.calendarReducer.hasError,
    sessionTimeout: state.loginReducer.sessionTimeout,
    token: state.loginReducer.Token,
    ano: state.loginReducer.Student.Ano,
    idColegio: state.loginReducer.Student.IdColegio,
    idioma: state.loginReducer.Student.Idioma,
    cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
    bimestre: state.loginReducer.Student.Periodo,
    calendarData: state.calendarReducer.calendarData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDates: (idColegio, ano, cedula, bimestre, fechaI, fechaF, token) => {
      dispatch(calendarFetchData(idColegio, ano, cedula, bimestre, fechaI, fechaF, token)); 
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

export default translate(['calendar', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen));