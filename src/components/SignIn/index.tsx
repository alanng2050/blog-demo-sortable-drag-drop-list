import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Stack,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import type { InferType } from 'yup'
import { Link } from '@chakra-ui/next-js'
import { Input } from '@tinychange/chakra-hook-form'
import { useTranslation } from 'next-i18next'
import { GoogleSignInButton } from '../Button/GoogleSignIn'
import { useSignIn } from '@/api/auth'
import { useStoreDispatch } from '@/store'

export default function SignIn() {
  const [err, toggleErr] = useBoolean()
  const mutation = useSignIn()
  const dispatch = useStoreDispatch()
  const { t } = useTranslation()
  const schema = object({
    email: string().required('Required').email(),
    password: string().required('Required'),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: InferType<typeof schema>) => {
    toggleErr.off()
    mutation.mutate(data, {
      onSuccess: () => {
        dispatch.user.fetchUser()
      },
      onError: () => {
        toggleErr.on()
      },
    })
  }

  return (
    <Card
      sx={{
        mt: 5,
        flexGrow: {
          base: 1,
          md: 'initial',
        },

        mx: 'auto',
        maxWidth: {
          md: '500px',
        },
        width: '100%',
        boxShadow: 'lg',
        borderRadius: 3,
        borderBottomRightRadius: {
          base: 0,
          md: 3,
        },
        borderBottomLeftRadius: {
          base: 0,
          md: 3,
        },
        p: 4,
      }}
    >
      <CardHeader sx={{ pb: 2 }}>
        <Text sx={{ fontSize: 'lg', fontWeight: 'bold', mb: 2 }}>
          {t('sign-in-title')}
        </Text>
        <HStack>
          <Text sx={{ fontWeight: 'bold', fontSize: 'sm' }}>
            {t('sign-in-no-acc')}
          </Text>
          <Button
            as={Link}
            href="/sign-up"
            sx={{ fontSize: 'sm' }}
            variant="link"
          >
            {t('sign-in-create-now')}
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

        {err && (
          <Text sx={{ ml: 0, mb: 2 }} variant="error">
            {t('sign-in-err')}
          </Text>
        )}

        <Stack onSubmit={handleSubmit(onSubmit)} spacing={5} as="form">
          <Input
            label={t('sign-up-email')}
            inputProps={{ ...register('email'), autoFocus: true }}
            err={errors.email?.message}
          />
          <Box>
            <Input
              label={t('sign-up-pass')}
              inputProps={{
                ...register('password'),
                type: 'password',
              }}
              err={errors.password?.message}
            />
            <Link
              sx={{
                mt: 2,
                float: 'right',
                fontSize: 'sm',
                color: 'blackAlpha.700',
              }}
              href="/forgot-password"
            >
              {t('sign-in-forgot-pass')}
            </Link>
          </Box>

          <Button isLoading={mutation.isPending} type="submit" mt={4}>
            {t('sign-in-btn')}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  )
}
