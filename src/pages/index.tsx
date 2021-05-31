import { Box, Button, Heading, Main } from 'grommet'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

export default function Home(): JSX.Element {
  return (
    <>
      <NextSeo title='Home' />
      <Main>
        <Box pad={{ horizontal: 'pageMargin' }}>
          <Box justify='start' align='start'>
            <Heading level='1' size='large'>
              Hello world
            </Heading>
            <Button primary size='large' label='button' />
          </Box>
        </Box>
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
