import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import colors from '../utils/colors';
import { 
  Entypo
} from 'react-native-vector-icons';
import gradeColor from '../utils/gradeColor';

@translate(['gradesDetail', 'common'], { wait: true })
export default class GradesDetail extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.class,
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

  render() {
    const { t, i18n } = this.props;
    const { assignments } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={{height: '100%'}} >
          <View style={styles.notas}>
            <View style={styles.grade}>
              <Text style={styles.header}>
                {t('gradesDetail:headers.assignment')}
              </Text>
            </View>
            <View style={styles.grade}>
              <Text style={styles.header}>
              {t('gradesDetail:headers.grade')}
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {
              assignments.map((assignment, index) => {
                  return (
                    <View 
                      style={styles.notas}
                      key={index}
                    >
                      <View style={styles.class}>
                        <Text style={styles.data}>
                          {assignment.item}
                        </Text>
                      </View>
                      <View style={styles.grade}>
                        <Text style={{...gradeColor[Math.floor(assignment.grade)]}}>
                          {assignment.grade.toFixed(1)}
                        </Text>
                      </View>
                      <View style={styles.divider}></View>
                    </View>
                  )
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
  divider: {
    marginTop: 30,
    height: 1,
    backgroundColor: colors.greyLight,
    width: '100%'
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
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20
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