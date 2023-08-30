import { createContext, type Dispatch, type SetStateAction } from 'react';
export interface UserContextInterface{
  userId?: number
  setUserId?:Dispatch<SetStateAction<number>>
  userLogin?: boolean
  setUserLogin?:Dispatch<SetStateAction<boolean>>
  createUser?:boolean
  setCreateUser?:Dispatch<SetStateAction<boolean>>
  globalFirstName?: string
  setGlobalFirstName?:Dispatch<SetStateAction<string>>
}
//Initialize UserContext
export const UserContext = createContext<UserContextInterface>({});