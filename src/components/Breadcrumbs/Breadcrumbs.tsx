import { Anchor, Box, Text } from 'grommet'
import camelCase from 'lodash.camelcase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Routes } from 'src/routes'

interface BreadcrumbsProps {}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const routeSegmentOne = camelCase(router.route.split('/')[1])
  const routeSegmentTwo = camelCase(router.route.split('/')[2])

  return (
    <Box
      direction='row'
      pad={{ vertical: 'small', horizontal: 'pageMargin' }}
      background='light-3'
    >
      <Link href={Routes.home.path as string}>
        <Anchor color='neutral-3'>{t('navigation.home')}</Anchor>
      </Link>

      {Routes[routeSegmentOne].name ? (
        <>
          <Text margin={{ horizontal: 'small' }}>&gt;</Text>

          <Link href={Routes[routeSegmentOne].path as string}>
            <Anchor color='neutral-3'>
              {t(`navigation.${routeSegmentOne}`)}
            </Anchor>
          </Link>
        </>
      ) : (
        <>
          <Text margin={{ horizontal: 'small' }}>&gt;</Text>

          <Anchor color='neutral-3'>
            {t(`navigation.${routeSegmentOne}`)}
          </Anchor>

          <Text margin={{ horizontal: 'small' }}>&gt;</Text>

          <Link href={Routes[routeSegmentOne][routeSegmentTwo].path}>
            <Anchor color='neutral-3'>
              {t(`navigation.${routeSegmentTwo}`)}
            </Anchor>
          </Link>
        </>
      )}
    </Box>
  )
}
