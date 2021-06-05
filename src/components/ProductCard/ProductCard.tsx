import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Layer,
  ResponsiveContext,
  Select,
  Text,
} from 'grommet'
import { Favorite } from 'grommet-icons'
import { useRouter } from 'next/router'
import { MouseEventHandler, useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import swell from 'swell-js'

interface Product {
  id: string
  name: string
  price: number
  options: any[]
  images: any
}

interface ProductCardProps {
  productData: Partial<Product>
}

const StyledIconButton = styled(Button)`
  padding: 0;
`

const StyledFavorite = styled(Favorite)`
  & *[stroke*='#'] {
    fill: #8aa53f;
  }
`

const StyledSelect = styled(Select)`
  width: 75px;
`

const StyledImage = styled(Image)`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const StyledImageWrapper = styled(Box)`
  position: relative;
  padding-bottom: 56.2%;
`

const StyledNotificationContainer = styled(Box)`
  padding: 10%;
  box-sizing: content-box;
  min-width: unset;
  min-height: unset;
`

const StyledLayer = styled(Layer)`
  width: 100%;
  box-sizing: content-box;
`

export const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const defaultWeight = productData?.options?.[1]?.values[0]

  const [favorite, setFavorite] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState(defaultWeight)
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')
  const router = useRouter()
  const [cartNotification, setCartNotification] = useState(false)

  const addToCartMutation = useMutation(
    async () =>
      await swell.cart.addItem({
        product_id: productData?.id,
        quantity: 1,
        options: [
          { name: 'Plan', value: 'Monthly' },
          { name: 'Weight', value: selectedWeight.name },
          { name: 'Delivery', value: 'delivery' },
        ],
      }),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const onClickCard: MouseEventHandler = (event) => {
    router.push('/shop/' + productData.id)
  }

  const onAddToCart = () => {
    console.log('adding to cart')
    addToCartMutation.mutateAsync()
    setCartNotification(true)
    setTimeout(() => {
      setCartNotification(false)
    }, 1000)
  }

  const addToCartButtonRef = useRef(undefined)

  return (
    <Box
      width={size === 'small' ? '100%' : size === 'medium' ? '50%' : '33%'}
      align='center'
      justify='center'
      pad={
        size === 'small'
          ? { vertical: 'medium' }
          : size === 'medium'
          ? 'small'
          : 'small'
      }
    >
      <Card
        round='none'
        border='all'
        elevation='none'
        fill='horizontal'
        background='light-2'
        onClick={() => true}
      >
        <StyledImageWrapper onClick={onClickCard} fill='horizontal'>
          <StyledImage src={productData.images?.[0]?.file.url} />
        </StyledImageWrapper>

        <CardBody responsive={false} pad='medium' height='medium'>
          <Box onClick={onClickCard}>
            <Box direction='row' align='start' justify='between'>
              <Heading margin='none' level='3'>
                {productData?.name}
              </Heading>
              <StyledIconButton
                icon={
                  favorite ? (
                    <StyledFavorite color='brand' />
                  ) : (
                    <Favorite color='brand' />
                  )
                }
                hoverIndicator
                onClick={() => {
                  setFavorite(!favorite)
                }}
              />
            </Box>

            <Box pad={{ vertical: 'xsmall' }}>
              <Text>{productData?.price} DKK / kg</Text>
            </Box>
          </Box>
          <CardFooter>
            <Box
              direction='row'
              align='end'
              justify={
                productData?.options && productData?.options?.[1]
                  ? 'between'
                  : 'end'
              }
              fill='horizontal'
              wrap
            >
              {productData?.options && productData?.options?.[1] && (
                <StyledSelect
                  options={productData?.options?.[1]?.values}
                  defaultValue={defaultWeight}
                  valueKey='id'
                  labelKey='name'
                  onChange={({ value }) => {
                    console.log(value)
                    setSelectedWeight(value)
                  }}
                />
              )}

              <Button
                primary
                size={
                  size === 'large'
                    ? 'medium'
                    : size === 'medium'
                    ? 'small'
                    : 'medium'
                }
                margin={{ top: 'small' }}
                label={t('shop.addToCart')}
                onClick={onAddToCart}
                //@ts-ignore
                ref={addToCartButtonRef}
              />

              {cartNotification && (
                <StyledLayer
                  plain
                  style={{ top: '150%' }}
                  onEsc={() => setCartNotification(false)}
                  onClickOutside={() => setCartNotification(false)}
                  target={addToCartButtonRef.current}
                  position='top'
                  modal={false}
                >
                  <StyledNotificationContainer
                    fill
                    background='brand'
                    pad='small'
                  >
                    <Text color='light-2'>Added to cart!</Text>
                  </StyledNotificationContainer>
                </StyledLayer>
              )}
            </Box>
          </CardFooter>
        </CardBody>
      </Card>
    </Box>
  )
}
