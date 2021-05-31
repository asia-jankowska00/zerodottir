import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface SavedProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const Saved: React.FC<SavedProps> = () => {
  return <div>Saved</div>
}

export default Saved
