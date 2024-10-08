import { StyleSheet, Text, View, SafeAreaView,Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const RegisterScreen = () => {


  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[name,setName] = useState('');

  const navigation = useNavigation();
  const handleRegister = ()=>{
    const user = {
      name:name,
      email:email,
      password: password,
    }
    //send a post request to the backend api
    axios.post('http://192.168.1.4:8000/register',user).then((response)=>{
      console.log(response)
      Alert.alert('Registration successfull',"You have register successfull");
      setName("")
      setEmail("")
      setPassword("")
    }).catch((error)=>{
      Alert.alert('Registration Error',"an erorr occured during registration")
      console.log('registration failed',error) 
    })
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
               Register to your account
            </Text>
       </View>
       <View style={{marginTop:70, padding:'10'}}>
           <View 
             style={{flexDirection:'row', 
               alignItems:'center',
               gap:10,
               paddingVertical:'10',
               backgroundColor:'#D0D0D0',
               borderRadius:5,
               marginTop:'30'
               }}>
          <FontAwesome style={{marginLeft:10}} name="user" size={24} color="gray" />
            <TextInput style={{color:'gray', marginVertical:15, width:270, fontSize:name ? 16 :16}}
             placeholder='Enter your full name'
             value={name}
             onChangeText={(text)=>setName(text)}
              />
           </View>
       </View>

       <View style={{marginTop:30, padding:'10'}}>
           <View 
             style={{flexDirection:'row', 
               alignItems:'center',
               gap:10,
               paddingVertical:'10',
               backgroundColor:'#D0D0D0',
               borderRadius:5,
               marginTop:'30'
               }}>
           <MaterialIcons style={{marginLeft:10}} name="email" size={24} color="gray" />
            <TextInput style={{color:'gray', marginVertical:15, width:270, fontSize:email ? 16 :16}}
             placeholder='Enter your email'
             value={email}
             onChangeText={(text)=>setEmail(text)}
              />
           </View>
       </View>

       <View style={{marginTop:30,}} >
       <View 
             style={{flexDirection:'row', 
               alignItems:'center',
               gap:10,
               paddingVertical:'10',
               backgroundColor:'#D0D0D0',
               borderRadius:5,
               marginTop:'30'
               }}

              
               >
         <EvilIcons style={{marginLeft:10}} name="lock" size={24} color="gray" />
            <TextInput style={{color:'gray', marginVertical:15, width:270,fontSize:password ?16:16}}
             placeholder='Enter your password'
             value={password}
             onChangeText={(text)=>setPassword(text)}
             secureTextEntry={true}
             />
           </View> 
       </View>

       {/* --------------------------------------------- */}
       <View style={{marginTop:12,flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
           <Text>Keep me logged in</Text>
           <Text style={{color:'#007FFF',fontWeight:'500'}}>Forgot password</Text>
       </View>

       <View style={{marginTop:80}}>
                <Pressable
                 onPress={handleRegister} 
                   style={{
                   width:175, 
                   backgroundColor:'#FEBE10',
                   borderRadius:6,
                   marginLeft:"auto",
                   marginRight:"auto",
                   padding:15}}>
                   <Text style={{textAlign:'center',color:'white', fontWeight:'bold',fontSize:16

                    }}>Register</Text>

                    
                </Pressable>
                <Pressable onPress={()=>navigation.goBack()} 
                style={{marginTop:13}}
                >
                    <Text style={{textAlign:'center', color:'gray',fontSize:16}}>
                       Already have an account? Sign In
                    </Text>
                         
                </Pressable>
       </View>

   </KeyboardAvoidingView>

   </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})