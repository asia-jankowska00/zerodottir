import {
  Anchor,
  Box,
  BoxTypes,
  Header,
  Image,
  Layer,
  Menu,
  Nav,
  ResponsiveContext,
  Sidebar,
  Text,
} from 'grommet'
import {
  Cart,
  Close,
  Favorite,
  Menu as MenuIcon,
  UserSettings,
} from 'grommet-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'
import { Routes } from 'src/routes'
import styled from 'styled-components'

interface NavbarProps {}

const BottomMenuItems = [
  Routes.shop,
  Routes.whatWeDo,
  Routes.whoWeAre,
  Routes.howItWorks,
  Routes.blog,
  Routes.contact,
]

const StyledDesktopHeader = styled(Header)`
  position: fixed;
  z-index: 21;
`

const StyledMenu = styled(Menu)`
  z-index: 22;
`

const DesktopNavbar: React.FC<BoxTypes> = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const size = useContext(ResponsiveContext)

  return (
    <StyledDesktopHeader width='100%' direction='column' gap='none'>
      <Box
        color='dark-2'
        direction='row'
        align='center'
        justify='between'
        background='light-2'
        pad={{ horizontal: 'pageMargin', vertical: 'small' }}
        width='100%'
      >
        <Box direction='row' align='center' wrap>
          <Link href={Routes.home.path}>
            <StyledImage
              src='/logo.svg'
              height='60px'
              alt='Zerodottir logo'
              margin={{ right: 'small' }}
            />
          </Link>
          <Text size='small'>{t('navbar.navHeadline')}</Text>
        </Box>

        <Nav direction='row' align='center'>
          <Anchor color='neutral-3' label={t('navbar.deliveryCheck')} />

          <StyledMenu
            dropProps={{
              // @ts-ignore
              style: {
                zIndex: 22,
              },
            }}
            color='neutral-3'
            label={router.locale}
            items={[{ label: '🇬🇧 English' }, { label: '🇩🇰 Dansk' }]}
          />

          <Link href={Routes.saved.path}>
            <Box
              direction={size === 'medium' ? 'column' : 'row'}
              gap='xsmall'
              align='center'
            >
              <Favorite color='neutral-3' />
              <Anchor
                color='neutral-3'
                label={t(`navigation.${Routes.saved.name}`)}
              />
            </Box>
          </Link>

          <Link href={Routes.cart.path}>
            <Box
              direction={size === 'medium' ? 'column' : 'row'}
              gap='xsmall'
              align='center'
            >
              <Cart color='neutral-3' />
              <Anchor
                color='neutral-3'
                label={t(`navigation.${Routes.cart.name}`)}
              />
            </Box>
          </Link>

          <Box
            direction={size === 'medium' ? 'column' : 'row'}
            gap='xsmall'
            align='center'
          >
            <UserSettings color='neutral-3' />
            <Anchor
              color='neutral-3'
              label={t(`navigation.${Routes.login.name}`)}
            />
          </Box>
        </Nav>
      </Box>
      <Box
        background='neutral-3'
        direction='row'
        align='center'
        justify='end'
        gap='large'
        pad={{ horizontal: 'pageMargin', vertical: 'small' }}
        width='100%'
      >
        {BottomMenuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <Anchor color='light-2' label={t(`navigation.${item.name}`)} />
          </Link>
        ))}
      </Box>
    </StyledDesktopHeader>
  )
}

const StyledMobileNav = styled(Box)`
  position: fixed;
  top: 0;
  z-index: 21;
`

const StyledImage = styled(Image)`
  cursor: pointer;
  margin-bottom: 4px;
`

const MobileNavbar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  router.events.on('routeChangeComplete', () => {
    setMenuOpen(false)
  })

  return (
    <Header>
      <StyledMobileNav
        width='100%'
        background='light-2'
        direction='row'
        align='center'
        justify='between'
        pad={{ vertical: 'small', horizontal: 'pageMargin' }}
      >
        <Link href={Routes.home.path}>
          <StyledImage src='/logo.svg' height='48px' alt='Zerodottir logo' />
        </Link>

        <Box direction='row' align='center' gap='large'>
          <Link href={Routes.saved.path}>
            <Box align='center'>
              <Favorite color='neutral-3' />
              <Text size='xsmall'>{t(`navigation.${Routes.saved.name}`)}</Text>
            </Box>
          </Link>

          <Link href={Routes.cart.path}>
            <Box align='center'>
              <Cart color='neutral-3' />
              <Text size='xsmall'>{t(`navigation.${Routes.cart.name}`)}</Text>
            </Box>
          </Link>

          {menuOpen === false && (
            <Box align='center'>
              <MenuIcon color='neutral-3' onClick={() => setMenuOpen(true)} />
              <Text size='xsmall'>{t(`navbar.menu`)}</Text>
            </Box>
          )}
          {menuOpen === true && (
            <Box align='center'>
              <Close color='neutral-3' onClick={() => setMenuOpen(false)} />
              <Text size='xsmall'>{t(`navbar.close`)}</Text>
            </Box>
          )}
        </Box>
      </StyledMobileNav>

      {menuOpen && (
        <>
          <Layer
            onClickOutside={() => setMenuOpen(!menuOpen)}
            full='vertical'
            responsive={false}
            position='right'
            margin={{ top: '70px' }}
          >
            <Sidebar
              responsive={false}
              background='light-2'
              color='neutral-3'
              footer={
                <Box pad='medium' background='neutral-3' align='center'>
                  <Text size='small'>{t('navbar.navHeadline')}</Text>
                </Box>
              }
              pad='none'
            >
              <Nav
                pad={{ horizontal: 'medium', top: 'small' }}
                justify='between'
                responsive={false}
                fill='vertical'
              >
                <Box>
                  {BottomMenuItems.map((item) => (
                    <Link key={item.name} href={item.path}>
                      <Box pad={{ vertical: 'medium' }}>
                        <Anchor
                          color='neutral-3'
                          label={t(`navigation.${item.name}`)}
                        />
                      </Box>
                    </Link>
                  ))}

                  <Link href={Routes.login.path}>
                    <Box
                      direction='row'
                      gap='xsmall'
                      align='center'
                      pad={{ vertical: 'xlarge' }}
                    >
                      <UserSettings color='neutral-3' />
                      <Anchor
                        color='neutral-3'
                        label={t(`navigation.${Routes.login.name}`)}
                      />
                    </Box>
                  </Link>
                </Box>

                <Box gap='medium'>
                  <Anchor color='neutral-3' label={t('navbar.deliveryCheck')} />
                  <StyledMenu
                    color='neutral-3'
                    dropProps={{
                      // @ts-ignore
                      style: {
                        zIndex: 22,
                      },
                    }}
                    label={router.locale}
                    items={[{ label: '🇬🇧 English' }, { label: '🇩🇰 Dansk' }]}
                  />
                </Box>
              </Nav>
            </Sidebar>
          </Layer>
        </>
      )}
    </Header>
  )
}

export const Navbar: React.FC<NavbarProps> = () => {
  const size = useContext(ResponsiveContext)

  return size && size === 'small' ? <MobileNavbar /> : <DesktopNavbar />
}
