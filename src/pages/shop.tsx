import {
  Anchor,
  Box,
  Button,
  Heading,
  Layer,
  Main,
  Nav,
  ResponsiveContext,
  Select,
  Sidebar,
  Spinner,
  Text,
  TextInput,
} from 'grommet'
import { Menu } from 'grommet-icons'
import debounce from 'lodash/debounce'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { Routes } from 'src/routes'
import styled from 'styled-components'
import swell from 'swell-js'

import { ProductCard } from '@/components'

interface ShopProps {}

type Category = any

type Product = any

interface DesktopSideBarProps {
  categoriesQuery: any
  onCategoryChange: (category: Category) => void
  selectedCategory: any
}

interface MobileSideBarProps {
  categoriesQuery: any
  onCategoryChange: (category: Category) => void
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  menuOpen: boolean
  selectedCategory: Category
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(locale && (await serverSideTranslations(locale, ['common']))),
  },
})

const StyledSelect = styled(Select)`
  width: 75px;
`

const DesktopSidebar = ({
  categoriesQuery,
  onCategoryChange,
  selectedCategory,
}: DesktopSideBarProps) => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('common')

  return (
    <Sidebar
      width={size === 'medium' ? '30%' : '25%'}
      responsive={false}
      border='vertical'
      pad='medium'
      background='light-2'
      gap='large'
    >
      <Heading level='3' margin='none'>
        {t('shop.categories')}
      </Heading>
      <Box pad={{ vertical: 'small' }}>
        <Anchor
          size='medium'
          color={selectedCategory?.id === undefined ? 'brand' : 'neutral-3'}
          label={t('shop.all')}
          onClick={() => onCategoryChange({ slug: '' })}
        />
      </Box>
      {categoriesQuery.data?.results.map((category: Category) => (
        <Box key={category.id} pad={{ vertical: 'small' }}>
          <Anchor
            size='medium'
            color={selectedCategory?.id === category.id ? 'brand' : 'neutral-3'}
            label={category.name}
            onClick={() => onCategoryChange(category)}
          />
        </Box>
      ))}
    </Sidebar>
  )
}

const MobileSidebar = ({
  categoriesQuery,
  onCategoryChange,
  setMenuOpen,
  menuOpen,
  selectedCategory,
}: MobileSideBarProps) => {
  const { t } = useTranslation('common')

  return (
    <>
      {menuOpen && (
        <Layer
          onClickOutside={() => setMenuOpen(!menuOpen)}
          full='vertical'
          responsive={false}
          position='left'
          margin={{ top: '70px' }}
        >
          <Sidebar
            responsive={false}
            background='light-2'
            color='neutral-3'
            pad='none'
          >
            <Nav
              pad={{ horizontal: 'medium', top: 'medium' }}
              justify='start'
              responsive={false}
              gap='none'
            >
              <Heading level='3' margin='none'>
                {t('shop.categories')}
              </Heading>
              <Box pad={{ vertical: 'small' }}>
                <Anchor
                  size='small'
                  color={
                    selectedCategory?.id === undefined ? 'brand' : 'neutral-3'
                  }
                  label={t('shop.all')}
                  onClick={() => onCategoryChange('')}
                />
              </Box>
              <Box>
                {categoriesQuery.data?.results.map((category: Category) => (
                  <Box key={category.id} pad={{ vertical: 'small' }}>
                    <Anchor
                      size='small'
                      color={
                        selectedCategory?.id === category.id
                          ? 'brand'
                          : 'neutral-3'
                      }
                      label={category.name}
                      onClick={() => {
                        onCategoryChange(category)
                        setMenuOpen(false)
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Nav>
          </Sidebar>
        </Layer>
      )}
    </>
  )
}

const Shop: React.FC<ShopProps> = () => {
  const size = useContext(ResponsiveContext)
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('')
  const [category, setCategory] = useState(null)
  const { t } = useTranslation('common')

  const categoriesQuery = useQuery(
    'categories',
    async () => await swell.categories.list(),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const productsQuery = useQuery(
    ['products', router.query.category, search, sort],
    async () =>
      await swell.products.list({
        search,
        sort: getSort(sort),
        category: router.query.category || '',
      }),
    {
      onSuccess: (data) => console.log(data),
    }
  )

  const onCategoryChange = (category: Category) => {
    setCategory(category)
    router.push(Routes.shop.path + '?category=' + category.slug)
  }

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value)
    }, 300),
    []
  )

  const getSort = (sort: string) => {
    switch (sort) {
      case 'priceAsc':
        return 'price+asc'

      case 'priceDesc':
        return 'price+desc'

      default:
        return 'name+asc'
    }
  }

  const filterOptions = [
    { label: t('shop.name'), value: 'name' },
    { label: t('shop.priceAsc'), value: 'priceAsc' },
    { label: t('shop.priceDesc'), value: 'priceDesc' },
  ]

  return (
    <Box fill='horizontal'>
      <Nav
        direction='row'
        pad={{ horizontal: 'pageMargin', vertical: 'medium' }}
        border='horizontal'
        justify={size === 'small' ? 'between' : 'end'}
        align='center'
        background='light-2'
      >
        {size === 'small' && (
          <Button
            plain
            icon={<Menu />}
            label={t('shop.categories')}
            onClick={() => setMenuOpen(true)}
          />
        )}

        <Box direction='row' align='center' gap='small'>
          {size !== 'small' && <Text size='xsmall'>{t('shop.sortBy')}</Text>}
          <StyledSelect
            options={filterOptions}
            onChange={({ value }) => {
              setSort(value.value)
            }}
            defaultValue={filterOptions[0]}
            valueKey='value'
            labelKey='label'
          />
          <Box>
            <TextInput
              onChange={(event) => debouncedSearch(event.target.value)}
              placeholder={t('shop.search')}
            />
          </Box>
        </Box>
      </Nav>
      <Box
        direction='row'
        width={{ min: '100%' }}
        pad={{ horizontal: 'pageMargin' }}
        justify={size === 'small' ? 'center' : 'between'}
        gap='medium'
      >
        {size !== 'small' ? (
          <DesktopSidebar
            categoriesQuery={categoriesQuery}
            onCategoryChange={onCategoryChange}
            selectedCategory={category}
          />
        ) : (
          <MobileSidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            categoriesQuery={categoriesQuery}
            onCategoryChange={onCategoryChange}
            selectedCategory={category}
          />
        )}

        <Main
          width={size === 'small' ? '100%' : '70%'}
          align='center'
          justify='start'
          pad={{ vertical: 'medium' }}
        >
          {productsQuery.isLoading && <Spinner size='medium' />}
          <Box fill='horizontal' direction='row' justify='start' wrap>
            {productsQuery.data?.results.map((product: Product) => (
              <ProductCard key={product.id} productData={product} />
            ))}
          </Box>
        </Main>
      </Box>
    </Box>
  )
}

export default Shop
