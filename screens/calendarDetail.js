import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import colors from '../utils/colors';
import { 
  Entypo
} from 'react-native-vector-icons';
import { calendarDetailFetchData, updateCalendarDetailInfo } from '../actions/calendarActions';
import { invalidateCache } from "redux-cache";

const DayNames = [
  'calendarDetail:dayNames.sunday',
  'calendarDetail:dayNames.monday',
  'calendarDetail:dayNames.tuesday',
  'calendarDetail:dayNames.wednesday',
  'calendarDetail:dayNames.thursday',
  'calendarDetail:dayNames.friday',
  'calendarDetail:dayNames.saturday'
];

class CalendarDetail extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('calendarDetail:title'),
    headerTintColor: colors.blue,
    // headerRight: (
    //   <TouchableOpacity  
    //     style={styles.headerRight}
    //     onPress={() => navigation.navigate('Alerts')}
    //   >
    //     <Entypo name={'bell'} size={25} color={colors.blue}/>
    //   </TouchableOpacity> 
    // )
  });

  componentDidMount = () => {
      const { idColegio, ano, currentDate, cedula } = this.props.navigation.state.params;
      const { getDetails, invalidate, updateDetailInfo, token } = this.props;
      
      const { idColegioPrev, anoPrev, currentDatePrev, cedulaPrev } = this.props;
      
      if(idColegio != idColegioPrev || ano != anoPrev || currentDate != currentDatePrev && cedula == cedulaPrev){
        invalidate();
      }

      updateDetailInfo(idColegio, ano, currentDate, cedula);

      const formattedDate = currentDate.slice(0,4) + currentDate.slice(7,10) + currentDate.slice(4, 7);
      getDetails(idColegio, ano, formattedDate, cedula, token);
  }

  render() {
    const { t, calendarDetails, isFetching, hasError } = this.props;
    const { assignments } = this.props.navigation.state.params;

    if(isFetching){
      return <View style={styles.msgContainer}><ActivityIndicator size='large'/></View>
    } else if(hasError){
      return <View style={styles.msgContainer}><Text>{t('calendarDetail:hasError')}</Text></View>
    } else {
      return (
        <View style={styles.container}>
          <View style={{height: '100%'}} > 
            <ScrollView 
              ref={scroll => { this.scroll = scroll; }}
              contentContainerStyle={styles.scrollView}
              // contentOffset={{x: 0, y: 500}}
            >
              {
                calendarDetails.map((detail, index) => {
                      var currentDate = detail.fecha;
                      var prevDate = index - 1 < 0 ? '' : calendarDetails[index - 1].fecha;
  
                      if(currentDate == prevDate){
                          return (
                              <View
                                  key={index}
                                  style={styles.detail}
                              >
                                  <View style={styles.detailHeader}>
                                      <Text style={styles.headerData}>({detail.grupo}) {detail.nommat}</Text>
                                      <Text style={styles.headerData}>{detail.actividad} - {detail.tipoactividad}</Text>
                                      <Text style={styles.headerDataProfessor}>{t('calendarDetail:professor')} {detail.nombre}</Text>
                                      <Text style={styles.headerDataSecondary}>{t('calendarDetail:added')} {detail.actualizado}</Text>
                                  </View>
                                  <View style={styles.detailBody}>
                                      <Text style={styles.dataPrimary}>{detail.contenido}</Text>
                                      <Text style={styles.data}>{detail.instr_eval}</Text>
                                      <Text style={styles.dataSecondary}>{detail.suge_estu}</Text>
                                  </View>
                              </View>
                          )
                      } else {
                          return (
                              <View
                                  key={index}
                                  style={styles.detail}
                              >
                                  <View style={styles.dayBanner}>
                                      <Text style={styles.dayBannerText}>{t(DayNames[detail.dia_n - 1])}</Text>
                                  </View>
                                  <View style={styles.detailHeader}>
                                      <Text style={styles.headerData}>({detail.grupo}) {detail.nommat}</Text>
                                      <Text style={styles.headerData}>{detail.actividad} - {detail.tipoactividad}</Text>
                                      <Text style={styles.headerDataProfessor}>{t('calendarDetail:professor')} {detail.nombre}</Text>
                                      <Text style={styles.headerDataSecondary}>{t('calendarDetail:added')} {detail.actualizado}</Text>
                                  </View>
                                  <View style={styles.detailBody}>
                                      <Text style={styles.dataPrimary}>{detail.contenido}</Text>
                                      <Text style={styles.data}>{detail.instr_eval}</Text>
                                      <Text style={styles.dataSecondary}>{detail.suge_estu}</Text>
                                  </View>
                              </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fetchingContainer: {
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
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  dayBanner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.greyLight
  },
  dayBannerText: {
    margin: 5,
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black
  },
  detailHeader: {
    flex: 1,
    width: '95%',
    padding: 5,
    marginBottom: 15,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
  },
  detailBody: {
    flex: 3,
    width: '100%',
    padding: 10,
    paddingTop: 0,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  data: {
      margin: 10
  },
  dataPrimary: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  dataSecondary:{
      fontStyle: 'italic',
      margin: 10
  },
  headerData: {
    margin: 3,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white
  },
  headerDataProfessor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8
  },
  headerDataSecondary: {
    color: colors.white,
    fontStyle: 'italic'
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
  msgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
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
      anoPrev: state.calendarDetailReducer.anoPrev,
      idColegioPrev: state.calendarDetailReducer.idColegioPrev,
      currentDatePrev: state.calendarDetailReducer.currentDatePrev,
      cedulaPrev: state.calendarDetailReducer.cedulaPrev,
      bimestre: state.loginReducer.Student.Periodo,
      calendarData: state.calendarReducer.calendarData,
      calendarDetails: state.calendarDetailReducer.calendarDetails
    }
}
  
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getDetails: (idColegio, ano, currentDate, cedula, token) => {
        dispatch(calendarDetailFetchData(idColegio, ano, currentDate, cedula, token)); 
      },
      invalidate: () => {
        dispatch(invalidateCache(['calendarDetailReducer']));
      },
      updateDetailInfo: (idColegio, ano, currentDate, cedula) => {
        dispatch(updateCalendarDetailInfo(idColegio, ano, currentDate, cedula));
      }
    }
}
  
export default translate(['calendarDetail', 'common'], { wait: true})(connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarDetail));