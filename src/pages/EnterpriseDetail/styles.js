import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const Description = styled.Text`
  color: #555555;
  padding-top: 15px;
  padding-bottom: 35px;
  font-size: 16px;
  text-align: center;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const ContainerTextIcon = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const TextItem = styled.Text`
  font-size: 16px;
`;
