import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Image,
  Layer,
  Paragraph,
  ResponsiveContext,
  Select,
  Spinner,
  Text,
} from 'grommet'
import { Favorite } from 'grommet-icons'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useContext, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import styled from 'styled-components'
import swell from 'swell-js'

interface ProductProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const StyledSelect = styled(Select)`
  width: 75px;
`

const StyledBox = styled(Box)`
  min-height: 80vh;
`

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

const StyledFavorite = styled(Favorite)`
  & *[stroke*='#'] {
    fill: #8aa53f;
  }
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

const Product: React.FC<ProductProps> = () => {
  const size = useContext(ResponsiveContext)
  const router = useRouter()
  const [favorite, setFavorite] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number[]>([1, 2])
  const [cartNotification, setCartNotification] = useState(false)

  const { t } = useTranslation('common')

  const productQuery = useQuery(
    ['product', router.query.pid],
    async () => await swell.products.get(router.query.pid),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const addToCartMutation = useMutation(
    async () =>
      await swell.cart.addItem({
        product_id: productQuery.data?.id,
        quantity: 1,
        options: [
          { name: 'Plan', value: selectedPlan?.name },
          { name: 'Weight', value: selectedWeight?.name },
          { name: 'Delivery', value: 'delivery' },
        ],
      }),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const weightOptions = productQuery.data?.options?.[1]?.values
  const planOptions = productQuery.data?.options?.[0]?.values

  const [selectedWeight, setSelectedWeight] = useState(weightOptions?.[0])
  const [selectedPlan, setSelectedPlan] = useState(planOptions?.[0])

  const onAddToCart = () => {
    console.log('adding to cart')
    addToCartMutation.mutateAsync()
    setCartNotification(true)
    setTimeout(() => {
      setCartNotification(false)
    }, 1000)
  }

  // const similarProductsQuery = useQuery(
  //   ['similar', router.query.pid],
  //   async () => await swell.products.get({
  //     category: productQuery.data?.
  //   }),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     enabled: !!productQuery.data,
  //   }
  // )

  const addToCartButtonRef = useRef(undefined)

  if (productQuery.isLoading)
    return (
      <Box pad='xlarge' align='center'>
        <Spinner size='medium' />
      </Box>
    )

  return (
    <>
      <StyledBox
        direction={size === 'small' ? 'column' : 'row'}
        pad={{ horizontal: 'pageMargin', bottom: 'large' }}
      >
        <Box width={size === 'small' ? '100%' : '50%'}>
          <StyledImageWrapper>
            <StyledImage src={productQuery.data?.images?.[0]?.file?.url} />
          </StyledImageWrapper>
        </Box>

        <Box
          margin={size === 'small' ? 'none%' : { left: 'large' }}
          pad='large'
          width={size === 'small' ? '100%' : '50%'}
          background='light-2'
        >
          <Heading margin='none' level='1'>
            {productQuery.data?.name}
          </Heading>

          <Box pad={{ vertical: 'medium' }}>
            <Text>{productQuery.data?.price} DKK / kg</Text>
          </Box>

          <Box
            direction='row'
            align='end'
            justify={planOptions ? 'start' : 'end'}
            fill='horizontal'
            pad={{ vertical: 'large' }}
            gap='small'
            wrap
          >
            {weightOptions && (
              <StyledSelect
                options={weightOptions}
                defaultValue={weightOptions[0]}
                valueKey='id'
                labelKey='name'
                onChange={({ value }) => {
                  console.log(value)
                  setSelectedWeight(value)
                }}
              />
            )}

            <StyledSelect
              options={planOptions}
              defaultValue={planOptions[0]}
              valueKey='id'
              labelKey='name'
              onChange={({ value }) => {
                console.log(value)
                setSelectedPlan(value)
              }}
            />

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

            <Button
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

          <Accordion
            multiple
            activeIndex={activeIndex}
            onActive={(indices) => setActiveIndex(indices)}
          >
            <AccordionPanel label={t('product.ingredients')}>
              <Box pad='medium' background='light-2'>
                <Paragraph>{productQuery.data?.content?.ingredients}</Paragraph>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={t('product.description')}>
              <Box pad='medium' background='light-2'>
                <Paragraph>{productQuery.data?.description}</Paragraph>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={t('product.origin')}>
              <Box pad='medium' background='light-2'>
                <Paragraph>{productQuery.data?.content?.origin}</Paragraph>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </StyledBox>

      <Box
        fill='horizontal'
        pad={{ horizontal: 'pageMargin', vertical: 'large' }}
        background='neutral-3'
        margin={{ bottom: 'large' }}
      ></Box>
    </>
  )
}

export default Product
