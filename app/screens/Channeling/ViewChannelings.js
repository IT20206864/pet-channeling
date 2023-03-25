import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../config';
import { commonStyles, channelingStyles } from '../../styles';
import { useToast } from "react-native-toast-notifications";
import LoadingIndicator from '../../components/LoadingIndicator';

export default function ViewChannelings({ navigation }) {
    const [channelings, setChannelings] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    useEffect(() => {
        setLoading(true);
        const colRef = collection(db, 'channelings');
        onSnapshot(colRef, (QuerySnapshot) => {
            const channeling = [];
            QuerySnapshot.forEach((doc) => {

                console.log(doc.data())
                const { petName, description, date, vetName } = doc.data();
                console.log(date);
                let cDate = new Date(date).toString()
                const id = doc.id;
                channeling.push({
                    id,
                    petName,
                    description,
                    cDate,
                    vetName,
                });
            });
            setChannelings(channeling);
            setLoading(false);
        });
    }, []);

    //confirmation dialog box
    const showConfirmDialog = (id) => {
        console.log(id);
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to Remove this Booking? This action cannot be undone!',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        deleteChanneling(id);
                    },
                },
                {
                    text: 'No',
                },
            ]
        );
    };

    // function to remove channeling
    async function deleteChanneling(id) {
        const ref = doc(db, 'channelings', id);
        await deleteDoc(ref)
            .then(() => {
                toast.show("Reservation Cancelled !", {
                    type: "danger",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    }
    return (
        <>
            <Text style={[channelingStyles.header, { marginTop: 20, marginBottom: 10 }]}>My Channelings</Text>
            <ScrollView style={channelingStyles.scrollContainer}>
                {loading ? <LoadingIndicator /> : null}
                {channelings.map((channeling) => {
                    return (
                        <View key={channeling.id} style={channelingStyles.chanellingsContainer}>
                            <View style={channelingStyles.cardDetails}>
                                <Text key={channeling.id} style={channelingStyles.cardTitle}>
                                    {channeling.petName}
                                </Text>
                                <Text key={channeling.id} style={channelingStyles.cardSubTitle1}>
                                    {channeling.description}
                                </Text>
                                <Text key={channeling.id} style={channelingStyles.cardSubTitle2}>
                                    {channeling.cDate}
                                </Text>
                            </View>
                            <View style={channelingStyles.btnLayout}>
                                <View style={channelingStyles.iconsContainer}>
                                    <Pressable onPress={() => navigation.navigate('Update Channeling', { channeling })}>
                                        <View style={channelingStyles.iconContainer}>
                                            <Entypo name="edit" size={24} color="black" />
                                        </View>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            showConfirmDialog(channeling.id);
                                        }}
                                    >
                                        <View style={channelingStyles.iconContainer}>
                                            <AntDesign name="delete" size={24} color="red" />
                                        </View>
                                    </Pressable>
                                </View>
                                <Pressable onPress={() => navigation.navigate('Reviews', { channeling })}>
                                    <View style={channelingStyles.ratingContainer}>

                                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>Rate</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    )
                })
                }
            </ScrollView>
        </>
    )
}