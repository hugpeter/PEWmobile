import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, WebView } from 'react-native';
import { connect } from 'react-redux';
import colors from '../utils/colors';
import NavigationStateNotifier from '../NavigationStateNotifier';

class DocumentScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.document.Descripcion,
    headerStyle: {
      backgroundColor: colors.white
    },
    headerTintColor: colors.blue,
  });

  constructor (props) {
    super(props);

    NavigationStateNotifier.newListener(
      this,
      () => {
        // anything else that you'd like to do when this screen is navigated to
        console.log('message screen was navigated to');
        
      },
      () => {
        // anything else that you'd like to do when this screen is navigated off of
        console.log('message screen was navigated away from');
        
      }
    );
    
  }

  componentDidMount = () => {

  }

  render() {
    const { t, i18n, navigation } = this.props;
    const { document } = this.props.navigation.state.params;
    
    var cleanHtml = document.documentoHtml.replace(new RegExp('&amp;', 'g'), '&');
    cleanHtml = cleanHtml.replace(new RegExp('&lt;', 'g'), '<');
    cleanHtml = cleanHtml.replace(new RegExp('&gt;', 'g'), '>');
    cleanHtml = cleanHtml.replace(new RegExp('&quot;', 'g'), '"');
    // cleanHtml = cleanHtml.replace(new RegExp('', 'g'), '');
    console.log(cleanHtml);

    return (
      <WebView
        originWhitelist={["*"]}
        source={{html: cleanHtml}}
            />  
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default translate(['documents', 'common'], { wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentScreen));