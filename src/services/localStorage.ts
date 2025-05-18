
import { AUTH_TOKEN, LOGGED_USER_ID } from '@/constants/constants.ts';
import { LoggedInStore } from '@/store/loggedIn-store';
export const getAllSavedData = (name: string) => {
  const localData: string | null = localStorage.getItem(name);
  if (localData) {
    return JSON.parse(localData)
  } else {
    return null
  }

}


export const saveData = (name: string, data: any) => {
  const localData = JSON.stringify(data);
  localStorage.setItem(name, localData)
  return true;
}


export const removeSingleData = (name: string) => {
  localStorage.removeItem(name)
  return true;
}


export const logUserOut = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(LOGGED_USER_ID);
  LoggedInStore.loggedIn = false
}


