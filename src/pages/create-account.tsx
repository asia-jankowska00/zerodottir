import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Main,
  Select,
  TextInput,
} from 'grommet'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useMutation } from 'react-query'
import swell from 'swell-js'

import { Routes } from '@/routes'

interface CreateAccountProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const CreateAccount: React.FC<CreateAccountProps> = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const updateCartShippingAndBillingMutation = useMutation<any, unknown, any>(
    async ({ firstName, lastName, address, city, postcode, phone }) =>
      await swell.cart.update({
        billing: {
          firstName,
          lastName,
          address1: address,
          city,
          zip: postcode,
          country: 'DK',
          phone,
        },
        shipping: {
          firstName,
          lastName,
          address1: address,
          city,
          zip: postcode,
          country: 'DK',
          phone,
        },
      }),
    {
      onSuccess: (data) => console.log('cart', data),
    }
  )

  const createAccountMutation = useMutation<any, unknown, any>(
    async ({ email, password, firstName, lastName }) =>
      await swell.account.create({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    {
      onSuccess: (data) => console.log('submitted account', data),
    }
  )

  const createAddressMutation = useMutation<any, unknown, any>(
    async ({ firstName, lastName, address, city, postcode, phone }) =>
      await swell.account.createAddress({
        name: firstName + ' ' + lastName,
        address1: address,
        city,
        zip: postcode,
        country: 'DK',
        phone,
      }),
    {
      onSuccess: (data) => console.log('submitted address', data),
    }
  )

  const onSubmit = async ({ value }) => {
    await createAccountMutation.mutateAsync(value)
    const { firstName, lastName, address, city, postcode, country, phone } =
      await createAddressMutation.mutateAsync(value)
    await updateCartShippingAndBillingMutation.mutateAsync({
      firstName,
      lastName,
      address,
      city,
      postcode,
      country,
      phone,
    })
    router.push(Routes.myAccount.path as string)
  }

  return (
    <>
      <NextSeo title={t('navigation.createAccount')} />
      <Main pad={{ horizontal: 'pageMargin', bottom: 'xlarge' }}>
        <Heading level='2'>{t('createAccount.createAccount')}</Heading>

        <Box width='large'>
          <Form validate='blur' onSubmit={onSubmit}>
            <Box direction='row' gap='medium' justify='between'>
              <FormField
                fill
                label={t('account.firstName')}
                name='firstName'
                required
              >
                <TextInput name='firstName' type='text' />
              </FormField>
              <FormField
                fill
                label={t('account.lastName')}
                name='lastName'
                required
              >
                <TextInput name='lastName' type='text' />
              </FormField>
            </Box>

            <FormField label={t('account.address')} name='address' required>
              <TextInput name='address' type='text' />
            </FormField>

            <Box direction='row' gap='medium' justify='between'>
              <FormField label={t('account.country')} name='country'>
                <Select disabled options={['Denmark']} defaultValue='Denmark' />
              </FormField>
              <FormField fill label={t('account.city')} name='city' required>
                <TextInput name='city' type='text' />
              </FormField>
              <FormField label={t('account.postcode')} name='postcode' required>
                <TextInput name='postcode' type='text' />
              </FormField>
            </Box>

            <FormField
              width='medium'
              label={t('account.phone')}
              name='phone'
              required
            >
              <TextInput name='phone' type='text' />
            </FormField>

            <Box pad={{ vertical: 'large' }}>
              <FormField
                width='medium'
                label={t('account.email')}
                name='email'
                required
              >
                <TextInput name='email' type='text' />
              </FormField>
              <FormField
                width='medium'
                label={t('account.password')}
                name='password'
                required
              >
                <TextInput name='password' type='password' />
              </FormField>
            </Box>

            <Box direction='row' justify='between' margin={{ top: 'medium' }}>
              <Button
                type='submit'
                label={t('createAccount.createAccount')}
                primary
              />
            </Box>
          </Form>
        </Box>
      </Main>
    </>
  )
}

export default CreateAccount
