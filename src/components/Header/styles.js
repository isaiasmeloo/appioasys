import styled from 'styled-components/native';

export const Container = styled.View`
  min-height: 180px;
  width: 100%;
  padding: 20px;
  padding-top: 50px;
  background-color: #FFFFFF;
  justify-content: space-around;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
