import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { Routes } from 'src/routes'

interface PaymentProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const Payment: React.FC<PaymentProps> = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const onSubmit = async () => {
    router.push(Routes.checkout['confirmation'].path)
  }

  return (
    <>
      <NextSeo title={t('navigation.payment')} />
      <Main pad={{ horizontal: 'pageMargin', bottom: 'xlarge' }}>
        <Heading level='2'>{t('payment.payment')}</Heading>

        <Box width='large'>
          <Form validate='blur' onSubmit={onSubmit}>
            <FormField
              label={t('account.cardNumber')}
              name='cardNumber'
              required
            >
              <TextInput name='cardNumber' type='text' />
            </FormField>

            <Box direction='row' gap='medium' justify='start'>
              <FormField
                label={t('account.expirationMonth')}
                name='expirationMonth'
                required
              >
                <TextInput name='expirationMonth' type='text' />
              </FormField>
              <FormField
                label={t('account.expirationYear')}
                name='expirationYear'
                required
              >
                <TextInput name='expirationYear' type='text' />
              </FormField>
              <FormField label={t('account.cvv')} name='cvv' required>
                <TextInput name='cvv' type='text' />
              </FormField>
            </Box>

            <Box direction='row' justify='between' margin={{ top: 'medium' }}>
              <Button type='submit' label={t('payment.submit')} primary />
            </Box>
          </Form>
        </Box>
      </Main>
    </>
  )
}

export default Payment
