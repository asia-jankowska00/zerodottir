import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  ResponsiveContext,
  Select,
  Text,
} from 'grommet'
import { Favorite } from 'grommet-icons'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

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

export const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const [favorite, setFavorite] = useState(false)
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')
  const router = useRouter()

  const onClickCard = () => {
    router.push('/shop/' + productData.id)
  }

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
        onClick={onClickCard}
      >
        <StyledImageWrapper fill='horizontal'>
          <StyledImage src={productData.images[0].file.url} />
        </StyledImageWrapper>

        <CardBody responsive={false} pad='medium' height='medium'>
          <Box>
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
              <Text>{productData?.price} dkk / kg</Text>
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
                  options={productData?.options?.[1].values}
                  defaultValue={productData?.options?.[1].values[0]}
                  valueKey='id'
                  labelKey='name'
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
              />
            </Box>
          </CardFooter>
        </CardBody>
      </Card>
    </Box>
  )
}
