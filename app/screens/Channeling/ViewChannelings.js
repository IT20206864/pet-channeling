import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../config';
import { commonStyles, channelingStyles } from '../../styles';
export default function ViewChannelings({ navigation }) {
    const [channelings, setChannelings] = useState([]);

    useEffect(() => {
        const colRef = collection(db, 'channelings');
        onSnapshot(colRef, (QuerySnapshot) => {
            const channeling = [];
            QuerySnapshot.forEach((doc) => {
                console.log(doc.id)
                const { petName, description, date, vetName } = doc.data();
                let cDate = date.toDate().toString()
                const id = doc.id;
                channeling.push({
                    id,
                    petName,
                    description,
                    cDate,
                    vetName
                });
            });
            setChannelings(channeling);
        });
    }, []);

    //confirmation dialog box
    const showConfirmDialog = (id) => {
        console.log(id);
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to Delete this Staff Member? This action cannot be undone!',
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
        console.log(id)

        const ref = doc(db, 'channeling', id);
        await deleteDoc(ref)
            .then(() => {
                alert('Reservation Deleted Successfully!');
            })
            .catch((error) => {
                alert(error.message);
            });
    }
    return (
        <>
            <Text style={channelingStyles.header}>My Channelings</Text>
            <ScrollView>
                {channelings.map((channeling) => {
                    return (
                        <View key={channeling.id} style={channelingStyles.chanellingsContainer}>
                            <View style={channelingStyles.todoDetails}>
                                <Text key={channeling.id} style={channelingStyles.cardTitle}>
                                    {channeling.petName}
                                </Text>
                                <Text key={channeling.id} style={channelingStyles.cardSubTitle}>
                                    {channeling.description}
                                </Text>
                                <Text key={channeling.id} style={channelingStyles.cardSubTitle}>
                                    {channeling.cDate}
                                </Text>
                            </View>
                            <View style={channelingStyles.iconsContainer}>
                                <Pressable onPress={() => navigation.navigate('Edit Channeling', { channeling })}>
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
                                <Pressable onPress={() => navigation.navigate('Reviews', { channeling })}>
                                    <View style={channelingStyles.iconContainer}>
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