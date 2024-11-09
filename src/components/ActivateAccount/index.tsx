import { Card, CardBody, CardHeader, Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CommonError } from '../Error'
import { useActivateAccount } from '@/api/auth'
import { TOKEN_LENGTH } from '@/constants/resetpass'

export default function ActivateAccount() {
  const { mutate, isPending, isSuccess, isError } = useActivateAccount()
  const router = useRouter()

  const token = router.query.t as string

  useEffect(() => {
    if (!token) return

    mutate(
      { token },
      {
        onSuccess: () => {
          setTimeout(() => router.push('/'), 2000)
        },
      }
    )
  }, [mutate, router, token])

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
            Verify Account
          </Text>
        </CardHeader>
        <CardBody>
          {token?.length !== TOKEN_LENGTH && <Text>Invalid link</Text>}
          {(isPending || isSuccess) && <Text>Verifying...</Text>}
          {isError && <CommonError />}
        </CardBody>
      </Card>
    </Center>
  )
}
