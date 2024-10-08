import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import Entypo from '@expo/vector-icons/Entypo';
import  FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const ConfirmationScreen = () => {
    const steps = [
        { title: 'Address', content: 'address Form' },
        { title: 'Delivery', content: 'Delivery Options' },
        { title: 'Pyment', content: 'Payment Details' },
        { title: 'Place Order', content: 'order Summary ' },
    ];

    const [currentStep, setCurrentStep] = useState(0)

    const [addresses, setAddresses] = useState([])
    const { userId, setUserId } = useContext(UserType);
    //  for address
    const [option, setOption] = useState(false);
    // for selcted method payment
    const [selectedOption, setSelectedOption] = useState('');

    const cart = useSelector((state) => state.cart.cart);
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
     
    const dispatch = useDispatch();


    useEffect(() => {
        if (userId) {
            fetchAddresses();
        }
    }, [userId]);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://192.168.1.4:8000/addresses/${userId}`)

            const { addresses } = response.data
            setAddresses(addresses)
            // console.log('address', addresses);
        }
        catch (err) {
            console.log('error', err)
        }
    }

    // console.log('address-',addresses)
    //to hold addressess
    const [selectedAddress, setSelectedAddress] = useState("");
    const navigation = useNavigation();
    const handlePlaceOrder = async()=>{
        try{
            // console.log('shipping adress--',selectedAddress)
            const orderData = {
                userId:userId,
                cartItems:cart,
                totalPrice:total,
                shippingAddress:selectedAddress,
                paymentMethod:selectedOption,   

            }
            // console.log('shipping adress--',shippingAddress)


            const response = await axios.post('http://192.168.1.4:8000/orders',orderData)
            if(response.status ===200){
                navigation.navigate('Order');
                dispatch(cleanCart());
                console.log('order created successfully',response.data.order)
            }
            else{
                console.log('error',error)
            }

        }
        catch(err){
            console.log("error",err);
        }

    }
    //online payment
    const pay= async ()=>{
        try{
            const options = {
                description: "Adding To Wallet",
                currency: "INR",
                name: "Amazon",
                key: "rzp_test_gr8uoGAozNrqJT",
                amount: total * 100,
                prefill: {
                  email: "void@razorpay.com",
                  contact: "9191919191",
                  name: "RazorPay Software",
                },
                theme: { color: "#F37254" },
              };
              
              const data = await RazorpayCheckout.open(options)
              
           
              console.log("data--",data)
              const orderData = {
                userId:userId,
                cartItems:cart,
                totalPrice:total,
                shippingAddress:selectedAddress,
                paymentMethod:"card",   

            }
            const response = await axios.post('http://192.168.1.4:8000/orders',orderData)
            if(response.status ===200){
                navigation.navigate('Order');
                dispatch(cleanCart());
                console.log('order created successfully',response.data.order)
            }
            else{
                console.log('error',error)
            }

        }
        catch(err){
            console.log("error",err);
        }
    }
    return (
        <ScrollView style={{ marginTop: 55 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}>

                    {steps?.map((step, index) => (
                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {index > 0 && (
                                <View style={[{ flex: 1, height: 2, backgroundColor: 'green' }, index
                                    <= currentStep && { backgroundColor: 'green' }]} />
                            )}

                            <View style={[
                                {
                                    width: 30, height: 30, borderRadius: 15, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center'
                                }, index < currentStep && { backgroundColor: 'green' }
                            ]}>
                                {index < currentStep ? (
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}> &#10003;</Text>
                                ) :
                                    (
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{index + 1}</Text>

                                    )
                                }
                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 8 }}>{step?.title}</Text>

                        </View>
                    ))}
                </View>
            </View>
            {currentStep == 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select Delivery address</Text>
                    <Pressable>
                        <Pressable>
                            {addresses?.map((item, index) => (
                                <Pressable key={index} style={{
                                    borderWidth: 1, borderColor: '#D0D0D0', padding: 10,
                                    gap: 5, flexDirection: 'column', paddingBottom: 7, flexDirection: 'row',
                                    alignItems: 'center', marginVertical: 7, borderRadius: 6
                                }}>
                                    {selectedAddress && selectedAddress._id === item?._id ? (
                                        <FontAwesome6 name="dot-circle" size={24} color="#008397" />
                                    ) : (
                                        <Entypo onPress={() => setSelectedAddress(item)} name="circle" size={24} color="black" />


                                    )}

                                    <View style={{ marginLeft: 6, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                {item?.name}
                                            </Text>
                                            <Entypo name="location-pin" size={24} color="red" />
                                        </View>

                                        <Text style={{ fontSize: 15, color: "#181818" }}>
                                            {item?.houseNo}, {item?.landmark}
                                        </Text>

                                        <Text style={{ fontSize: 15, color: "#181818" }}>
                                            {item?.street}
                                        </Text>

                                        <Text style={{ fontSize: 15, color: "#181818" }}>
                                            India, Bangalore
                                        </Text>

                                        <Text style={{ fontSize: 15, color: "#181818" }}>
                                            phone No : {item?.mobileNo}
                                        </Text>

                                        <Text style={{ fontSize: 15, color: "#181818" }}>
                                            pin code : {item?.postalCode}
                                        </Text>

                                        <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 7 }}>
                                            <Pressable style={{ backgroundColor: "#f5f5f5", paddingHorizontal: 10, paddingVertical: 6, borderWidth: 0.9, borderColor: '#D0D0D0' }}>
                                                <Text>Edit</Text>
                                            </Pressable>

                                            <Pressable style={{ backgroundColor: "#f5f5f5", paddingHorizontal: 10, paddingVertical: 6, borderWidth: 0.9, borderColor: '#D0D0D0' }}>
                                                <Text>Remove</Text>
                                            </Pressable>

                                            <Pressable style={{ backgroundColor: "#f5f5f5", paddingHorizontal: 10, paddingVertical: 6, borderWidth: 0.9, borderColor: '#D0D0D0' }}>
                                                <Text>Set as default</Text>
                                            </Pressable>
                                        </View>

                                        <View>
                                            {selectedAddress && selectedAddress._id === item?._id && (
                                                <Pressable onPress={() => setCurrentStep(1)}
                                                    style={{ backgroundColor: '#008397', padding: 10, borderRadius: 20, justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
                                                    <Text style={{ textAlign: 'center', color: 'white' }}>Deliver to this address</Text>

                                                </Pressable>
                                            )}
                                        </View>

                                    </View>
                                </Pressable>
                            ))}
                        </Pressable>
                    </Pressable>
                </View>
            )}



            {currentStep === 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chose your delivery option</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', backgroundColor: 'white',
                        padding: 8, gap: 7,
                        borderColor: '#D0D0D0',
                        borderWidth: 1, marginTop: 10
                    }}>
                        {/* option is true show dot circle otherwise blank circle */}
                        {
                            option ? (<FontAwesome6 name="dot-circle" size={24} color="#008397" />
                            ) : (
                                <Entypo onPress={() => setOption(!option)} name="circle" size={24} color="gray" />


                            )
                        }

                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: 'green', fontWeight: '500' }}>
                                Tommorow by 10pm
                            </Text>{" "}
                            -FREE delivery with our Prime membership
                        </Text>
                    </View>
                    <Pressable onPress={() => setCurrentStep(2)} style={{ backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <Text>
                            Continue
                        </Text>
                    </Pressable>
                </View>
            )}

            {currentStep === 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Select your payment method</Text>

                    <View style={{
                        padding: 10, backgroundColor: 'white',
                        flexDirection: 'row', marginTop: 10, borderWidth: 1, borderColor: '#D0D0D0',
                        gap: 7, alignItems: 'center'
                    }}>
                        {selectedOption == 'cash' ? (
                            <FontAwesome6 name="dot-circle" size={20} color="#008397"></FontAwesome6>
                        ) : (
                            <Entypo onPress={() => setSelectedOption("cash")} name="circle" size={20} color="gray" />

                        )}
                        <Text>Cash on Delivery</Text>
                    </View>

                    <View style={{
                        padding: 10, backgroundColor: 'white',
                        flexDirection: 'row', marginTop: 10, borderWidth: 1, borderColor: '#D0D0D0',
                        gap: 7, alignItems: 'center'
                    }}>
                        {selectedOption == 'card' ? (
                            <FontAwesome6 name="dot-circle" size={20} color="#008397"></FontAwesome6>

                        ) : (
                            <Entypo onPress={() => {
                                setSelectedOption("card")
                                Alert.alert('UPI/Debit card',"Pay online",[
                                    {
                                        text:"Cancel",
                                        onPress:()=>console.log("Cancel is pressed")
                                    },
                                    {
                                        text:"OK", 
                                        onPress: ()=>pay()
                                    }
                                ])
                            }} name="circle" size={20} color="gray" />

                        )}
                        <Text>UPI / Credit or debit cart </Text>
                    </View>

                    <Pressable onPress={() => setCurrentStep(3)} style={{ backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <Text>
                            Continue
                        </Text>
                    </Pressable>
                </View>

            )}

            {currentStep === 3 && selectedOption === 'cash' && (
                 <View style={{ marginHorizontal: 20 }}>
                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
       
                 <View
                   style={{
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "space-between",
                     gap: 8,
                     backgroundColor: "white",
                     padding: 8,
                     borderColor: "#D0D0D0",
                     borderWidth: 1,
                     marginTop: 10,
                   }}
                 >
                   <View>
                     <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                       Save 5% and never run out
                     </Text>
                     <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                       Turn on auto deliveries
                     </Text>
                   </View>
       
                   <AntDesign name="right" size={24} color="black" />
                 </View>
       
                 <View
                   style={{
                     backgroundColor: "white",
                     padding: 8,
                     borderColor: "#D0D0D0",
                     borderWidth: 1,
                     marginTop: 10,
                   }}
                 >
                   <Text>Shipping to {selectedAddress?.name}</Text>
       
                   <View
                     style={{
                       flexDirection: "row",
                       alignItems: "center",
                       justifyContent: "space-between",
                       marginTop: 8,
                     }}
                   >
                     <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                       Items
                     </Text>
       
                     <Text style={{ color: "gray", fontSize: 16 }}>₹{total}</Text>
                   </View>
       
                   <View
                     style={{
                       flexDirection: "row",
                       alignItems: "center",
                       justifyContent: "space-between",
                       marginTop: 8,
                     }}
                   >
                     <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                       Delivery
                     </Text>
       
                     <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
                   </View>
       
                   <View
                     style={{
                       flexDirection: "row",
                       alignItems: "center",
                       justifyContent: "space-between",
                       marginTop: 8,
                     }}
                   >
                     <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                       Order Total
                     </Text>
       
                     <Text
                       style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                     >
                       ₹{total}
                     </Text>
                   </View>
                 </View>
       
                 <View
                   style={{
                     backgroundColor: "white",
                     padding: 8,
                     borderColor: "#D0D0D0",
                     borderWidth: 1,
                     marginTop: 10,
                   }}
                 >
                   <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>
       
                   <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                     Pay on delivery (Cash)
                   </Text>
                 </View>
       
                 <Pressable
                   onPress={handlePlaceOrder}
                   style={{
                     backgroundColor: "#FFC72C",
                     padding: 10,
                     borderRadius: 20,
                     justifyContent: "center",
                     alignItems: "center",
                     marginTop: 20,
                   }}
                 >
                   <Text>Place your order</Text>
                 </Pressable>
               </View>
             )}

        </ScrollView >
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})