import * as React from 'react';
import { View, Text } from 'react-native';

export default function ChatScreen({ navigation }) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('Chat Screen')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Chat Placeholder</Text>
        </View>
    )
}