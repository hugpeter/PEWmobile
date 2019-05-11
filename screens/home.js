import React from 'react';
import { 
  translate
} from 'react-i18next';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import colors from '../utils/colors';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { changeFamilyMember } from '../actions/loginActions';
import { invalidateCache } from "redux-cache";
import { getNewMessageCount } from '../actions/inboxActions';

const iconStyle = {
  flex: 1,
  width: 80,
  height: 80,
  resizeMode: 'contain'
};

const buttons = [
  {
    name: 'home:buttons.grades',
    navTo: 'Grades',
    symbol: (<Image source={require('../img/icons/notasdiarias-256.png')} style={iconStyle} />)
  },
  // { 
  //   name: 'home:buttons.alerts',
  //   navTo: 'Alerts',
  //   symbol: (<Entypo name={'bell'} size={symbolSize} color={colors.blue}/>)
  // },
  // {
  //   name: 'home:buttons.cashflow',
  //   navTo: 'Cashflow',
  //   symbol: (<MaterialIcons name={'attach-money'} size={symbolSize} color={colors.blue}/>)
  // },
  {
    name: 'home:buttons.calendar',
    navTo: 'Calendar',
    symbol: (<Image source={require('../img/icons/agenda-256.png')} style={iconStyle} />)
  },
  {
    name: 'home:buttons.documents',
    navTo: 'Documents',
    symbol: (<Image source={require('../img/icons/documento-256.png')} style={iconStyle} />)
  },
  // {
  //   name: 'home:buttons.coupons',
  //   navTo: 'Coupons',
  //   symbol: (<Entypo name={'ticket'} size={symbolSize} color={colors.blue}/>)
  // },
  {
    name: 'home:buttons.logout',
    navTo: 'Auth',
    symbol: (<Image source={require('../img/icons/exit-256.png')} style={iconStyle} />)
  }
];

