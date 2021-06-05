export const Routes: Record<RouteKey, Route> = {
  blog: {
    name: 'blog',
    path: '/blog' as string,
  },
  cart: {
    name: 'cart',
    path: '/cart',
  },
  checkout: {
    cart: {
      name: 'cart',
      path: '/checkout/cart',
    },
    account: {
      name: 'account',
      path: '/checkout/account',
    },
    payment: {
      name: 'payment',
      path: '/checkout/payment',
    },
    confirmation: {
      name: 'confirmation',
      path: '/checkout/confirmation',
    },
  } as unknown as Route,
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
  myAccount: {
    name: 'myAccount',
    path: '/my-account',
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

export type NestedRoute = {
  [key: string]: Route
}
