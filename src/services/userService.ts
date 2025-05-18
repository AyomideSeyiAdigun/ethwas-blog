import type { LoginDto, RegisterDto } from "@/dto/login-dto";
import { getAllSavedData, saveData } from "./localStorage";
import { LOGGED_USER_ID, USERS } from "@/constants/constants";




export const saveUser = (user: RegisterDto) => {
  let myUser: RegisterDto = user
  const allUser: RegisterDto[] = getAllSavedData(USERS);
  if (!allUser) {
    myUser.id = 1;
    const user = [myUser]
    saveData(USERS, user)
    return true
  }
  const checkIfEmailExist: RegisterDto | undefined = allUser.find((singleUser: RegisterDto) => myUser.email === singleUser.email);
  if (checkIfEmailExist) {
    return null
  } else {
    myUser.id = allUser.length + 1;
    allUser.push(myUser);
    saveData(USERS, allUser)
    return true
  }
}


export const loginUser = (user: LoginDto) => {
  let myUser: LoginDto = user
  const allUser: RegisterDto[] = getAllSavedData(USERS);
  const checkIfEmailExist: RegisterDto | undefined = allUser.find((singleUser: RegisterDto) => myUser.email === singleUser.email);
  if (checkIfEmailExist) {
    if (checkIfEmailExist.password === myUser.password) {
      saveData(LOGGED_USER_ID,checkIfEmailExist.id);
      return true
    }
    return null
  } else {
    return null
  }
}
