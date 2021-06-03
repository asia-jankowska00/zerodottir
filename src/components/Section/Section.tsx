/*eslint-disable no-useless-escape*/
import {
  Box,
  Button,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
} from 'grommet'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import styled from 'styled-components'

interface SectionProps {
  index: number
  pageName: string
  pageSlug: string
  dark?: boolean
  twoParagraphs?: boolean
  buttonLink?: string
  stepSvg?: boolean
  button?: JSX.Element
}

const StyledImage = styled(Image)`
  max-height: 500px;
`

const SectionLight = ({
  index,
  twoParagraphs,
  buttonLink,
  stepSvg,
  pageName,
  pageSlug,
  button,
}: SectionProps) => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <Box
      pad={{ horizontal: 'pageMargin' }}
      background='light-2'
      direction={size === 'small' ? 'column' : 'row'}
    >
      <Box
        width={size === 'small' ? '100%' : '50%'}
        align='start'
        pad={{ vertical: 'xlarge' }}
      >
        <Heading level='2' size='large'>
          {t(`${pageName}.section${index}.heading`)}
        </Heading>
        {twoParagraphs ? (
          <>
            <Paragraph color='dark-2'>
              {t(`${pageName}.section${index}.paragraph1`)}
            </Paragraph>
            <Paragraph color='dark-2'>
              {t(`${pageName}.section${index}.paragraph2`)}
            </Paragraph>
          </>
        ) : (
          <Paragraph color='dark-2'>
            {t(`${pageName}.section${index}.paragraph`)}
          </Paragraph>
        )}
        {buttonLink && (
          <Link href={buttonLink}>
            <Button
              primary
              size='large'
              label={t(`${pageName}.section${index}.button`)}
              as='a'
            />
          </Link>
        )}
        {button}
      </Box>
      {stepSvg ? (
        <Box
          width={size === 'small' ? '100%' : '50%'}
          pad={{ horizontal: 'medium', vertical: 'xlarge' }}
        >
          <StyledImage fit='contain' src={`/${pageSlug}/step-${index}.\svg`} />
        </Box>
      ) : (
        <Box
          width={size === 'small' ? '100%' : '50%'}
          pad={size !== 'small' ? { left: 'xlarge' } : 'none'}
        >
          {size === 'small' ? (
            <Image fit='contain' src={`/${pageSlug}/section-${index}-m.jpg`} />
          ) : (
            <Image
              fill='vertical'
              fit='contain'
              src={`/${pageSlug}/section-${index}.jpg`}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

const SectionDark = ({
  index,
  twoParagraphs,
  buttonLink,
  stepSvg,
  pageName,
  pageSlug,
  button,
}: SectionProps) => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <Box
      pad={{ horizontal: 'pageMargin' }}
      background='neutral-3'
      direction={size === 'small' ? 'column-reverse' : 'row'}
    >
      {stepSvg ? (
        <Box
          width={size === 'small' ? '100%' : '50%'}
          pad={{ horizontal: 'medium', vertical: 'xlarge' }}
        >
          <StyledImage fit='contain' src={`/${pageSlug}/step-${index}.\svg`} />
        </Box>
      ) : (
        <Box
          width={size === 'small' ? '100%' : '50%'}
          pad={size !== 'small' ? { right: 'xlarge' } : 'none'}
        >
          {size === 'small' ? (
            <Image fit='contain' src={`/${pageSlug}/section-${index}-m.jpg`} />
          ) : (
            <Image fit='contain' src={`/${pageSlug}/section-${index}.jpg`} />
          )}
        </Box>
      )}

      <Box
        width={size === 'small' ? '100%' : '50%'}
        align='start'
        pad={{ vertical: 'xlarge' }}
      >
        <Heading level='2' size='large'>
          {t(`${pageName}.section${index}.heading`)}
        </Heading>
        {twoParagraphs ? (
          <>
            <Paragraph color='light-2'>
              {t(`${pageName}.section${index}.paragraph1`)}
            </Paragraph>
            <Paragraph color='light-2'>
              {t(`${pageName}.section${index}.paragraph2`)}
            </Paragraph>
          </>
        ) : (
          <Paragraph color='light-2'>
            {t(`${pageName}.section${index}.paragraph`)}
          </Paragraph>
        )}
        {buttonLink && (
          <Link href={buttonLink}>
            <Button
              primary
              size='large'
              label={t(`${pageName}.section${index}.button`)}
              as='a'
            />
          </Link>
        )}
        {button}
      </Box>
    </Box>
  )
}

export const Section: React.FC<SectionProps> = (props) => {
  return props.dark ? <SectionDark {...props} /> : <SectionLight {...props} />
}
