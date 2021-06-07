import { Heading, Main } from 'grommet'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

interface BlogPostProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const BlogPost: React.FC<BlogPostProps> = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo title={t('navigation.blog')} />
      <Main pad={{ horizontal: 'pageMargin', bottom: 'xlarge' }}>
        <Heading margin={{ vertical: 'xlarge' }} level='1'>
          {t('navigation.blog')}
        </Heading>
      </Main>
    </>
  )
}

export default BlogPost
