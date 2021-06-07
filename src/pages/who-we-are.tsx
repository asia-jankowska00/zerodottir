import {
  Box,
  Button,
  Heading,
  Main,
  Paragraph,
  ResponsiveContext,
} from 'grommet'
import { Share } from 'grommet-icons'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useContext } from 'react'

import { BlogCard, ContactStrip, Section } from '@/components'
import { Routes } from '@/routes'

interface WhoWeAreProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const WhoWeAre: React.FC<WhoWeAreProps> = () => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo title={t('navigation.whoWeAre')} />
      <Main>
        <Section
          pageSlug={Routes.whoWeAre.path.split('/')[1]}
          pageName={Routes.whoWeAre.name}
          index={0}
          twoParagraphs
        />
        <Section
          pageSlug={Routes.whoWeAre.path.split('/')[1]}
          pageName={Routes.whoWeAre.name}
          dark
          index={1}
          twoParagraphs
        />
        <Section
          pageSlug={Routes.whoWeAre.path.split('/')[1]}
          pageName={Routes.whoWeAre.name}
          index={2}
          button={
            <Button
              icon={<Share />}
              primary
              size='large'
              label={t('whoWeAre.section2.button')}
              href='https://vegandottir.dk/'
            />
          }
          twoParagraphs
        />
        <Section
          pageSlug={Routes.whoWeAre.path.split('/')[1]}
          pageName={Routes.whoWeAre.name}
          dark
          index={3}
          buttonLink={Routes.shop.path}
          twoParagraphs
        />

        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
          background='light-3'
          align='center'
        >
          <Heading level='2' size='large'>
            {t('whoWeAre.section4.heading')}
          </Heading>
          <Paragraph color='dark-2' fill margin='none'>
            {t('whoWeAre.section4.paragraph1')}
          </Paragraph>
          <Paragraph color='dark-2' margin={{ bottom: 'large' }}>
            {t('whoWeAre.section4.paragraph2')}
          </Paragraph>
          <Link href={Routes.blog.path}>
            <Button
              primary
              size='large'
              label={t('whoWeAre.section4.button')}
              margin={{ bottom: 'large' }}
              as='a'
            />
          </Link>
          <Box direction={size === 'small' ? 'column' : 'row'}>
            <BlogCard index={0} />
            <BlogCard index={1} />
            <BlogCard index={2} />
          </Box>
        </Box>
        <ContactStrip />
      </Main>
    </>
  )
}

export default WhoWeAre
