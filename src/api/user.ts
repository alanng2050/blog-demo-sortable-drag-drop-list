import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { API_PATHS } from './paths'

export const fetchUser = () => axios.get<null, User>(API_PATHS.me)

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: Pick<User, 'name'>) =>
      axios.post(API_PATHS.updateUser, data),
  })
}

export const useUpdatePass = () => {
  return useMutation({
    mutationFn: (data: { password: string; newPassword: string }) =>
      axios.post(API_PATHS.updatePass, data),
  })
}
