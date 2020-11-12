import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, Title, Description, ContainerTextIcon, TextItem, Content } from './styles';

export default function EnterpriseDetail({ route }) {
  const { id } = route.params
  const [enterprise, setEnterprise] = useState([])

  const { signOut } = useAuth()

  useEffect(() => {
    async function loadEnterprise() {
      try {
        const response = await api.get(`/enterprises/${id}`)

        if (response.status === 200) {
          const data = response.data.enterprise

          setEnterprise(data)
        }
      } catch (error) {
        if (error.response.status === 401) {
          await signOut()
        } else {
          Alert.alert('Error', 'Internal error ')
        }
        console.log('error request ', error)
      }
    }

    loadEnterprise()
  }, [])
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Image
          source={{ uri: `https://empresas.ioasys.com.br/${enterprise?.photo}` }}
          style={{ height: 200 }}
        />

        <View style={{ marginTop: 20 }}>
          <View>
            <Title>{enterprise?.enterprise_name} </Title>
            <Description>{enterprise?.description} </Description>
          </View>

          <Content>
            <View style={{ justifyContent: 'space-between' }}>
              <ContainerTextIcon>
                <Icon name="map-pin" size={16} style={{ marginRight: 6 }} />
                <TextItem>{enterprise?.city}</TextItem>
              </ContainerTextIcon>

              <ContainerTextIcon>
                <Icon name="globe" size={16} style={{ marginRight: 6 }} />
                <TextItem>{enterprise?.country}</TextItem>
              </ContainerTextIcon>
            </View>

            <View style={{ justifyContent: 'space-between' }}>
              <ContainerTextIcon>
                <Icon name="dollar-sign" size={16} style={{ marginRight: 6 }} />
                <TextItem>{enterprise?.share_price}</TextItem>
              </ContainerTextIcon>

              <ContainerTextIcon>
                <Icon name="tag" size={16} style={{ marginRight: 6 }} />
                <TextItem>{enterprise?.enterprise_type?.enterprise_type_name}</TextItem>
              </ContainerTextIcon>
            </View>

          </Content>
        </View>

      </ScrollView>
    </Container>
  )
}
