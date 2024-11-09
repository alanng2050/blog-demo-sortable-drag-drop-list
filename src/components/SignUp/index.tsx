import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import type { InferType } from 'yup'
import { Link } from '@chakra-ui/next-js'
import { Input } from '@tinychange/chakra-hook-form'
import { omit } from '@tinychange/omit-pick'
import { passwordStrength } from 'check-password-strength'
import { useTranslation } from 'next-i18next'
import { GoogleSignInButton } from '../Button/GoogleSignIn'
import { useSignUp } from '@/api/auth'

export default function SignIn() {
  const mutation = useSignUp()
  const { t } = useTranslation()

  const schema = object({
    name: string().required(t('err-required')),
    email: string().required(t('err-required')).email(t('err-email')),
    password: string()
      .required(t('err-required'))
      .test('password_strength', t('err-pass-too-weak'), (v) => {
        return passwordStrength(v).id > 0
      }),
    confirmPassword: string()
      .required(t('err-required'))
      .test(
        'confirm_pass',
        t('reset-pass-err-not-match-pass'),
        (val, context) => {
          return context.parent['password'] === val
        }
      ),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: InferType<typeof schema>) => {
    const rest = omit(data, ['confirmPassword'])
    mutation.mutate(rest)
  }

  const form = (
    <Stack onSubmit={handleSubmit(onSubmit)} spacing={5} as="form">
      <Input
        label={t('sign-up-name')}
        inputProps={{ ...register('name'), autoFocus: true }}
        err={errors.name?.message}
      />
      <Input
        label={t('sign-up-email')}
        inputProps={{ ...register('email') }}
        err={errors.email?.message}
      />
      <Input
        label={t('sign-up-pass')}
        inputProps={{
          ...register('password'),
          type: 'password',
        }}
        err={errors.password?.message}
      />
      <Input
        label={t('sign-up-confirm-pass')}
        inputProps={{
          ...register('confirmPassword'),
          type: 'password',
        }}
        err={errors.confirmPassword?.message}
      />

      <Button isLoading={mutation.isPending} type="submit" mt={4}>
        {t('sign-up-btn-sign-up')}
      </Button>
    </Stack>
  )

  return (
    <Center sx={{ flexGrow: 1, py: 2 }}>
      <Card
        sx={{
          maxWidth: {
            md: '500px',
          },
          width: '100%',
          boxShadow: 'lg',
          borderRadius: 3,
          p: 4,
        }}
      >
        <CardHeader sx={{ pb: 2 }}>
          <Text sx={{ fontSize: 'lg', fontWeight: 'bold', mb: 2 }}>
            {t('sign-up-title')}
          </Text>
          <HStack>
            <Text sx={{ fontWeight: 'bold', fontSize: 'sm' }}>
              {t('sign-up-already-have-acc')}
            </Text>
            <Button
              as={Link}
              href="/sign-in"
              sx={{ fontSize: 'sm' }}
              variant="link"
            >
              {t('sign-up-sign-in-now')}
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack>
            <GoogleSignInButton />
          </VStack>
          <Box position="relative" sx={{ py: 8 }}>
            <Divider />
            <AbsoluteCenter fontSize={14} bg="#fff" px="4">
              {t('sign-up-or')}
            </AbsoluteCenter>
          </Box>

          {mutation.isError && (
            <Text sx={{ ml: 0, mb: 2 }} variant="error">
              {t('common-error')}
            </Text>
          )}
          {mutation.isSuccess ? (
            <Text sx={{ textAlign: 'center' }}>{t('sign-up-success-msg')}</Text>
          ) : (
            form
          )}
        </CardBody>
      </Card>
    </Center>
  )
}
