import React from 'react';
import { translate, Trans } from 'react-i18next';
import { StyleSheet, Text, View, Button } from 'react-native';

@translate(['print', 'common'], { wait: true })
export default class Print extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('print:title')
  });

  render() {
    const { t, i18n } = this.props;

    return (
      <View style={styles.container}>
        <Text>print Screen</Text>
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