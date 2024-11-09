import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const data = await serverSideTranslations(locale, ['common'])
  return {
    props: {
      ...data,
    },
  }
}
