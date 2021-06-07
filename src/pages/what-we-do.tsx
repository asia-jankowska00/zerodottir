import {
  Box,
  Button,
  Heading,
  Image,
  Main,
  Paragraph,
  ResponsiveContext,
} from 'grommet'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useContext } from 'react'

import { ContactStrip, Section } from '@/components'
import { Routes } from '@/routes'

interface WhatWeDoProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const WhatWeDo: React.FC<WhatWeDoProps> = () => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo title={t('navigation.whatWeDo')} />
      <Main>
        <Section
          pageSlug={Routes.whatWeDo.path.split('/')[1]}
          pageName={Routes.whatWeDo.name}
          index={0}
          twoParagraphs
        />
        <Section
          pageSlug={Routes.whatWeDo.path.split('/')[1]}
          pageName={Routes.whatWeDo.name}
          dark
          index={1}
          twoParagraphs
        />
        <Section
          pageSlug={Routes.whatWeDo.path.split('/')[1]}
          pageName={Routes.whatWeDo.name}
          index={2}
          twoParagraphs
        />

        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
          background='neutral-3'
        >
          <Box direction={size === 'small' ? 'column' : 'row'} gap='medium'>
            <Box width={size === 'small' ? '100%' : '50%'} align='start'>
              <Heading level='2' size='large'>
                {t('whatWeDo.section3.heading1')}
              </Heading>
              <Paragraph color='light-2'>
                {t('whatWeDo.section3.paragraph1')}
              </Paragraph>
              <Link href={Routes.shop.path + '?category=fresh-produce'}>
                <Button
                  primary
                  size='large'
                  label={t('whatWeDo.section3.button1')}
                  as='a'
                />
              </Link>
            </Box>

            <Box width={size === 'small' ? '100%' : '50%'} align='start'>
              <Heading level='2' size='large'>
                {t('whatWeDo.section3.heading2')}
              </Heading>
              <Paragraph color='light-2'>
                {t('whatWeDo.section3.paragraph2')}
              </Paragraph>
              <Link href={Routes.shop.path + '?category=our-specialties'}>
                <Button
                  primary
                  size='large'
                  label={t('whatWeDo.section3.button2')}
                  as='a'
                />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box direction='row'>
          <Box width={size === 'small' ? '100%' : '50%'}>
            {size === 'small' ? (
              <Image
                fit='cover'
                src={`/${
                  Routes.whatWeDo.path.split('/')[1]
                }/section-${4}-m.jpg`}
              />
            ) : (
              <Image
                fill='vertical'
                fit='cover'
                src={`/${Routes.whatWeDo.path.split('/')[1]}/section-${4}.jpg`}
              />
            )}
          </Box>
          <Box width={size === 'small' ? '100%' : '50%'}>
            {size === 'small' ? (
              <Image
                fit='cover'
                src={`/${
                  Routes.whatWeDo.path.split('/')[1]
                }/section-${5}-m.jpg`}
              />
            ) : (
              <Image
                fill='vertical'
                fit='cover'
                src={`/${Routes.whatWeDo.path.split('/')[1]}/section-${5}.jpg`}
              />
            )}
          </Box>
        </Box>

        <ContactStrip />
      </Main>
    </>
  )
}

export default WhatWeDo
