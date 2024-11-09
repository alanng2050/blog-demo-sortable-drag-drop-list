type SignInParam = { email: string; password: string }

type SignUpParam = SignInParam & { name: string }
