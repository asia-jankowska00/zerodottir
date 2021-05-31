import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface BlogPostProps {}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const BlogPost: React.FC<BlogPostProps> = () => {
  return <div>BlogPost</div>
}

export default BlogPost
