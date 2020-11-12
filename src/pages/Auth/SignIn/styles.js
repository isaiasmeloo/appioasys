import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #F9F6F7;
`;

export const Input = styled.TextInput`
  height: 50px;
  border-radius: 6px;
  background-color: #FFFFFF;
  padding: 15px;
  margin-top: 15px;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  border-radius: 6px;
  background-color: #C61B63;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #F5F5F5;
`;
