/*eslint-disable no-useless-escape*/
import { Main } from 'grommet'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import { Section } from '@/components'
import { Routes } from '@/routes'

interface HowItWorksProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const HowItWorks: React.FC<HowItWorksProps> = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo title={t('navigation.howItWorks')} />
      <Main>
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          index={0}
          twoParagraphs
          stepSvg
        />
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          dark
          index={1}
          buttonLink={Routes.shop.path}
          stepSvg
        />
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          index={2}
          buttonLink={Routes.customerService.path}
          stepSvg
        />
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          dark
          index={3}
          buttonLink={Routes.customerService.path}
          stepSvg
        />
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          index={4}
          buttonLink={Routes.customerService.path}
          stepSvg
        />
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          dark
          index={5}
          buttonLink={Routes.customerService.path}
          stepSvg
        />
        <Section
          pageSlug={Routes.howItWorks.path.split('/')[1]}
          pageName={Routes.howItWorks.name}
          index={6}
          buttonLink={Routes.login.path}
          twoParagraphs
          stepSvg
        />
      </Main>
    </>
  )
}

export default HowItWorks
