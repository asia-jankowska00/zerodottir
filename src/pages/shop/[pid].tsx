import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Image,
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
import { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
//@ts-ignore
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

const Product: React.FC<ProductProps> = () => {
  const size = useContext(ResponsiveContext)
  const router = useRouter()
  const [favorite, setFavorite] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number[]>([1, 2])

  const { t } = useTranslation('common')

  const productQuery = useQuery(
    ['product', router.query.pid],
    async () => await swell.products.get(router.query.pid),
    {
      onSuccess: (data) => console.log(data),
    }
  )

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
            <StyledImage src={productQuery.data?.images[0].file.url} />
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
            <Text>{productQuery.data?.price} dkk / kg</Text>
          </Box>

          <Box
            direction='row'
            align='end'
            justify={
              productQuery.data?.options && productQuery.data?.options?.[1]
                ? 'start'
                : 'end'
            }
            fill='horizontal'
            pad={{ vertical: 'large' }}
            gap='small'
            wrap
          >
            {productQuery.data?.options && productQuery.data?.options?.[1] && (
              <StyledSelect
                options={productQuery.data?.options?.[1].values}
                defaultValue={productQuery.data?.options?.[1].values[0]}
                valueKey='id'
                labelKey='name'
              />
            )}

            <StyledSelect
              options={productQuery.data?.options?.[0].values}
              defaultValue={productQuery.data?.options?.[0].values[0]}
              valueKey='id'
              labelKey='name'
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
            />

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
                <Text>{t('product.ingredients')}</Text>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={t('product.description')}>
              <Box pad='medium' background='light-2'>
                <Text>{productQuery.data?.description}</Text>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={t('product.origin')}>
              <Box pad='medium' background='light-2'>
                <Text>{t('product.origin')}</Text>
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
