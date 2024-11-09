import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { API_PATHS } from './paths'

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: SignInParam) => {
      return axios.post(API_PATHS.signin, data)
    },
  })
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpParam) => {
      return axios.post(API_PATHS.signup, data)
    },
  })
}

export const useForgotPass = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => {
      return axios.post(API_PATHS.forgotPass, data)
    },
  })
}

export const useResetPass = () => {
  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) => {
      return axios.post(API_PATHS.resetPass, data)
    },
  })
}

export const useActivateAccount = () => {
  return useMutation({
    mutationFn: (data: { token: string }) => {
      return axios.post(API_PATHS.activate, data)
    },
  })
}

export const useResendVerification = () => {
  return useMutation({
    mutationFn: () => {
      return axios.get(API_PATHS.resendLink)
    },
  })
}

export const useSignout = () => {
  return useMutation({
    mutationFn: () => {
      return axios.get(API_PATHS.signout)
    },
  })
}
