const prefix = '/api'

export const API_PATHS = {
  signin: `${prefix}/signin`,
  signup: `${prefix}/signup`,
  forgotPass: `${prefix}/forgot-password`,
  resetPass: `${prefix}/reset-password`,
  activate: `${prefix}/activate`,
  resendLink: `${prefix}/resend-verification`,
  me: `${prefix}/me`,
  signout: `${prefix}/signout`,
  updateUser: `${prefix}/user/update`,
  updatePass: `${prefix}/user/change-password`,
} as const
