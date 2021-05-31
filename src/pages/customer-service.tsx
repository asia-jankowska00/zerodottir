import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface CustomerServiceProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const CustomerService: React.FC<CustomerServiceProps> = () => {
  return <div>CustomerService</div>
}

export default CustomerService
