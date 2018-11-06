import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, 
    TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import colors from '../utils/colors';
import { 
  FontAwesome, 
} from 'react-native-vector-icons';
import SelectMultiple from 'react-native-select-multiple';

class ToOptions extends React.Component{
    state = {
        confirmingContacts: false,
        contactType: '',
        selectedContacts: [],
        desidxMaestro: '',
        desNombre: ''
    }

    onSelectionsChange = (selectedContacts) => {
        // selectedContacts is array of { label, value }
        this.setState({ selectedContacts: selectedContacts })
    }
  
    handleConfirmContacts = () => {
        console.log('confirm contacts was pressed...');
        this.setState({confirmingContacts: true})
        this.addToList();
    }
  
    addToList = () => {
        const { selectedContacts } = this.state;
        var listOfNames = '';
        var listOfIds = '';
  
        selectedContacts.forEach((contact, index, arr) => {
            if(Object.is(arr.length - 1, index)){
                listOfNames += contact.label;
                listOfIds += contact.value;
            } else {
                listOfNames += contact.label + ';';
                listOfIds += contact.value + ';';
            }
        });
  
        this.setState({
            desidxMaestro: listOfIds,
            desNombre: listOfNames
        });
    }
  
    componentDidUpdate = () => {
        const { confirmingContacts } = this.state;
        const { navigation } = this.props;

        if(confirmingContacts){
          navigation.navigate('NewMessage', {
            desidxMaestro: this.state.desidxMaestro,
            desNombre: this.state.desNombre,
            selectedContacts: this.state.selectedContacts,
            contactType: this.state.contactType
          });
        }
    }

    componentWillMount = () => {
        const { navigation } = this.props;
        const contactType = navigation.getParam('contactType', '');
        const selectedContacts = navigation.getParam('selectedContacts', []);
        const selectedContactsCC = navigation.getParam('selectedContactsCC', []);
        const selectedContactsBCC = navigation.getParam('selectedContactsBCC', []);

        switch(contactType){
            case 'to':
            this.setState({
                contactType: contactType,
                selectedContacts: selectedContacts
            });
            case 'cc':
            this.setState({
                contactType: contactType,
                selectedContacts: selectedContactsCC
            });
            case 'bcc':
            this.setState({
                contactType: contactType,
                selectedContacts: selectedContactsBCC
            });
        }
    }

    renderLabel = (label, style) => {
        var labelArray = label.split("~");
        var name = labelArray[0] == undefined ? '' : labelArray[0];
        var title = labelArray[1] == undefined ? '' : labelArray[1];

        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{name}</Text>
                    <Text style={{fontSize: 15, fontStyle: 'italic'}}>{title}</Text>
                </View>
            </View>
        )
    }

    render(){
        const { contacts, tipoMaestro } = this.props;
        var desNombre;
          if(tipoMaestro == 'F'){
            //get list of all contacts
            var allContacts = [];
            contacts.sort((a,b) => (a.Cargo > b.Cargo) ? 1 : ((b.Cargo > a.Cargo) ? -1 : 0));
            contacts.forEach(element => {
                var name = element.NombreContacto
                .toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');


              var item = {
                label: name + '~' + element.Cargo,
                value: element.CodigoContacto
              }

              allContacts.push(item);
            });
            
            desNombre = <SelectMultiple
                            items={allContacts}
                            renderLabel={this.renderLabel}
                            selectedItems={this.state.selectedContacts}
                            onSelectionsChange={this.onSelectionsChange} />
        } else {
            desNombre = <Text>.. not F</Text>;
        }

        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white}}>
              <View style={{height: '100%', width: '100%'}}>
                <View style={styles.newMsgBar}>
                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <FontAwesome name={'close'} size={25} color={colors.blue} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.sendMsg}
                    onPress={() => this.handleConfirmContacts() }
                  >
                    <FontAwesome name={'check'} size={25} color={colors.blue} />
                  </TouchableOpacity>
                </View>    
                <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 10 }}>
                    {desNombre}
                </ScrollView>
              </View>
            </View>
        )
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
    newMsgBar:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 22,
      paddingLeft: 10,
      paddingRight: 10,
      width: '100%',
      borderWidth: 0.5,
      borderColor: colors.greyLight,
      backgroundColor: colors.greyLight,
      shadowColor: colors.black,
      shadowOffset: { width: 1.5, height: 6},
      shadowOpacity: 0.8,
      shadowRadius: 1
    },
    cancel:{
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50
    },
    sendMsg: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50
    }
});

const mapStateToProps = (state) => {
    return {
      isFetching: state.messagesReducer.isFetchingMessage,
      hasError: state.messagesReducer.messageHasError,
      token: state.loginReducer.Token,
      idColegio: state.loginReducer.Student.IdColegio,
      idxMaestro: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].IdxEstudiante : state.loginReducer.Student.IdxMaestro,
      tipoMaestro: state.loginReducer.Student.TipoMaestro,
      contacts: state.loginReducer.Contactos,
      cedula: state.loginReducer.IsFamilia ? state.loginReducer.FamilyMembers[state.loginReducer.CurrentFamilyMemberIndex].Cedula : state.loginReducer.Student.Cedula,
      messages: state.messagesReducer.messages,
      nombre: state.loginReducer.IsFamilia ? state.loginReducer.FamilyOptions[state.loginReducer.CurrentFamilyMemberIndex] : state.loginReducer.Student.Nombre
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}
  
export default translate(['message', 'common'], { wait: true})(connect(
    mapStateToProps,
    mapDispatchToProps
)(ToOptions));