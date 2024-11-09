import { Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export const CommonError = ({ msg }: { msg?: string }) => {
  const { t } = useTranslation()
  return (
    <Text sx={{ mb: 3, ml: 0 }} variant={'error'}>
      {msg || t('common-error')}
    </Text>
  )
}
