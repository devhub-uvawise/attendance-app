import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Button, Icon, List, ListItem, Text, Input, Layout, Divider, TopNavigation} from '@ui-kitten/components';
import axios from 'axios';



const auth = Firebase.auth();
const baseUrl = 'http://127.0.0.1:8080';
const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};



// Passing configuration object to axios
axios({
  method: 'get',
  url: `${baseUrl}`,
}).then((response) => {
  console.log(response.data);
});



export default function CreateClassScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };




  
  const [ClassName, setClassName] = useState("");
  const [Department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const onChangeClassNameHandler = (ClassName) => {
    setClassName(ClassName)
  } 

  const onChangeDepartmentHandler = (Department) => {
    setDepartment(Department)

  } 

  


  const handleCreateClass = async () =>  {
    if (ClassName === ""){
      return;
    } 
    setIsLoading(true);
    try{
      const response = await axios.post(baseUrl + "/classes", {ClassName, Department});
      if (response.status === 201){
        alert( `You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setClassName('');
        setDepartment('');
      }else{
        throw new Error("An error has occured");
      }
    }catch(error){
      alert("An error has occured");
      setIsLoading(false);
    }
  };


  return (
    <Layout style={styles.container} level='1'>

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
    </View>

      <Input
        style={{
          borderRadius: 15,
          height: 60,
          fontSize: 20,
        }}
        placeholder='Class Name (e.g., CSC 4280)'
        value = {ClassName}
        editable = {!isLoading}
        onChangeText = {onChangeClassNameHandler}
      />

      <Input
        style={{
          borderRadius: 15,
          height: 100,
          fontSize: 20,
        }}
        placeholder='Department'
        value = {Department}
        editable = {!isLoading}
        onChangeText = {onChangeDepartmentHandler}
      />

    <View>
      <Button 
       onPress={() => handleCreateClass}
       style={styles.CreateClassButton} appearance='filled'>
       Create Class
     </Button> 
    </View>

    <Button 
       onPress={() => navigation.navigate('Home')}
       style={styles.button} appearance='filled'>
       Go Back
     </Button> 

    </Layout>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
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
  CreateClassButton: {
    width: '100%',
    height: 50,
    marginBottom: 650,
    justifyContent: 'center',
    alignItems: 'center'
 }
});
