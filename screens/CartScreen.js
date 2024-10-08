import { Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';


const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    //   console.log('cart',cart)
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    //  console.log(total)

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    }

    const decreaseQuanity = (item) => {
        dispatch(decrementQuantity(item))
    }

    const DeleteItem = (item) => {
        dispatch(removeFromCart(item))
    }



    return (
        <ScrollView style={{ marginTop: 55, flex: 4, backgroundColor: 'white' }}>
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

            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{total}</Text>
            </View>
            <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

            <Pressable onPress={()=>navigation.navigate('Confirm')}
                style={{
                    backgroundColor: '#FFC72C', padding: 10, borderRadius: 5, justifyContent: 'center',
                    marginHorizontal: 10, marginTop: 10, alignItems: 'center'
                }}>
                <Text>Proceed to buy ({cart.length}) items</Text>
            </Pressable>

            <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 16 }} />

            <View style={{ marginHorizontal: 10 }}>
                {cart.map((item, index) => (
                    <View style={{
                        backgroundColor: 'white', marginVertical: 10,
                        borderWidth: 2, borderLeftWidth: 0, borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomColor: '#F0F0F0'
                    }} key={index}>
                        <Pressable style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Image style={{ width: 140, height: 140, resizeMode: 'contain' }} source={{ uri: item?.image }} />
                            </View>

                            <View>
                                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}>₹{item?.price}</Text>
                                <Text style={{ color: 'green' }}>In Stock</Text>

                            </View>
                        </Pressable>

                        <Pressable style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7 }}>
                                {item?.quantity > 1 ? (<Pressable onPress={() => decreaseQuanity(item)} style={{ backgroundColor: '#D8D8D8', padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderTopRightRadius: 6, borderBottomRightRadius: 6, }}>
                                    <Feather name="minus" size={24} color="black" /></Pressable>)
                                    :
                                    (<Pressable onPress={() => DeleteItem(item)} style={{ backgroundColor: '#D8D8D8', padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderTopRightRadius: 6, borderBottomRightRadius: 6, }}>
                                        <MaterialIcons name="delete" size={24} color="black" /></Pressable>)
                                }


                                <Pressable style={{ backgroundColor: 'white', paddingHorizontal: 18, paddingVertical: 6 }}>
                                    <Text>
                                        {item?.quantity}
                                    </Text>
                                </Pressable>
                                {/* plus button */}
                                <Pressable onPress={() => increaseQuantity(item)}
                                    style={{ backgroundColor: '#D8D8D8', padding: 7, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderTopRightRadius: 6, borderBottomRightRadius: 6, }}>
                                    <Text>
                                        <Feather name="plus" size={24} color="black" />
                                    </Text>
                                </Pressable>
                            </View>
                            <Pressable onPress={() => DeleteItem(item)} style={{ backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 10, borderWidth: 0.6, borderRadius: 5, borderColor: '#C0C0C0' }}>
                                <Text>
                                    Delete
                                </Text>
                            </Pressable>
                        </Pressable>

                        <Pressable style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Pressable style={{ backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 10, borderWidth: 0.6, borderRadius: 5, borderColor: '#C0C0C0' }}>
                                <Text>Save for later</Text>
                            </Pressable>

                            <Pressable style={{ backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 10, borderWidth: 0.6, borderRadius: 5, borderColor: '#C0C0C0' }}>
                                <Text>See More Like this</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default CartScreen

const styles = StyleSheet.create({})