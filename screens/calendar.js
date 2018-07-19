import React from 'react';
import { translate, Trans } from 'react-i18next';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { 
  Entypo,
} from 'react-native-vector-icons';
import { calendarFetchData } from '../actions/calendarActions';
import gradeColor from '../utils/gradeColor';

LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  dayNames: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
  dayNamesShort: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
};

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
  dayNamesShort: ['Lun','Mar','Mie','Jue','Vie','Sab','Dom']
};

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Septembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Sep','Out','Nov','Dez'],
  dayNames: ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'],
  dayNamesShort: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']
};

LocaleConfig.locales['ch'] = {
  monthNames: ['一月','二月','三 月','四 月','五 月','六 月','七 月','八 月','九 月','十 月','十一 月','十二 月'],
  monthNamesShort: ['一月','二月','三 月','四 月','五 月','六 月','七 月','八 月','九 月','十 月','十一 月','十二 月'],
  dayNames: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
  dayNamesShort: ['一','二','三','四','五','六','日']
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
    const { t, navigation, calendarData } = this.props;
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

    return (
      <View style={styles.container}>
        <Agenda
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={calendarData}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {console.log('trigger items loading')}}
          // callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // callback that gets called on day press
          onDayPress={(day)=>{console.log('day pressed')}}
          // callback that gets called when day changes while scrolling agenda list
          onDayChange={(day)=>{console.log('day changed')}}
          // initially selected day
          selected={formattedCurrentDate}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={'2017-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2019-05-30'}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={2}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={2}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
              const ano = item.fecha.slice(0,4);
              const { idColegio, cedula } = this.props;
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
                    <Text style={{...gradeColor[Math.floor(item.grade)]}}>{item.grade.toFixed(1)}</Text>
                </TouchableOpacity>
              );
            }
          }
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          // renderDay={(day, item) => {return (<Text>{day}</Text>);}}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
              return (
                <View style={styles.emptyDate}>
                  <View style={styles.divider}></View>
                </View>
              );
            }
          }
          // specify how agenda knob should look like
          // renderKnob={() => {return (<View />);}}
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => {
              return (
                <View style={styles.center}>
                  <Text>{t('calendar:noEvents')}</Text>
                </View>
              );
            }
          }
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          // Hide knob button. Default = false
          hideKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // markedDates={{
          //   '2018-05-22': {selected: true, marked: true},
          //   '2018-05-17': {marked: true},
          //   '2018-05-18': {disabled: true}
          // }}
          // style={{
            
          // }}
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
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: colors.blue,
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
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
    }
  }
}

export default translate(['calendar', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen));