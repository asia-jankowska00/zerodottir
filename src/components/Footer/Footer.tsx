import {
  Anchor,
  Box,
  Footer as GFooter,
  Image,
  ResponsiveContext,
  Text,
} from 'grommet'
import { Facebook, Instagram } from 'grommet-icons'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import styled from 'styled-components'

import { Routes } from '../../routes'

interface FooterProps {}

const ShopColumn = {
  title: 'shop',
  links: [Routes.shop],
}

const ZerodottirColumn = {
  title: 'zerodottir',
  links: [Routes.whatWeDo, Routes.whoWeAre, Routes.howItWorks, Routes.blog],
}

const CustomerServiceColumn = {
  title: 'customerService',
  links: [
    Routes.contact,
    {
      name: 'delivery',
      path: Routes.customerService.path,
    },
    {
      name: 'payments',
      path: Routes.customerService.path,
    },
    {
      name: 'products',
      path: Routes.customerService.path,
    },
    {
      name: 'returns',
      path: Routes.customerService.path,
    },
    {
      name: 'privacyPolicy',
      path: Routes.customerService.path,
    },
    {
      name: 'termsOfSale',
      path: Routes.customerService.path,
    },
  ],
}

const columnsData = [ShopColumn, ZerodottirColumn, CustomerServiceColumn]

const StyledAnchor = styled(Anchor)`
  font-weight: 400;
`

const StyledIconAnchor = styled(Anchor)`
  padding: 0;
`

const StyledImage = styled(Image)`
  max-width: 100%;
`

export const Footer: React.FC<FooterProps> = () => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <GFooter
      pad={{ horizontal: 'pageMargin' }}
      background='dark-1'
      direction={size === 'small' ? 'column-reverse' : 'row'}
      align='start'
      justify='between'
      wrap
    >
      {columnsData.map((column, index) => (
        <Box
          color='light-2'
          gap='medium'
          key={column.title}
          pad={{ right: 'medium', vertical: 'large' }}
        >
          <Text weight='bold' size='medium'>
            {t(`footer.${column.title}`)}
          </Text>
          <Box gap='medium'>
            {column.links.map((link) => (
              <Link key={link.name} href={link.path}>
                <StyledAnchor
                  size='small'
                  color='light-2'
                  label={t(
                    index === 2
                      ? `customerService.${link.name}`
                      : `navigation.${link.name}`
                  )}
                />
              </Link>
            ))}
          </Box>
        </Box>
      ))}
      <Box direction='row' gap='medium' pad={{ vertical: 'large' }} wrap>
        <Box
          color='light-2'
          gap='medium'
          key={'contact'}
          pad={{ right: 'medium' }}
        >
          <Text weight='bold' size='medium'>
            {t('footer.contactUs')}
          </Text>
          <Box gap='small'>
            <Text size='small'>{t('contact.phone')} 50656415</Text>
            <Text size='small'>{t('contact.email')} info@zerodottir.dk</Text>
            <Text size='small'>
              {t('contact.address')} Hjulmagervej 58, 9000 Aalborg
            </Text>
            <Box direction='row' gap='small' pad={{ vertical: 'small' }}>
              <StyledIconAnchor color='light-2' icon={<Facebook />} />
              <StyledIconAnchor color='light-2' icon={<Instagram />} />
            </Box>
          </Box>
        </Box>
        <StyledImage src='/map.jpg' />
      </Box>
    </GFooter>
  )
}
