export const env = {
  IS_IN_PRODUCTION: process.env.NODE_ENV === 'production',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
} as const
