import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'user_id';

export const setUserId = async (userId) => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  } catch (error) {
    console.error('Error saving user ID:', error);
  }
};

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

export const clearUserId = async () => {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error('Error clearing user ID:', error);
  }
};