import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const getToken = async () => {
  return Platform.OS === 'web'
    ? await AsyncStorage.getItem('auth_token')
    : await SecureStore.getItemAsync('auth_token');
};

export const saveToken = async (token) => {
  return Platform.OS === 'web'
    ? await AsyncStorage.setItem('auth_token', token)
    : await SecureStore.setItemAsync('auth_token', token);
};

export const deleteToken = async () => {
  return Platform.OS === 'web'
    ? await AsyncStorage.removeItem('auth_token')
    : await SecureStore.deleteItemAsync('auth_token');
};
