import React from 'react';
import { View, Text, TextInput } from 'react-native';

// import { Container } from './styles';

export default function Header() {
  return (
    <View
      style={{
        minHeight: 180,
        width: '100%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around'
      }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Enterprises</Text>
      <TextInput
        style={{ height: 50, borderRadius: 6, backgroundColor: '#F5F5F5', padding: 15 }}
        placeholder="Search"
        placeholderTextColor="#6E7E99"
      />
    </View>
  );
}
