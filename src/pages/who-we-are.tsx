import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface WhoWeAreProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const WhoWeAre: React.FC<WhoWeAreProps> = () => {
  return <div>WhoWeAre</div>
}

export default WhoWeAre
