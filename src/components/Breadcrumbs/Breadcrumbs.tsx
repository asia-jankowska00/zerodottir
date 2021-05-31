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

  return (
    <Box
      direction='row'
      gap='small'
      pad={{ vertical: 'small', horizontal: 'pageMargin' }}
    >
      <Link href={Routes.home.path}>
        <Anchor color='neutral-3'>{t('navigation.home')}</Anchor>
      </Link>

      <Text>&gt;</Text>
      <Link href={Routes[camelCase(router.route)].path}>
        <Anchor color='neutral-3'>
          {t(`navigation.${camelCase(router.route)}`)}
        </Anchor>
      </Link>
    </Box>
  )
}
