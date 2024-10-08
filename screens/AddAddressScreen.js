import { ScrollView, StyleSheet, TextInput, Text, Pressable, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';

const AddAddressScreen = () => {

    const navigation = useNavigation();

    //to show saved address
    const [addresses, setAddresses] = useState([]);

    const { userId, setUserId } = useContext(UserType);
    // console.log('userid:-', userId)


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
    //referesh the address when the component come to focus ie basically wehn we navigate back
    useFocusEffect(
        useCallback(()=>{
            fetchAddresses();
        },[])
    )
    // console.log('userid:', userId)
    // console.log('addresses:-', addresses)

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={{ backgroundColor: '#00CED1', padding: 10, flexDirection: "row", alignItems: 'center' }}>
                <Pressable

                    style={{
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

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your address</Text>
                <Pressable
                    onPress={() => navigation.navigate('Add')}
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 10, borderColor: '#D0D0D0',
                        borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7,
                        paddingHorizontal: 5
                    }}>
                    <Text>Add a new Address</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </Pressable>

                {/* All the added addresss */}
                <Pressable>
                    {addresses?.map((item, index) => (
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderColor: "#D0D0D0",
                                padding: 10,
                                flexDirection: "column",
                                gap: 5,
                                marginVertical: 10,
                            }}
                            key={index}
                        >
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

                            <View style={{flexDirection:"row",alignItems:'center',gap:10,marginTop:7}}>
                                <Pressable style={{backgroundColor:"#f5f5f5",paddingHorizontal:10,paddingVertical:6,borderWidth:0.9,borderColor:'#D0D0D0'}}>
                                    <Text>Edit</Text> 
                                </Pressable>

                                <Pressable style={{backgroundColor:"#f5f5f5",paddingHorizontal:10,paddingVertical:6,borderWidth:0.9,borderColor:'#D0D0D0'}}>
                                    <Text>Remove</Text> 
                                </Pressable>

                                <Pressable style={{backgroundColor:"#f5f5f5",paddingHorizontal:10,paddingVertical:6,borderWidth:0.9,borderColor:'#D0D0D0'}}>
                                    <Text>Set as default</Text> 
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({})