import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface HowItWorksProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const HowItWorks: React.FC<HowItWorksProps> = () => {
  return <div>HowItWorks</div>
}

export default HowItWorks
