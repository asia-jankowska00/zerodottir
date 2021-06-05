import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
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

// import styled from 'styled-components'
import { BlogCard, ContactStrip } from '@/components'
import { Routes } from '@/routes'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

// const StyledScrollBox = styled(Box)`
//   overflow-x: scroll;
// `

export default function Home(): JSX.Element {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo title='Home' />
      <Main>
        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
          background={{
            position: 'bottom left',
            size: 'cover',
            image: 'url(/home/background.jpg)',
          }}
        >
          <Box
            width={size === 'small' ? '100%' : '50%'}
            justify='start'
            align='start'
          >
            <Heading color='light-2' level='1' size='large'>
              {t('home.section1.heading')}
            </Heading>
            <Paragraph
              margin={{ bottom: 'large' }}
              color='light-2'
              size='large'
            >
              {t('home.section1.paragraph')}
            </Paragraph>
            <Link href={Routes.shop.path}>
              <Button
                primary
                size='large'
                label={t('home.section1.button')}
                as='a'
              />
            </Link>
          </Box>
        </Box>

        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'large' }}
          background='light-2'
        >
          <Heading level='2' size='large'>
            {t('home.section2.heading')}
          </Heading>
          <Grid
            fill='horizontal'
            rows={
              size === 'small'
                ? ['xsmall', 'xsmall', 'xsmall', 'xsmall', 'xsmall']
                : ['xsmall', 'xsmall', 'xsmall', 'xsmall', 'xsmall']
            }
            columns={
              size === 'small'
                ? ['xsmall', 'auto']
                : size === 'medium'
                ? [
                    'xxsmall',
                    'xsmall',
                    'xxsmall',
                    'xsmall',
                    'xsmall',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                  ]
                : [
                    'small',
                    'small',
                    'small',
                    'small',
                    'small',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                    'auto',
                  ]
            }
            gap='medium'
            areas={
              size === 'small'
                ? [
                    { name: 'oneImg', start: [0, 0], end: [1, 0] },
                    { name: 'twoImg', start: [0, 1], end: [1, 1] },
                    { name: 'threeImg', start: [0, 2], end: [1, 2] },
                    { name: 'fourImg', start: [0, 3], end: [1, 3] },
                    { name: 'fiveImg', start: [0, 4], end: [1, 4] },
                    { name: 'one', start: [1, 0], end: [2, 0] },
                    { name: 'two', start: [1, 1], end: [2, 1] },
                    { name: 'three', start: [1, 2], end: [2, 2] },
                    { name: 'four', start: [1, 3], end: [2, 3] },
                    { name: 'five', start: [1, 4], end: [2, 4] },
                  ]
                : [
                    { name: 'oneImg', start: [0, 0], end: [4, 0] },
                    { name: 'twoImg', start: [1, 1], end: [5, 1] },
                    { name: 'threeImg', start: [2, 2], end: [6, 2] },
                    { name: 'fourImg', start: [3, 3], end: [7, 3] },
                    { name: 'fiveImg', start: [4, 4], end: [8, 4] },
                    { name: 'one', start: [1, 0], end: [5, 0] },
                    { name: 'two', start: [2, 1], end: [6, 1] },
                    { name: 'three', start: [3, 2], end: [7, 2] },
                    { name: 'four', start: [4, 3], end: [8, 3] },
                    { name: 'five', start: [5, 4], end: [9, 4] },
                  ]
            }
          >
            <Box gridArea='oneImg'>
              <Image src='/home/step-1.svg' />
            </Box>
            <Box gridArea='twoImg'>
              <Image src='/home/step-2.svg' />
            </Box>
            <Box gridArea='threeImg'>
              <Image src='/home/step-3.svg' />
            </Box>
            <Box gridArea='fourImg'>
              <Image src='/home/step-4.svg' />
            </Box>
            <Box gridArea='fiveImg'>
              <Image src='/home/step-5.svg' />
            </Box>

            <Box gridArea='one'>
              <Paragraph>{t('home.section2.step1')}</Paragraph>
            </Box>
            <Box gridArea='two'>
              <Paragraph>{t('home.section2.step2')}</Paragraph>
            </Box>
            <Box gridArea='three'>
              <Paragraph>{t('home.section2.step3')}</Paragraph>
            </Box>
            <Box gridArea='four'>
              <Paragraph>{t('home.section2.step4')}</Paragraph>
            </Box>
            <Box gridArea='five'>
              <Paragraph>{t('home.section2.step5')}</Paragraph>
            </Box>
          </Grid>
          <Link href={Routes.howItWorks.path}>
            <Button
              alignSelf={size === 'small' ? 'start' : 'end'}
              primary
              size='large'
              label={t('home.section2.button')}
              margin={{ vertical: 'large' }}
              as='a'
            />
          </Link>
        </Box>

        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
          background='neutral-3'
        >
          <Heading level='2' size='large'>
            {t('home.section3.heading')}
          </Heading>
          <Box direction={size === 'small' ? 'column' : 'row'} gap='medium'>
            <Box width={size === 'small' ? '100%' : '50%'} align='start'>
              <Paragraph color='light-2'>
                {t('home.section3.paragraph1')}
              </Paragraph>
              <Link href={Routes.whatWeDo.path}>
                <Button
                  primary
                  size='large'
                  label={t('home.section3.button1')}
                  as='a'
                />
              </Link>
            </Box>
            <Box width={size === 'small' ? '100%' : '50%'} align='start'>
              <Paragraph color='light-2'>
                {t('home.section3.paragraph2')}
              </Paragraph>
              <Link href={Routes.shop.path}>
                <Button
                  primary
                  size='large'
                  label={t('home.section3.button2')}
                  as='a'
                />
              </Link>
            </Box>
          </Box>
        </Box>
        <Image fit='cover' src='/home/homemade-homegrown.jpg' />

        <Box
          pad={{ horizontal: 'pageMargin' }}
          background='light-2'
          direction={size === 'small' ? 'column' : 'row'}
        >
          <Box
            width={size === 'small' ? '100%' : '50%'}
            align='start'
            pad={{ vertical: 'xlarge' }}
          >
            <Heading level='2' size='large'>
              {t('home.section4.heading')}
            </Heading>
            <Paragraph color='dark-2'>{t('home.section4.paragraph')}</Paragraph>
            <Link href={Routes.whoWeAre.path}>
              <Button
                primary
                size='large'
                label={t('home.section4.button')}
                as='a'
              />
            </Link>
          </Box>
          <Box width={size === 'small' ? '100%' : '50%'}>
            <Image fit='cover' src='/home/team.jpg' />
          </Box>
        </Box>

        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
          background='light-3'
          align='center'
        >
          <Heading level='2' size='large'>
            {t('home.section5.heading')}
          </Heading>
          <Paragraph color='dark-2'> {t('home.section5.paragraph')}</Paragraph>
          <Link href={Routes.blog.path}>
            <Button
              primary
              size='large'
              label={t('home.section5.button')}
              margin={{ bottom: 'large' }}
              as='a'
            />
          </Link>
          <Box direction='row'>
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Box>
        </Box>

        <Box
          pad={{ horizontal: 'pageMargin' }}
          background='light-2'
          direction={size === 'small' ? 'column' : 'row'}
        >
          <Box pad={{ vertical: 'xlarge' }}>
            <Heading level='2' size='large'>
              {t('home.section6.heading')}
            </Heading>
            <Box align='start' direction={size === 'small' ? 'column' : 'row'}>
              <Box width={size === 'small' ? '100%' : '50%'} align='start'>
                <Paragraph color='dark-2'>
                  {t('home.section6.paragraph1')}
                </Paragraph>
                <Button
                  icon={<Share />}
                  primary
                  size='large'
                  label={t('home.section6.button1')}
                  href='https://vegandottir.dk/'
                />
              </Box>
              <Box width={size === 'small' ? '100%' : '50%'} align='start'>
                <Paragraph color='dark-2'>
                  {t('home.section6.paragraph2')}
                </Paragraph>
                <Link href={Routes.shop.path}>
                  <Button
                    primary
                    size='large'
                    label={t('home.section6.button2')}
                    as='a'
                  />
                </Link>
              </Box>
            </Box>
          </Box>
          <Box width={size === 'small' ? '100%' : '50%'}>
            <Image fit='cover' src='/home/vegandottir.jpg' />
          </Box>
        </Box>

        <ContactStrip />

        <Box
          pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
          background='dark-1'
          align='center'
        >
          <Heading level='2' size='large'>
            {t('home.section8.heading')}
          </Heading>
          {/* <StyledScrollBox direction='row'> */}
          <Image fit='cover' height='200px' src='/home/refood-logo.png' />
          <Image fit='cover' height='200px' src='/home/surdejs-logo.jpg' />
          <Image fit='cover' height='200px' src='/home/microgreens-logo.png' />
          {/* </StyledScrollBox> */}
        </Box>

        <Image fit='cover' height='200px' src='/home/banner.jpg' />
      </Main>
    </>
  )
}

// Home.layoutProps = {
//   Layout: (
//     props: React.DetailedHTMLProps<
//       React.HTMLAttributes<HTMLDivElement>,
//       HTMLDivElement
//     >
//   ) => <Box>{props.children}</Box>,
// }
