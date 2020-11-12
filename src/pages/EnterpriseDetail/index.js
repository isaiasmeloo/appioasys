import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

export default function EnterpriseDetail({ route }) {
  const { id } = route.params
  const [enterprise, setEnterprise] = useState(null)

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
          console.log('TOKEN EXPIRADO')
          await signOut()
        }
        console.log('error request ', error)
      }
    }

    loadEnterprise()
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF' }}>

        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: `https://empresas.ioasys.com.br/${enterprise?.photo}` }}
            style={{ flex: 0.8 }}
          />
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{enterprise?.enterprise_name} </Text>
          <Text style={{ color: '#555555', paddingVertical: 20, textAlign: 'center', fontSize: 16 }}>{enterprise?.description} </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ justifyContent: 'space-between', }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="map-pin" size={16} style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 16 }}>{enterprise?.city} </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="globe" size={16} style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 16 }}>{enterprise?.country} </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'space-between', }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Icon name="dollar-sign" size={16} style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 16 }}>{enterprise?.share_price} </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="tag" size={16} style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 16, }}>{enterprise?.enterprise_type?.enterprise_type_name} </Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}
