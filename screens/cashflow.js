import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

@translate(['cashflow', 'common'], { wait: true })
export default class Cashflow extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('cashflow:title')
  });

  render() {
    const { t, i18n } = this.props;

    return (
      <View style={styles.container}>
        <Text>cashflow Screen</Text>
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
  bold: {
    fontWeight: 'bold'
  },
  light: {
    fontWeight: 'normal'
  }
});