import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import type { InferType } from 'yup'
import { Input } from '@tinychange/chakra-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { passwordStrength } from 'check-password-strength'
import { useTranslation } from 'next-i18next'
import { CommonError } from '../Error'
import { useResetPass } from '@/api/auth'
import { ROUTES } from '@/constants/route'
import { TOKEN_LENGTH } from '@/constants/resetpass'

export default function ResetPassword() {
  const { t } = useTranslation()
  const mutation = useResetPass()
  const token = useRouter().query.t as string
  const invalidToken = token?.length !== TOKEN_LENGTH

  const schema = object({
    password: string()
      .required(t('err-required'))
      .test('password_strength', t('common-err-too-weak'), (v) => {
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
    mutation.mutate({ newPassword: data.password, token })
  }

  const form = (
    <>
      {invalidToken && (
        <Text sx={{ ml: 0, mb: 2 }} variant="error">
          {t('reset-pass-error')}
        </Text>
      )}

      {mutation.isError && <CommonError />}

      <Stack onSubmit={handleSubmit(onSubmit)} spacing={5} as="form">
        <Input
          label={t('reset-pass-newpass')}
          inputProps={{
            ...register('password'),
            autoFocus: true,
            type: 'password',
          }}
          err={errors.password?.message}
        />
        <Input
          label={t('reset-pass-confirm-newpass')}
          inputProps={{ ...register('confirmPassword'), type: 'password' }}
          err={errors.confirmPassword?.message}
        />
        <Button isLoading={mutation.isPaused} type="submit" mt={4}>
          {t('reset-pass-reset')}
        </Button>
      </Stack>
    </>
  )

  return (
    <Center sx={{ flexGrow: 1 }}>
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
            {t('reset-pass-title')}
          </Text>
        </CardHeader>
        <CardBody>
          {mutation.isSuccess ? (
            <VStack>
              <Text>{t('reset-pass-success-msg')}</Text>
              <Button as={Link} href={ROUTES.signin} sx={{ width: '100%' }}>
                {t('forgot-pass-back-to-signin')}
              </Button>
            </VStack>
          ) : (
            form
          )}
        </CardBody>
      </Card>
    </Center>
  )
}
