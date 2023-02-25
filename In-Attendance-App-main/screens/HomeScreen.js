import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Button, Icon, List, ListItem, Text, Divider, TopNavigation} from '@ui-kitten/components';
import axios from 'axios';


const auth = Firebase.auth();
const baseUrl = 'http://127.0.0.1:8080';



// Passing configuration object to axios
axios({
  method: 'get',
  url: `${baseUrl}/classes`,
}).then((response) => {
  console.log(response.data);
});


export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  // Invoking get method to perform a GET request
  axios.get(`${baseUrl}/classes`).then((response) => {
    console.log(response);
    return response
  });


   useEffect(() => { 
    axios.get('http://127.0.0.1:8080/classes').then((response) => {
      setData(response.data.data);
      console.log("branch showing");
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
       <Button 
       onPress={() => navigation.navigate('Create Class')}
       style={styles.AddClassButton} appearance='filled'>
       Add A Class
     </Button> 

     <Button
       onPress={() => navigation.navigate('Create Class')}
       style={styles.RemoveClassButton} status= 'danger' appearance='filled'>
       Remove A Class
     </Button> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 100,
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
  RemoveClassButton: {
    width: '45%',
    height: 50,
    bottom: 40,
    right: 20,
    position: 'absolute'
  },
  AddClassButton: {
    width: '45%',
    height: 50,
    bottom: 40,
    left: 20,
    position: 'absolute'
  }
});
