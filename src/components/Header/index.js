import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import { Container, HeaderTitle, SearchInput, ContainerHeader } from './styles';

export default function Header({ children }) {
  const { signOut } = useAuth();

  return (
    <Container>
      <ContainerHeader>
        <HeaderTitle>Enterprises</HeaderTitle>
        <TouchableOpacity onPress={signOut}>
          <Icon name="power" size={20} color="#000" />
        </TouchableOpacity>
      </ContainerHeader>
      {children}
    </Container>
  );
}
