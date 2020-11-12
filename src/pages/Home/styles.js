import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const SearchInput = styled.TextInput`
  height: 50px;
  border-radius: 6px;
  background-color: #F5F5F5;
  padding: 15px;
`;

export const Tag = styled.TouchableOpacity`
  height: 40px;
  border-width: 1px;
  border-color: #EAEAEA;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: 10px 0;
  margin-right: 10px;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  margin-right: 8px;
`;

export const EnterpriseName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const EnterpriseType = styled.View`
  background-color: #C61B63;
  width: 110px;
  border-radius: 6px;
  height: 22px;
  justify-content: center;
`;

export const EnterpriseTypeName = styled.Text`
  font-weight: bold;
  color: #F5F5F5;
  text-align: center;
`;
