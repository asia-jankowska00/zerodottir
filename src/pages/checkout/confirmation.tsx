import {
  Box,
  Button,
  Form,
  Heading,
  Image,
  Main,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Routes } from 'src/routes'
import styled from 'styled-components'
import swell from 'swell-js'
interface ConfirmationProps {}

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

const Confirmation: React.FC<ConfirmationProps> = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()

  const cartQuery = useQuery('cart', async () => await swell.cart.get(), {
    onSuccess: (data) => console.log('cart', data),
  })

  const submitCartMutation = useMutation<unknown, unknown, void>(
    async () => await swell.cart.submitOrder(),
    {
      onSuccess: (data) => console.log('submitted cart', data),
    }
  )

  const onSubmit = async () => {
    await submitCartMutation.mutateAsync()
    await queryClient.refetchQueries(['account', 'orders'])
    router.push(Routes.myAccount.path as string)
  }

  return (
    <Main pad={{ horizontal: 'pageMargin', bottom: 'xlarge' }}>
      <Heading level='2'>{t('confirmation.confirmation')}</Heading>

      {cartQuery.isLoading && (
        <Box pad='xlarge' align='center'>
          <Spinner size='medium' />
        </Box>
      )}

      {cartQuery.data && (
        <>
          <Table margin={{ bottom: 'medium' }}>
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
              {cartQuery.data?.items.map((item) => {
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
                      <Text>{item.options[1].value}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.options[0].value}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.options[2].value}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.priceTotal}</Text>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </>
      )}
      <Box direction='row' margin={{ bottom: 'medium' }}>
        <Box>
          <Heading level='3'>{t('confirmation.address')}</Heading>
          <Text>{cartQuery.data?.billing.name}</Text>
          <Text>{cartQuery.data?.billing.address1}</Text>
          <Text>{cartQuery.data?.billing.city}</Text>
        </Box>
      </Box>

      <Box width='large'>
        <Form validate='blur' onSubmit={onSubmit}>
          <Box direction='row' justify='between' margin={{ top: 'medium' }}>
            <Button type='submit' label={t('confirmation.submit')} primary />
          </Box>
        </Form>
      </Box>
    </Main>
  )
}

export default Confirmation
