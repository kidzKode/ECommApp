import { Pressable,Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';


const ProductItem = ({item}) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();


  const [addedToCart, setAddedToCart] = useState(false)


  const addItemToCart = (item)=>{
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 6000)
  }

  return (
    <Pressable style={{marginHorizontal:20,marginVertical:25}}>
      <Image style={{width:150,height:150, resizeMode:'contain'}} source={{uri:item?.image}}/>

      <Text numberOfLines={1} style={{width:150,marginTop:10}}>
        {item?.title}
      </Text>

      <View style={{marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:15,fontWeight:'bold'}}> ₹{item?.price}</Text>
        <Text style={{color:'#FFC72C',fontWeight:'bold'}}>{item?.rating?.rate} rating</Text>
        {/* <Text>{item?.price}</Text>
        <Text>{item?.price}</Text> */}
      </View>

        <Pressable 
        onPress={()=>addItemToCart(item)}
        style={{backgroundColor:"#FFC72C",
        padding:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
          marginTop:10
        }}>
           {addedToCart ? (
          <View>
            <Text> Added to cart </Text>
          </View>

        ) : (
          <Text> Add to cart </Text>

        )}
        </Pressable>

    </Pressable>
    
    
  )
}

export default ProductItem

const styles = StyleSheet.create({})