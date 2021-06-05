import {
  Anchor,
  Box,
  BoxTypes,
  Button,
  Header,
  Heading,
  Image,
  Layer,
  Menu,
  Nav,
  ResponsiveContext,
  Sidebar,
  Stack,
  Text,
  TextInput,
} from 'grommet'
import {
  Cart,
  Close,
  Favorite,
  Menu as MenuIcon,
  UserSettings,
} from 'grommet-icons'
import debounce from 'lodash/debounce'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Routes } from 'src/routes'
import styled from 'styled-components'
import swell from 'swell-js'

interface NavbarProps {}

const BottomMenuItems = [
  Routes.shop,
  Routes.howItWorks,
  Routes.whatWeDo,
  Routes.whoWeAre,
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

  const [deliveryMessage, setDeliveryMessage] = useState('')
  const [deliveryModal, setDeliveryModal] = useState(false)

  const cartQuery = useQuery('cart', async () => await swell.cart.get(), {
    onSuccess: (data) => console.log(data),
  })

  const accountQuery = useQuery(
    'account',
    async () => await swell.account.get(),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const debouncedMessage = useCallback(
    debounce(() => {
      setDeliveryMessage('Yes, we deliver to you!')
    }, 600),
    []
  )

  const onDeliveryCheck = () => {
    debouncedMessage()
  }

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
          <Link href={Routes.home.path as string}>
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
          <Anchor
            color='neutral-3'
            label={t('navbar.deliveryCheck')}
            onClick={() => setDeliveryModal(true)}
          />
          {deliveryModal && (
            <Layer
              position='center'
              onClickOutside={() => {
                setDeliveryModal(false)
                setDeliveryMessage('')
              }}
              onEsc={() => {
                setDeliveryModal(false)
                setDeliveryMessage('')
              }}
            >
              <Box pad='medium' gap='small' width='medium' align='center'>
                <Heading level={3} margin='none'>
                  {t('navbar.deliveryCheckTitle')}
                </Heading>
                <TextInput onChange={onDeliveryCheck} />
                <Box
                  as='footer'
                  gap='small'
                  direction='row'
                  align='center'
                  justify='center'
                  pad={{ top: 'medium', bottom: 'small' }}
                >
                  <Text>{deliveryMessage}</Text>
                  <Button
                    label={
                      <Text color='white'>
                        <strong>Close</strong>
                      </Text>
                    }
                    onClick={() => {
                      setDeliveryModal(false)
                      setDeliveryMessage('')
                    }}
                    primary
                  />
                </Box>
              </Box>
            </Layer>
          )}

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

          <Link href={Routes.saved.path as string}>
            <Box
              direction={size === 'medium' ? 'column' : 'row'}
              gap='xsmall'
              align='center'
            >
              <Stack anchor='top-right' margin='none'>
                <Favorite color='neutral-3' />
              </Stack>
              <Anchor
                color='neutral-3'
                label={t(`navigation.${Routes.saved.name}`)}
              />
            </Box>
          </Link>

          <Link href={Routes.checkout['cart'].path}>
            <Box
              direction={size === 'medium' ? 'column' : 'row'}
              gap='xsmall'
              align='center'
            >
              <Stack anchor='top-right' margin='none'>
                <Cart color='neutral-3' />
                {cartQuery.data?.items?.length && (
                  <Box background='accent-1' pad='4px' round></Box>
                )}
              </Stack>
              <Anchor
                color='neutral-3'
                label={t(`navigation.${Routes.cart.name}`)}
              />
            </Box>
          </Link>

          <Link
            href={
              accountQuery.data
                ? (Routes.myAccount.path as string)
                : (Routes.login.path as string)
            }
          >
            <Box
              direction={size === 'medium' ? 'column' : 'row'}
              gap='xsmall'
              align='center'
            >
              <Stack anchor='top-right' margin='none'>
                <UserSettings color='neutral-3' />
              </Stack>
              <Anchor
                color='neutral-3'
                label={t(`navigation.${Routes.myAccount.name}`)}
              />
            </Box>
          </Link>
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
          <Link key={item.name as string} href={item.path as string}>
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

  const accountQuery = useQuery(
    'account',
    async () => await swell.account.get(),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const cartQuery = useQuery('cart', async () => await swell.cart.get(), {
    onSuccess: (data) => console.log(data),
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
        <Link href={Routes.home.path as string}>
          <StyledImage src='/logo.svg' height='48px' alt='Zerodottir logo' />
        </Link>

        <Box direction='row' align='center' gap='large'>
          <Link href={Routes.saved.path as string}>
            <Box align='center'>
              <Favorite color='neutral-3' />
              <Text size='xsmall'>{t(`navigation.${Routes.saved.name}`)}</Text>
            </Box>
          </Link>

          <Link href={Routes.checkout['cart'].path}>
            <Box align='center'>
              <Stack anchor='top-right' margin='none'>
                <Cart color='neutral-3' />
                {cartQuery.data?.items?.length && (
                  <Box background='accent-1' pad='4px' round></Box>
                )}
              </Stack>
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
                    <Link key={item.name as string} href={item.path as string}>
                      <Box pad={{ vertical: 'medium' }}>
                        <Anchor
                          color='neutral-3'
                          label={t(`navigation.${item.name}`)}
                        />
                      </Box>
                    </Link>
                  ))}

                  <Link
                    href={
                      accountQuery.data
                        ? (Routes.myAccount.path as string)
                        : (Routes.login.path as string)
                    }
                  >
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
