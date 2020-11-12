import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [investor, setInvestor] = useState(null)
  const [access_token, setAccessToken] = useState(null)
  const [client, setClient] = useState(null)
  const [uid, setUid] = useState(null)

  useEffect(() => {
    async function loadStoragedData() {
      const [investor, access_token, client, uid] = await AsyncStorage.multiGet(
        [
          '@ioasys:investor',
          '@ioasys:access_token',
          '@ioasys:client',
          '@ioasys:uid',
        ],
      );

      if (investor[1]) {
        api.defaults.headers.common['access-token'] = `${JSON.parse(access_token[1])}`;
        api.defaults.headers.client = `${JSON.parse(client[1])}`;
        api.defaults.headers.uid = `${JSON.parse(uid[1])}`;
        console.log('HEADER ', api.defaults.headers['access-token'])

        setInvestor(JSON.parse(investor[1]));
        setAccessToken(JSON.parse(access_token[1]));
        setClient(JSON.parse(client[1]));
        setUid(JSON.parse(uid[1]));
      }
    }

    loadStoragedData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/users/auth/sign_in', {
        email,
        password
      })

      if (response.status === 200) {
        const { 'access-token': accessToken, client, uid } = response.headers

        await AsyncStorage.multiSet([
          ['@ioasys:access_token', JSON.stringify(accessToken)],
          ['@ioasys:client', JSON.stringify(client)],
          ['@ioasys:uid', JSON.stringify(uid)],
          ['@ioasys:investor', JSON.stringify(response.data?.investor)]
        ])

        setAccessToken(JSON.stringify(accessToken));
        setClient(JSON.stringify(client));
        setUid(JSON.stringify(uid));

        setInvestor(JSON.stringify(response.data?.investor));
      }
    } catch (error) {
      console.log('error request ', error)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {

      await AsyncStorage.multiRemove([
        '@ioasys:investor',
        '@ioasys:access_token',
        '@ioasys:client',
        '@ioasys:uid',
      ])

      setInvestor(null);
      setAccessToken(null);
      setClient(null);
      setUid(null);

    } catch (error) {
      console.log('error request ', error)
    }
  }, [])


  return (
    <AuthContext.Provider
      value={{
        investor,
        access_token,
        client,
        uid,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth }
