import { faStoreAlt, faTruck, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Anchor,
  Box,
  Button,
  Heading,
  Image,
  Main,
  ResponsiveContext,
  Select,
  SelectProps,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  TextInput,
} from 'grommet'
import debounce from 'lodash/debounce'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Routes } from 'src/routes'
import styled from 'styled-components'
import swell from 'swell-js'

interface CartProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const StyledImage = styled(Image)`
  position: absolute;
  object-fit: cover;
  width: 100%;
`

const StyledImageWrapper = styled(Box)`
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
`

interface AmountSelectProps
  extends SelectProps,
    React.RefAttributes<HTMLButtonElement> {
  item: any
}

const CartSelect: React.FC<AmountSelectProps> = ({ item, name, ...rest }) => {
  const options = item.options.filter((option) => option.name !== name)

  const updateProductMutation = useMutation<any, unknown, any>(
    async (value) =>
      await swell.cart.setItems([
        {
          productId: item.productId,
          options: [...options, { name: name, value: value.name }],
        },
      ]),

    {
      onSuccess: (data) => console.log('cart', data),
    }
  )

  const onSelect = async (value) => {
    await updateProductMutation.mutateAsync(value)
  }

  return (
    <Select
      {...rest}
      valueKey='id'
      labelKey='name'
      onChange={({ value }) => {
        console.log(value)
        onSelect(value)
      }}
    />
  )
}

const DeliverySelect = ({ item }) => {
  const { t } = useTranslation('common')
  const deliveryOptions = item.product.options[2].values

  const selfPickUpId = deliveryOptions?.[1]?.id
  const deliveryId = deliveryOptions?.[0]?.id

  const [selectedDelivery, setSelectedDelivery] = useState(deliveryId)

  const options = item.options.filter((option) => option.name !== 'Delivery')

  const updateProductMutation = useMutation<any, unknown, void>(
    async (value) =>
      await swell.cart.setItems([
        {
          productId: item.productId,
          options: [...options, { name: 'Delivery', value: selectedDelivery }],
        },
      ]),

    {
      onSuccess: (data) => console.log('cart', data),
    }
  )

  return (
    <Box direction='row' gap='medium'>
      <Box
        align='center'
        onClick={async () => {
          setSelectedDelivery(deliveryId)
          await updateProductMutation.mutateAsync()
        }}
      >
        <FontAwesomeIcon
          color={selectedDelivery === deliveryId ? '#8AA53F' : '#5A5857'}
          size='2x'
          icon={faTruck}
        />
        <Text
          color={selectedDelivery === deliveryId ? '#8AA53F' : '#5A5857'}
          size='small'
        >
          {t('cart.delivery')}
        </Text>
      </Box>

      <Box
        align='center'
        onClick={async () => {
          setSelectedDelivery(selfPickUpId)
          await updateProductMutation.mutateAsync()
        }}
      >
        <Box direction='row'>
          <FontAwesomeIcon
            color={selectedDelivery === selfPickUpId ? '#8AA53F' : '#5A5857'}
            size='lg'
            style={{ paddingTop: '10px' }}
            icon={faUser}
          />
          <FontAwesomeIcon
            color={selectedDelivery === selfPickUpId ? '#8AA53F' : '#5A5857'}
            size='lg'
            icon={faStoreAlt}
          />
        </Box>
        <Text
          color={selectedDelivery === selfPickUpId ? '#8AA53F' : '#5A5857'}
          size='small'
        >
          {t('cart.selfPickup')}
        </Text>
      </Box>
    </Box>
  )
}

