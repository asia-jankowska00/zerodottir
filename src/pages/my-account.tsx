import {
  Box,
  Button,
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
import styled from 'styled-components'
import swell from 'swell-js'

import { Routes } from '@/routes'

interface MyAccountProps {}

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

const MyAccount: React.FC<MyAccountProps> = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()

  const accountQuery = useQuery(
    'account',
    async () => await swell.account.get(),
    {
      onSuccess: (data) => {
        if (!data) router.push(Routes.home.path as string)
        console.log(data)
      },
    }
  )

  const ordersQuery = useQuery(
    'orders',
    async () => await swell.account.listOrders(),
    {
      onSuccess: (data) => console.log('orders', data),
      enabled: !!accountQuery.data,
    }
  )

  const logoutMutation = useMutation(async () => await swell.account.logout(), {
    onSuccess: async (data) => {
      console.log('logged out', data)
      await queryClient.refetchQueries('account')
      router.push(Routes.home.path as string)
    },
  })

  if (accountQuery.isLoading)
    return (
      <Box align='center' pad='xlarge'>
        <Spinner size='medium' />
      </Box>
    )

  return (
    <Main pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}>
      <Box align='end'>
        <Button
          primary
          onClick={() => {
            logoutMutation.mutateAsync()
          }}
          label='Logout'
        />
      </Box>

      {accountQuery.data && ordersQuery.data && (
        <>
          <Heading level='2'>{t('account.mySubscriptions')}</Heading>
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
              {ordersQuery.data?.results?.map((result) =>
                result.items.map((item) => {
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
                })
              )}
            </TableBody>
          </Table>
        </>
      )}
    </Main>
  )
}

export default MyAccount
