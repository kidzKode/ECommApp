import { View, Text, ScrollView, Pressable, TextInput, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductInfoScreen = () => {

  const route = useRoute();
  const { width } = Dimensions.get('window');

  const [addedToCart, setAddedToCart] = useState(false)
  const navigation = useNavigation()
  const height = (width * 100) / 100;

  //ad to cart
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 6000)

  }

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart)


  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: 'white' }} showsHorizontalScrollIndicator={false}>

      <View style={{ backgroundColor: '#00CED1', padding: 10, flexDirection: "row", alignItems: 'center' }}>
        <Pressable style={{
          flexDirection: 'row', alignItems: 'center',
          marginHorizontal: 7, gap: 10,
          backgroundColor: 'white',
          borderRadius: 3,
          height: 38,
          flex: 1
        }}>
          <AntDesign style={{ paddingLeft: 20 }} name="search1" size={24} color="black" />
          <TextInput placeholder='search Shopcart.in'></TextInput>
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground style={{ width, height, marginTop: 25, resizeMode: 'contain' }} key={index} source={{ uri: item }}>
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

              <View style={{
                width: 40, height: 40,
                borderRadius: 20, backgroundColor: '#c60c30',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 12 }}>
                  20% off
                </Text>
              </View>

              {/* share option */}
              <View style={{
                width: 40, height: 40,
                borderRadius: 20, backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}>
                <MaterialCommunityIcons name="share-variant" size={24} color="black" />

              </View>

            </View>
            <View style={{
              marginTop: 'auto',
              marginLeft: 20,
              marginRight: 10,
              width: 40, height: 40,
              borderRadius: 20, backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }} >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          ₹{route?.params?.price}</Text>

      </View>
      <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

      <View style={{
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {route?.params.color}  </Text>
      </View>

      <View style={{
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}> {route?.params.size}  </Text>
      </View>

      <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

      <View style={{ padding: 10, fontWeight: 'bold' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>Total: ₹{route?.params.price}</Text>
        <Text style={{ color: '#00CED1' }}>Free delevery Tomorrow by 3 PM. Order within 10 hrs 30 min:</Text>
      </View>

      <View style={{ flexDirection: 'row',marginLeft:10, marginVertical: 5, alignItems: 'center', gap: 5 }}>
        <FontAwesome6 name="location-dot" size={24} color="black" />
        <Text style={{ fontSize: 15, fontWeight: '500' }}> Delever To Ravendra- Rewa 486001</Text>

      </View>
      <Text style={{ color: 'green', marginLeft:10,marginHorizontal: 10, fontWeight: '500' }}>In Stock</Text>

      <Pressable onPress={() => addItemToCart(route?.params.item)} style={{
        backgroundColor: '#ffc72c', padding: 10, borderRadius: 20,
        justifyContent: 'center', alignItems: 'center', marginHorizontal: 10
      }}>
        {addedToCart ? (
          <View>
            <Text> Added to cart </Text>
          </View>

        ) : (
          <Text> Add to cart </Text>

        )}
      </Pressable>

      <Pressable style={{
        backgroundColor: '#ffac1c', padding: 10, borderRadius: 20, 
        marginBottom:10,
        justifyContent: 'center', marginHorizontal: 10, marginHorizontal: 10, alignItems: 'center', marginTop: 10
      }}>
        <Text>
          Buy now
        </Text>
      </Pressable>

    </ScrollView>
  )
}

export default ProductInfoScreen