const buttonsLocked = [
  {
    name: 'home:buttons.grades',
    navTo: 'Grades',
    symbol: (<Image source={require('../img/icons/notasdiarias-gray256.png')} style={iconStyle} />)
  },
  // { 
  //   name: 'home:buttons.alerts',
  //   navTo: 'Alerts',
  //   symbol: (<Entypo name={'bell'} size={symbolSize} color={colors.blue}/>)
  // },
  // {
  //   name: 'home:buttons.cashflow',
  //   navTo: 'Cashflow',
  //   symbol: (<MaterialIcons name={'attach-money'} size={symbolSize} color={colors.blue}/>)
  // },
  {
    name: 'home:buttons.calendar',
    navTo: 'Calendar',
    symbol: (<Image source={require('../img/icons/agenda-gray256.png')} style={iconStyle} />)
  },
  {
    name: 'home:buttons.documents',
    navTo: 'Documents',
    symbol: (<Image source={require('../img/icons/documento-gray-256.png')} style={iconStyle} />)
  },
  // {
  //   name: 'home:buttons.coupons',
  //   navTo: 'Coupons',
  //   symbol: (<Entypo name={'ticket'} size={symbolSize} color={colors.blue}/>)
  // },
  {
    name: 'home:buttons.logout',
    navTo: 'Auth',
    symbol: (<Image source={require('../img/icons/exit-256.png')} style={iconStyle} />)
  }
];

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    if(state.params != undefined){
      if(state.params.familyOptions != undefined){
        return { 
          headerTitle:  <ModalDropdown
                          onSelect={(idx, value) => state.params.changeFamilyMember(idx)}
                          defaultValue={state.params.familyOptions[state.params.currentFamilyMemberIndex]}
                          defaultIndex={0} 
                          options={state.params.familyOptions}
                          style={styles.changeFamStyle}
                          textStyle={styles.changeFamText}
                          dropdownStyle={styles.changeFamDropdownStyle}
                        />,
          // headerRight: (
          //   <TouchableOpacity  
          //     style={styles.headerRight}
          //     onPress={() => navigation.navigate('Alerts')}
          //   >
          //     <Entypo name={'bell'} size={25} color={colors.blue}/>
          //   </TouchableOpacity> 
          // )
        }
      } else {
        return { 
          headerTitle:  <View />,
          headerTintColor: colors.blue,
        }
      }
    }
  };

  componentWillMount(){
    const {setParams} = this.props.navigation;
    const changeFamilyMember = this.props.changeFamilyMember;

    setParams({
      familyOptions: this.props.familyOptions,
      currentFamilyMemberIndex: this.props.currentFamilyMemberIndex,
      changeFamilyMember: changeFamilyMember
    });
  }

  componentDidMount = () => {
    
  }

  render() {
    const { t, navigation, student } = this.props;

    if(student.Produccion == 0){
      return (
        <View style={styles.container}>
          <View style={{height: '100%'}} >
            <ScrollView contentContainerStyle={styles.scrollView}>
              {
                buttonsLocked.map((button, index) => {
                  return (
                    <TouchableOpacity 
                      key={index}
                      style={styles.buttons} 
                      onPress={() => {
                        if(button.navTo == 'Auth'){
                          this.props.logOut();
                          navigation.navigate(button.navTo);
                        } else {
                          //These buttons are deactivated, pressing them should do nothing.
                        }
                      }}
                    >
                      {button.symbol}
                      <Text style={styles.buttonText}>{t(button.name)}</Text>
                    </TouchableOpacity>
                  )
                })
              }  
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{height: '100%'}} >
            <ScrollView contentContainerStyle={styles.scrollView}>
              {
                buttons.map((button, index) => {
                  return (
                    <TouchableOpacity 
                      key={index}
                      style={styles.buttons} 
                      onPress={() => {
                        if(button.navTo == 'Auth'){
                          this.props.logOut();
                          navigation.navigate(button.navTo);
                        } else {
                          navigation.navigate(button.navTo);
                        }
                      }}
                    >
                      {button.symbol}
                      <Text style={styles.buttonText}>{t(button.name)}</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  noAccess:{
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 200,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bold: {
    fontWeight: 'bold'
  },
  light: {
    fontWeight: 'normal'
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
  buttons: {
   alignItems: 'center',
   justifyContent: 'space-evenly',
   marginTop: 10,
   marginBottom: 10,
   width: '50%',
   height: 150,
   backgroundColor: colors.white
  },
  buttonText: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold'
  },
  changeFamStyle: {
    alignSelf: 'center',
    marginBottom: 5,
    width: 250,
    height: '60%',
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: colors.blue,
  },
  changeFamText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  changeFamDropdownStyle: {
    width: 250,
    borderColor: colors.blue,
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_2_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
});

const mapStateToProps = (state) => {
  return {
    familyMembers: state.loginReducer.FamilyMembers,
    currentFamilyMemberIndex: state.loginReducer.CurrentFamilyMemberIndex,
    student: state.loginReducer.Student,
    familyOptions: state.loginReducer.FamilyOptions,
    token: state.loginReducer.Token
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeFamilyMember: (index) => {
      console.log('changing family member index to: ' + index);
      dispatch(invalidateCache([
        'notasReducer', 
        'calendarReducer', 
        'calendarDetailReducer', 
        'inboxReducer',
        'sentBoxReducer',
        'deletedBoxReducer',
        'messagesReducer',
        'documentsReducer'
      ]));
      dispatch(changeFamilyMember(index));
    },
    logOut: () => {
      dispatch(invalidateCache([
        'notasReducer', 
        'calendarReducer', 
        'calendarDetailReducer', 
        'inboxReducer',
        'sentBoxReducer',
        'deletedBoxReducer',
        'messagesReducer',
        'documentsReducer'
      ]));
    },
    newMessageCount: (idColegio, cedula, token) => {
      dispatch(getNewMessageCount(idColegio, cedula, token));
    }
  }
}

export default translate(['home', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));