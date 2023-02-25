//Change name to StudentScreen

import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Button, Icon, List, ListItem, Text, Layout} from '@ui-kitten/components';
import { InputField, ErrorMessage } from '../components';
import axios from 'axios';

const auth = Firebase.auth();
const baseUrl = 'http://127.0.0.1:8080';


// Passing configuration object to axios
axios({
  method: 'get',
  url: `${baseUrl}/student`,
}).then((response) => {
  console.log(response.data);
});


export default function LectureScreen({ route, navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
     await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };


  const [data, setData] = useState({});

  //const{itemid , ... } = route.params;

  const renderItemAccessory = (props) => (
  <Layout style={styles.container} level='1'>

    <Button style={styles.button} appearance='filled'>
      Present
    </Button>

    <Button style={styles.button} appearance='outline'>
      Absent
    </Button>

  </Layout>
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  //render array list
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.student_name}`}
      //description={`${item.class_dept}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );


  // Invoking get method to perform a GET request
  axios.get(`${baseUrl}/student`).then((response) => {
    console.log(response);
    return response
  });


   useEffect(() => { 
    axios.get('http://127.0.0.1:8080/student').then((response) => { //('http://127.0.0.1:8080/lectures' + props. ____)
      setData(response.data.data);
    });

  }, []
  ); 



  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
      </View>
      <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />
    
    <Button 
     onPress={() => navigation.navigate('Lecture')}
     style={styles.button} appearance='filled'>
     Go Back
    </Button> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 25,
    paddingBottom: 35,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  },
  button: {
    margin: 5,
  }
});
