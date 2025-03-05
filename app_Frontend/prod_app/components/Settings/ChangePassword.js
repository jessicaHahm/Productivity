import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ChangePasswordScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    return(
        <View style={styles.container}>
            {/* Title */}
            <View style={styles.titleWrapper}>
                <FontAwesome name='cog' style={styles.cogIcon} />
                <Text style={styles.title}>Settings</Text>
            </View>

            {/* Header */}
            <View style={styles.headerWrapper}>
                <Text style={styles.header}>Change Password</Text>
            </View>
            <View style={styles.divider} />

            {/* Body */}
            <View style={styles.bodyWrapper}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.body}>Current password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your password"
                        placeholderTextColor="#aaa"
                        onChangeText={setCurrentPassword}
                        value={currentPassword}
                    />
                    <Text style={styles.body}>New password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="must be 8 characters"
                        placeholderTextColor="#aaa"
                        onChangeText={setNewPassword}
                        value={newPassword}
                    />
                    <Text style={styles.body}>Confirm password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="repeat password"
                        placeholderTextColor='#aaa'
                        onChangeText={setConfirmNewPassword}
                        value={confirmNewPassword}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Change Password')}>
                        <Text style={styles.buttonText}>Change password</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
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
    inputWrapper: {
        flex: 5,
        justifyContent: 'center',
    },
    body: {
        color: 'black',
        fontSize: 20,
        marginHorizontal: 10,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    buttonWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#6475B4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
      buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
    },
});