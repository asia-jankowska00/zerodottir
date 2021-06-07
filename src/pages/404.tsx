import { Heading, Main } from 'grommet'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

interface Custom404Props {}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const Custom404: React.FC<Custom404Props> = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo title={t('navigation.404')} />
      <Main
        pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
        align='center'
      >
        <Heading margin={{ vertical: 'xlarge' }} level='1'>
          {t('navigation.404')}
        </Heading>
      </Main>
    </>
  )
}

export default Custom404
