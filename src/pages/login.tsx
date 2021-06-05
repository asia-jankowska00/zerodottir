import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Main,
  Text,
  TextInput,
} from 'grommet'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation, useQueryClient } from 'react-query'
import { Routes } from 'src/routes'
import swell from 'swell-js'

interface LoginProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const Login: React.FC<LoginProps> = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const queryClient = useQueryClient()

  const loginMutation = useMutation<any, unknown, any>(
    async ({ email, password }) => await swell.account.login(email, password),
    {
      onSuccess: async (data) => {
        console.log('login', data)
        await swell.account.get()
        await queryClient.refetchQueries('cart')
        router.push(Routes.myAccount.path as string)
      },
    }
  )

  const onSubmit = async ({ value }) => {
    await loginMutation.mutateAsync(value)
  }

  return (
    <Main pad={{ horizontal: 'pageMargin', bottom: 'xlarge' }}>
      <Heading level='2'>{t('login.login')}</Heading>

      <Box width='medium'>
        <Form validate='blur' onSubmit={onSubmit}>
          <FormField label={t('account.email')} name='email' required>
            <TextInput name='email' type='email' />
          </FormField>

          <FormField label={t('account.password')} name='password' required>
            <TextInput name='password' type='password' />
          </FormField>

          <Box direction='row' justify='between' margin={{ top: 'medium' }}>
            <Button type='submit' label={t('login.login')} primary />
          </Box>
        </Form>

        <Box
          direction='row'
          width='medium'
          gap='small'
          pad={{ vertical: 'large' }}
        >
          <Text>{t('login.noAccount')}</Text>
          <Anchor
            size='medium'
            href={Routes.createAccount.path as string}
            label={t('navigation.createAccount')}
          />
        </Box>
      </Box>
    </Main>
  )
}

export default Login
