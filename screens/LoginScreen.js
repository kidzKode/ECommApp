import { StyleSheet, Text, View, SafeAreaView,Image, KeyboardAvoidingView, TextInput, Pressable,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SERVER_URL from "../config";


const LoginScreen = () => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const navigation = useNavigation();

    // check user is login or not
    useEffect(()=>{
      const checkLoginStatus = async ()=>{
        try{
          const token = await AsyncStorage.getItem('authToken');
          // console.log(token)
           if(token){
            navigation.replace('Main');
           }
  

        }
        catch(err){
          console.log('error message',err);
        }
      };
      checkLoginStatus();
    },[]);

    
    const handleLogin=()=>{
      const user ={
        email:email,
        password: password
      }
      axios
      .post(`${SERVER_URL}/login`, user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        console.log("loginf toke->",token)
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
     }



  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white', alignItems:'center'}}>
     <View>
     <Image
          style={{width:150, height:100,marginTop:25}}
          source={  require('../assets/logo.jpg') }
      />
     </View>
    
    <KeyboardAvoidingView>
        <View style={{alignItems:'center'}}>
             <Text style={{fontSize:17, fontWeight:'bold', marginTop:25,color:"#041E42"}}>
                Login in to your account
             </Text>
        </View>

        <View style={{marginTop:70, padding:'10'}}>
            <View 
              style={{flexDirection:'row', 
                alignItems:'center',
                gap:10,
                paddingVertical:10,
                backgroundColor:'#D0D0D0',
                borderRadius:5,
                marginTop:30
                }}>
            <MaterialIcons style={{marginLeft:10}} name="email" size={24} color="gray" />
             <TextInput style={{color:'gray', marginVertical:10, width:270, fontSize:email ? 16 :16}}
              placeholder='Enter your email'
              value={email}
              onChangeText={(text)=>setEmail(text)}
               />
            </View>
        </View>

        <View style={{marginTop:30}} >
        <View 
              style={{flexDirection:'row', 
                alignItems:'center',
                gap:10,
                paddingVertical:10,
                backgroundColor:'#D0D0D0',
                borderRadius:5,
                marginTop:30
                }}
               
                >
          <EvilIcons style={{marginLeft:10}} name="lock" size={24} color="gray" />
             <TextInput 
             value={password}
             onChangeText={(text)=>setPassword(text)}
             secureTextEntry={true}
            style={{color:'gray', marginVertical:10, width:270,fontSize:password ?16:16}} placeholder='Enter your password' />
            </View> 
        </View>

        {/* --------------------------------------------- */}
        <View style={{marginTop:12,flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
            <Text>Keep me logged in</Text>
            <Text style={{color:'#007FFF',fontWeight:'500'}}>Forgot password</Text>
        </View>

        <View style={{marginTop:80}}>
                 <Pressable 
                  onPress={handleLogin}
                   style={{
                    width:175, 
                    backgroundColor:'#FEBE10',
                    borderRadius:6,
                    marginLeft:"auto",
                    marginRight:"auto",
                    padding:15}}>
                    <Text style={{textAlign:'center',color:'white', fontWeight:'bold',fontSize:16

                     }}>Login</Text>

                     
                 </Pressable>
                 <Pressable onPress={()=>navigation.navigate("Register")} style={{marginTop:13}}>
                     <Text style={{textAlign:'center', color:'gray'}}>
                        Don't have an account? Sign Up
                     </Text>
                          
                 </Pressable>
        </View>

    </KeyboardAvoidingView>

    </SafeAreaView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({})