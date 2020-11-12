import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth'
import Header from '../../components/Header';
import api from '../../services/api';

import { Container, SearchInput, Tag, Image, EnterpriseName, EnterpriseType, EnterpriseTypeName } from './styles';

export default function Home() {
  const [enterprises, setEnterprises] = useState([])
  const [enterpriseType, setEnterpriseType] = useState(null)
  const [filters, setFilters] = useState([])

  const { signOut } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
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
        console.log('error request ', error)
        if (error.response?.status === 401) {
          console.log('TOKEN EXPIRADO')
          await signOut()
        } else {
          Alert.alert('Error', 'Internal error ')
        }
      }
    }

    loadEnterprises()
  }, [enterpriseType])

  const enterprisesFiltered = useCallback(async (input) => {
    try {
      let response = await api.get(`/enterprises?name=${input}`)

      if (response.status === 200) {
        const data = response.data.enterprises

        setEnterprises(data)
        // handleTypes(data)
      }
    } catch (error) {
      console.log('error request ', error)
      if (error.response?.status === 401) {
        console.log('TOKEN EXPIRADO')
        await signOut()
      } else {
        Alert.alert('Error', 'Internal error ')
      }
    }
  }, [])

  function handleTypes(data = []) {
    const obj = data.reduce((acc, cur) => (
      {
        ...acc,
        [cur.enterprise_type.enterprise_type_name]: cur.enterprise_type
      }
    ), {})
    let array = []

    for (i in obj) {
      array.push(obj[i])
    }

    setFilters(array)
  }

  return (
    <Container>
      <Header>
        <SearchInput
          placeholder="Search"
          placeholderTextColor="#6E7E99"
          onChangeText={text => enterprisesFiltered(text)}
        />
      </Header>

      <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 20, backgroundColor: '#FFFFFF', marginTop: 10 }}>
        <ScrollView contentContainerStyle={{ maxHeight: 60 }} horizontal showsHorizontalScrollIndicator={false}>
          <Tag
            style={{ backgroundColor: !enterpriseType ? '#C61B63' : '#FFF' }}
            onPress={() => {
              setEnterpriseType(null)
            }}
          >
            <Text style={{ color: !enterpriseType ? '#FFF' : '#000' }}>All</Text>
          </Tag>
          {filters && filters.map(filter => (
            <Tag
              key={filter.id}
              style={{ backgroundColor: filter.id === enterpriseType ? '#C61B63' : '#FFF' }}
              onPress={() => {
                setEnterpriseType(filter.id)
              }}
            >
              <Text style={{ color: filter.id === enterpriseType ? '#FFF' : '#000' }}>{filter.enterprise_type_name}</Text>
            </Tag>
          ))
          }

        </ScrollView>

        {enterprises && enterprises.length > 0 && (
          <FlatList
            keyExtractor={item => String(item.id)}
            data={enterprises}
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
            renderItem={({ item: enterprise, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigate('EnterpriseDetail', { id: enterprise.id })
                }}
                activeOpacity={0.8}
                key={String(enterprise.id)}
                style={[{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 10,
                },
                (index === enterprises.length != index)
                  ? { borderTopWidth: 1, borderTopColor: '#EAEAEA' }
                  : {}
                ]}
              >
                <Image
                  source={{ uri: `https://empresas.ioasys.com.br/${enterprise.photo}` }}
                />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View>
                    <EnterpriseName>{enterprise.enterprise_name}</EnterpriseName>
                    <Text style={{ color: '#808080' }}>{enterprise.city}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <EnterpriseType>
                      <EnterpriseTypeName>{enterprise.enterprise_type?.enterprise_type_name}</EnterpriseTypeName>
                    </EnterpriseType>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

    </Container>
  );
}