const Cart: React.FC<CartProps> = () => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')
  const router = useRouter()

  const updateCartCountryMutation = useMutation<any, unknown, void>(
    async () =>
      await swell.cart.update({
        shipping: {
          country: 'DK',
        },
      }),
    {
      onSuccess: (data) => console.log('updated cart', data),
    }
  )

  const cartQuery = useQuery('cart', async () => await swell.cart.get(), {
    onSuccess: (data) => console.log('cart', data),
  })

  const accountQuery = useQuery(
    'account',
    async () => await swell.account.get(),
    {
      onSuccess: (data) => {
        console.log('account', data)
      },
    }
  )

  const removeItemMutaton = useMutation<any, unknown, string>(
    async (itemId) => await swell.cart.removeItem(itemId),
    {
      onSuccess: (data) => console.log('removed item', data),
    }
  )

  const onRemoveItem = async (itemId: string) => {
    await removeItemMutaton.mutateAsync(itemId)
    await cartQuery.refetch()
  }

  const onSubmit = async () => {
    if (accountQuery.data) {
      router.push(Routes.checkout['confirmation'].path as string)
    } else {
      router.push(Routes.checkout['account'].path as string)
    }
  }

  const [deliveryMessage, setDeliveryMessage] = useState('')

  const debouncedMessage = useCallback(
    debounce(() => {
      setDeliveryMessage('Yes, we deliver to you!')
    }, 600),
    []
  )

  const onDeliveryCheck = () => {
    debouncedMessage()
  }

  useEffect(() => {
    ;(async () => {
      await updateCartCountryMutation.mutateAsync()
    })()
  }, [])

  return (
    <>
      <NextSeo title={t('navigation.cart')} />
      <Main pad={{ horizontal: 'pageMargin', bottom: 'xlarge' }}>
        <Heading level='2'>{t('cart.yourCart')}</Heading>

        {cartQuery.isLoading && (
          <Box fill align='center'>
            <Spinner size='medium' />
          </Box>
        )}
        {cartQuery.data?.items?.length > 0 && (
          <Table margin={{ bottom: 'xlarge' }}>
            <TableHeader>
              <TableRow>
                <TableCell scope='col' border='bottom'></TableCell>
                <TableCell scope='col' border='bottom'>
                  {t('cart.name')}
                </TableCell>
                <TableCell scope='col' border='bottom'>
                  {t('cart.amount')}
                </TableCell>
                <TableCell scope='col' border='bottom'>
                  {t('cart.renewal')}
                </TableCell>
                <TableCell scope='col' border='bottom'>
                  {t('cart.delivery')}
                </TableCell>
                <TableCell scope='col' border='bottom'>
                  {t('cart.total')}
                </TableCell>
                <TableCell scope='col' border='bottom'></TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartQuery.data?.items?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell scope='row' size='small'>
                      <StyledImageWrapper>
                        <StyledImage src={item.product.images[0]?.file.url} />
                      </StyledImageWrapper>
                    </TableCell>
                    <TableCell>
                      <strong>{item.product.name}</strong>
                    </TableCell>
                    <TableCell>
                      <CartSelect
                        name='Weight'
                        item={item}
                        defaultValue={item.product.options[1].values.find(
                          (value) =>
                            value.name ===
                            item.options.find(
                              (option) => option.name === 'Weight'
                            ).value
                        )}
                        options={item.product.options[1].values}
                      />
                    </TableCell>
                    <TableCell>
                      <CartSelect
                        name='Plan'
                        item={item}
                        defaultValue={item.product.options[0].values.find(
                          (value) =>
                            value.name ===
                            item.options.find(
                              (option) => option.name === 'Plan'
                            ).value
                        )}
                        options={item.product.options[0].values}
                      />
                    </TableCell>
                    <TableCell>
                      <DeliverySelect item={item} />
                    </TableCell>
                    <TableCell>
                      <Text>{item.priceTotal} DKK</Text>
                    </TableCell>
                    <TableCell>
                      <Anchor
                        icon={
                          removeItemMutaton.isLoading &&
                          removeItemMutaton.variables === item.id ? (
                            <Spinner />
                          ) : undefined
                        }
                        color='status-error'
                        onClick={() => onRemoveItem(item.id)}
                        label={t('cart.remove')}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}

        {!cartQuery.data?.items && (
          <Text margin='large'>{t('cart.cartEmpty')}</Text>
        )}

        {cartQuery.data?.items?.length > 0 && (
          <Box gap='small' width='medium' align='start'>
            <Text margin='none'>{t('navbar.deliveryCheckTitle')}</Text>
            <TextInput onChange={onDeliveryCheck} />
            <Box
              as='footer'
              gap='small'
              direction='row'
              align='center'
              justify='center'
            >
              <Text>{deliveryMessage}</Text>
            </Box>
          </Box>
        )}

        {cartQuery.data?.items?.length > 0 && (
          <Box align='start'>
            <Button
              primary
              size={
                size === 'large'
                  ? 'medium'
                  : size === 'medium'
                  ? 'medium'
                  : 'medium'
              }
              margin={{ top: 'small' }}
              label={t('cart.activateButton')}
              disabled={deliveryMessage === ''}
              onClick={onSubmit}
            />
          </Box>
        )}
      </Main>
    </>
  )
}

export default Cart
