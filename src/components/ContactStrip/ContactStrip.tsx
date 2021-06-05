import { Box, Button, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Routes } from '@/routes'

interface ContactStripProps {}

export const ContactStrip: React.FC<ContactStripProps> = () => {
  const { t } = useTranslation('common')

  return (
    <Box
      pad={{ horizontal: 'pageMargin', vertical: 'xlarge' }}
      background='neutral-2'
      align='center'
    >
      <Heading level='2' size='large'>
        {t('home.section7.heading')}
      </Heading>
      <Paragraph color='light-2'>{t('home.section7.paragraph')}</Paragraph>
      <Link href={Routes.contact.path}>
        <Button primary size='large' label={t('home.section7.button')} />
      </Link>
    </Box>
  )
}
