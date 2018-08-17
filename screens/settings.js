import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, Picker, Platform } from 'react-native';
import colors from '../utils/colors';

@translate(['settings', 'common'], { wait: true })
export default class Settings extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    // title: screenProps.t('settings:title')
  });

  constructor(props) {
    super(props);
    
    
  }
  componentDidMount(){
    console.log("mounted with: " + this.state.language);
  }
  
  state={
      language: this.props.i18n.language,
      count: 0
  }

  componentDidUpdate(){
    const { count } = this.state;

    if(Platform.OS == 'ios'){
      console.log("did update: " + this.state.language);
    } else {
      if(count == 1){
        console.log("did update: " + this.state.language);
      } else if(count > 1){
        this.setState({count: 0});
      }
    }
  }

  getCount = () => {
    const { count } = this.state;

    return count;
  }

  render() {
    const { t, i18n, navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t('settings:chooseLanguage')}</Text>
        <Picker
            selectedValue={this.state.language}
            style={styles.twoPickers}
            itemStyle={styles.twoPickerItems}
            onValueChange={(itemValue, itemIndex) => {
              var count = this.getCount();

              if(Platform.OS == 'ios'){
                this.setState({language: itemValue});
                i18n.changeLanguage(itemValue);
              } else {
                if(count==0){
                  this.setState({language: itemValue, count: ++count});
                  i18n.changeLanguage(itemValue);
                } else {
                  this.setState({count: ++count});
                }
              }
                
            }}
        >
            <Picker.Item label={t('settings:languages.english')} value="en" />
            <Picker.Item label={t('settings:languages.spanish')} value="es" />
            <Picker.Item label={t('settings:languages.portuguese')} value="pt" />
            <Picker.Item label={t('settings:languages.chinese')} value="ch" />
        </Picker>
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
  text:{
    fontSize: 25,
    margin: 20
  },
  twoPickers: {
    width: '80%',
    height: Platform.OS == 'ios' ? 132 : 45,
    backgroundColor: colors.greyLight,
    borderRadius: 10
  },
  twoPickerItems: {
    height: 132,
    borderWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 10
  },
});