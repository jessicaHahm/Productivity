import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default function SettingsScreen({ navigation }) {
    const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
    return(
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.titleWrapper}>
                <FontAwesome name='cog' style={styles.cogIcon} />
                <Text style={styles.title}>Settings</Text>
            </View>

            {/* Header */}
            <View style={styles.headerWrapper}>
                <View style={styles.profileIcon} />
                <Text style={styles.header}>User Name</Text>
            </View>
            <View style={styles.divider} />

            {/* Body */}
            <View style={styles.bodyWrapper}>
                <Text style={styles.body}>Account Settings</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={styles.buttonText}>Edit profile</Text>
                    <Feather name='chevron-right' size={15}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={styles.buttonText}>Change password</Text>
                    <Feather name='chevron-right' size={15}/>
                </TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Push Notifications</Text>
                    <Switch
                        value={pushNotificationEnabled}
                        onValueChange={(value) => setPushNotificationEnabled(value)}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90a5e5',
    },
    titleWrapper: {
        flex: 1, 
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 15,
    },
    cogIcon: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginRight: 15,
    },
    headerWrapper: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#ced4da',
        marginRight: 15,
    },
    divider: {
        borderBottomColor: '#dee2e6',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    bodyWrapper: {
        flex: 7,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    body: {
        color: '#adb5bd',
        fontSize: 20,
        fontWeight: '500',
    },
    button: {
        backgroundColor: 'white',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
      buttonText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
    },
});