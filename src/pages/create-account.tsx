import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface CreateAccountProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const CreateAccount: React.FC<CreateAccountProps> = () => {
  return <div>CreateAccount</div>
}

export default CreateAccount
