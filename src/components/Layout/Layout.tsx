import { Box, ResponsiveContext } from 'grommet'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Routes } from 'src/routes'

import { Breadcrumbs, Footer, Navbar } from '@/components'

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = (props) => {
  const size = useContext(ResponsiveContext)
  const router = useRouter()

  return (
    <Box>
      <Navbar />
      <Box
        background='light-3'
        pad={
          size == 'small'
            ? { top: '70px' }
            : size == 'medium'
            ? { top: '146px' }
            : { top: '136px' }
        }
      >
        {router.route !== Routes.home.path && <Breadcrumbs />}
        {props.children}
      </Box>
      <Footer />
    </Box>
  )
}
