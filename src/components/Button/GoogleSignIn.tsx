import { Button, Image } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ROUTES } from '@/constants/route'

export const GoogleSignInButton = () => {
  const { t } = useTranslation()
  return (
    <Button
      onClick={() => {
        window.location.href = ROUTES.google_signin
      }}
      sx={{ borderRadius: 6 }}
    >
      <Image
        sx={{ height: '24px', mr: 2 }}
        src={'/google.png'}
        alt="google button"
      />
      {t('sign-up-with-gg')}
    </Button>
  )
}
