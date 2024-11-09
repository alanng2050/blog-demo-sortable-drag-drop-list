import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import type { InferType } from 'yup'
import { Input } from '@tinychange/chakra-hook-form'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { CommonError } from '../Error'
import { useForgotPass } from '@/api/auth'
import { ROUTES } from '@/constants/route'

export default function ForgotPassword() {
  const mutation = useForgotPass()
  const { t } = useTranslation()

  const schema = object({
    email: string().required(t('err-required')).email(),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: InferType<typeof schema>) => {
    mutation.mutate(data)
  }

  const form = (
    <>
      <Text
        sx={{
          color: 'blackAlpha.600',
          mb: 4,
        }}
      >
        {t('forgot-pass-enter-email')}
      </Text>

      {mutation.isError && <CommonError />}

      <Stack onSubmit={handleSubmit(onSubmit)} spacing={5} as="form">
        <Input
          label={t('sign-up-email')}
          inputProps={{ ...register('email'), autoFocus: true }}
          err={errors.email?.message}
        />
        <Button isLoading={mutation.isPaused} type="submit" mt={4}>
          {t('btn-submit')}
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
            {t('forgot-pass-title')}
          </Text>
        </CardHeader>
        <CardBody>
          {mutation.isSuccess ? <Text>{t('forgot-pass-success')}</Text> : form}
          <Button as={Link} href={ROUTES.signin} sx={{ width: '100%' }} mt={6}>
            {t('forgot-pass-back-to-signin')}
          </Button>
        </CardBody>
      </Card>
    </Center>
  )
}
