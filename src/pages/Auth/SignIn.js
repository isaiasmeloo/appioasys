import React from 'react';
import { Image, View, TextInput, Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.png'

export default function SignIn() {
  const { signIn } = useAuth()

  async function handleSubmit() {
    await signIn({
      email: "testeapple@ioasys.com.br",
      password: "12341234"
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9F6F7' }}>
      <Image source={logo} style={{ resizeMode: "center" }} />

      <View style={{ width: '100%', padding: 20 }}>
        <TextInput
          style={{ height: 50, borderRadius: 6, backgroundColor: '#FFFFFF', padding: 15 }}
          placeholder="E-mail"
          placeholderTextColor="#6E7E99"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ height: 50, borderRadius: 6, backgroundColor: '#FFFFFF', padding: 15, marginTop: 15 }}
          placeholder="Senha"
          placeholderTextColor="#6E7E99"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ height: 50, borderRadius: 6, backgroundColor: '#C61B63', padding: 15, marginTop: 15, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#F5F5F5' }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
