import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface WhatWeDoProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const WhatWeDo: React.FC<WhatWeDoProps> = () => {
  return <div>WhatWeDo</div>
}

export default WhatWeDo
