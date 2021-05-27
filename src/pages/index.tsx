import { Heading, Button } from 'grommet'
import { NextSeo } from 'next-seo'

export default function Home(): JSX.Element {
  return (
    <>
      <NextSeo title='Home' />
      <Heading level='1' size='large'>
        Hello world
      </Heading>
      <Button primary size='large' label='button' />
    </>
  )
}

Home.layoutProps = {
  Layout: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  ) => <div {...props} />,
}
