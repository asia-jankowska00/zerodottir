import ProgressBar from '@badrap/bar-of-progress'
import { Box, Grommet, Spinner } from 'grommet'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { Normalize } from 'styled-normalize'

import { Layout as DefaultLayout } from '@/components'
import { SEO } from '@/constants/seo-constants'

import { grommetTheme } from '../styles/grommetTheme'

const progress = new ProgressBar({
  size: 6,
  color: '#8AA53F',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', progress.finish)

const {
  DEFAULT_TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  DEFAULT_CANONICAL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  FAVICON_LINK,
} = SEO

const queryClient = new QueryClient()

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const canonicalPath = router.pathname === '/' ? '' : router.pathname
  const url = `${DEFAULT_CANONICAL}${canonicalPath}`
  const Layout =
    (
      Component as typeof Component & {
        layoutProps: {
          Layout: (props: { children: ReactNode } & unknown) => JSX.Element
        }
      }
    ).layoutProps?.Layout || DefaultLayout

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <DefaultSeo
        title={DEFAULT_TITLE}
        titleTemplate={DEFAULT_TITLE_TEMPLATE}
        description={DEFAULT_DESCRIPTION}
        canonical={url}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url,
          site_name: SITE_NAME,
          title: SITE_NAME,
          description: DEFAULT_DESCRIPTION,
          images: [
            {
              url: DEFAULT_OG_IMAGE,
              alt: SITE_NAME,
            },
          ],
        }}
        twitter={{
          handle: TWITTER_HANDLE,
          site: TWITTER_HANDLE,
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: FAVICON_LINK,
          },
        ]}
      />
      <QueryClientProvider client={queryClient}>
        <Normalize />
        <Grommet full theme={grommetTheme}>
          {isLoading ? (
            <Box align='center' justify='center' fill>
              <Spinner message='Loading the site' size='large' />
            </Box>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Grommet>
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
