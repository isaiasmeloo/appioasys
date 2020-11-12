import React, { useState } from 'react';
import { Image, View, KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '../../../hooks/auth';

import logo from '../../../assets/logo.png'
import Loading from '../../../components/Loading';

import { Container, Input, Button, TextButton } from './styles';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  async function handleSubmit() {
    setIsLoading(true)
    await signIn({
      email: "testeapple@ioasys.com.br",
      password: "12341234"
    })
    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? 'padding' : undefined}
      enabled
    >
      <Container>
        {isLoading && (
          <Loading />
        )}
        <Image source={logo} style={{ resizeMode: "center" }} />

        <View style={{ width: '100%', padding: 20 }}>
          <Input
            placeholder="E-mail"
            placeholderTextColor="#6E7E99"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Senha"
            placeholderTextColor="#6E7E99"
            secureTextEntry
          />

          <Button onPress={handleSubmit}>
            <TextButton>Entrar</TextButton>
          </Button>
        </View>
      </Container>
    </KeyboardAvoidingView>
  )
}
