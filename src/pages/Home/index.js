import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';

import { useAuth } from '../../hooks/auth'
import Header from '../../components/Header';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [enterprises, setEnterprises] = useState([])
  const [search, setSearch] = useState("")
  const [enterpriseType, setEnterpriseType] = useState(null)
  const [filters, setFilters] = useState([])

  const { signOut } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
    console.log('useEffect 1')
    async function loadEnterprises() {
      try {
        let query_types = `?enterprise_types=${enterpriseType}`
        let response
        if (enterpriseType) {
          response = await api.get(`/enterprises${query_types}`)
        } else {
          response = await api.get(`/enterprises`)
        }

        if (response.status === 200) {
          const data = response.data.enterprises

          setEnterprises(data)
          handleTypes(data)
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log('TOKEN EXPIRADO')
          // await signOut()
        }
        console.log('error request ', error)
      }
    }

    loadEnterprises()
  }, [enterpriseType])

  function handleTypes(data) {
    const obj = data.reduce((acc, cur) => ({ ...acc, [cur.enterprise_type.enterprise_type_name]: cur.enterprise_type.id }), {})
    const keys = Object.keys(obj)

    setFilters(keys)
  }

  return (
    <View
      style={{ flex: 1, width: '100%' }}
    >

      <Header />

      <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFFFFF', marginTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters && filters.map(filter => (
            <TouchableOpacity key={filter} style={{
              height: 40,
              borderWidth: 1,
              borderColor: "#EAEAEA",
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              marginVertical: 10,
              marginRight: 10
            }}
              onPress={() => {
                setEnterpriseType('11')
              }}
            >
              <Text>{filter}</Text>
            </TouchableOpacity>
          ))
          }

        </ScrollView>

        {enterprises && enterprises.length > 0 && (
          <FlatList
            keyExtractor={item => String(item.id)}
            data={enterprises}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: enterprise, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigate('EnterpriseDetail', { id: enterprise.id })
                }}
                activeOpacity={0.8}
                key={String(enterprise.id)}
                style={[{
                  // flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 10,
                },
                (index === enterprises.length != index)
                  ? { borderTopWidth: 1, borderTopColor: '#EAEAEA' }
                  : {}
                ]}
              >
                <View style={{ marginRight: 8 }}>
                  <Image
                    source={{ uri: `https://empresas.ioasys.com.br/${enterprise.photo}` }}
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{enterprise.enterprise_name}</Text>
                    <Text style={{ color: '#808080' }}>{enterprise.city}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ backgroundColor: '#C61B63', width: 110, borderRadius: 6, height: 22, justifyContent: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: '#F5F5F5', textAlign: 'center' }}>{enterprise.enterprise_type?.enterprise_type_name}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

    </View >
  );
}
