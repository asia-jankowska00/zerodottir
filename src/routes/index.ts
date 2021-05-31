export const Routes: Record<RouteKey, Route> = {
  blog: {
    name: 'blog',
    path: '/blog',
  },
  cart: {
    name: 'cart',
    path: '/cart',
  },
  contact: {
    name: 'contact',
    path: '/contact',
  },
  createAccount: {
    name: 'createAccount',
    path: '/create-account',
  },
  customerService: {
    name: 'customerService',
    path: '/customer-service',
  },
  home: {
    name: 'home',
    path: '/',
  },
  howItWorks: {
    name: 'howItWorks',
    path: '/how-it-works',
  },
  login: {
    name: 'myAccount',
    path: '/login',
  },
  saved: {
    name: 'saved',
    path: '/saved',
  },
  shop: {
    name: 'shop',
    path: '/shop',
  },
  whatWeDo: {
    name: 'whatWeDo',
    path: '/what-we-do',
  },
  whoWeAre: {
    name: 'whoWeAre',
    path: '/who-we-are',
  },
}

export type RouteKey = string

export type Route = {
  name: string
  path: string
}
