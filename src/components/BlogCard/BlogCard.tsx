import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
} from 'grommet'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface Blog {
  id: string
  title: string
  summary: number
  images: any
}

interface BlogCardProps {
  blogData?: Partial<Blog>
}

const StyledImage = styled(Image)`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const StyledImageWrapper = styled(Box)`
  position: relative;
  padding-bottom: 56.2%;
`

export const BlogCard: React.FC<BlogCardProps> = ({ blogData }) => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')
  const router = useRouter()

  const onClickCard = () => {
    router.push('/blog/' + blogData?.id)
  }

  return (
    <Box
      width={size === 'small' ? '100%' : size === 'medium' ? '50%' : '33%'}
      align='center'
      justify='center'
      pad={
        size === 'small'
          ? { vertical: 'medium' }
          : size === 'medium'
          ? 'small'
          : 'small'
      }
    >
      <Card
        round='none'
        border='all'
        elevation='none'
        fill='horizontal'
        background='light-2'
        onClick={onClickCard}
      >
        <StyledImageWrapper fill='horizontal'>
          {/* <StyledImage src={blogData.images[0].file.url} /> */}
          <StyledImage src='/home/background.jpg' />
        </StyledImageWrapper>

        <CardBody responsive={false} pad='medium' height='medium'>
          <Box>
            <Box direction='row' align='start' justify='between'>
              <Heading margin='none' level='3'>
                blogData?.title
              </Heading>
            </Box>

            <Box pad={{ vertical: 'xsmall' }}>
              <Paragraph>blogData?.summary</Paragraph>
            </Box>
          </Box>
          <CardFooter>
            <Box
              direction='row'
              align='end'
              justify={'end'}
              fill='horizontal'
              wrap
            >
              <Button
                size={
                  size === 'large'
                    ? 'medium'
                    : size === 'medium'
                    ? 'small'
                    : 'medium'
                }
                margin={{ top: 'small' }}
                label={t('blog.readMore')}
                onClick={onClickCard}
              />
            </Box>
          </CardFooter>
        </CardBody>
      </Card>
    </Box>
  )
}
