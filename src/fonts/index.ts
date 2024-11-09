import { Roboto_Serif } from 'next/font/google'

// export const carioFont = Cairo({ subsets: ['latin'], variable: '--font-cario' })
export const robotoFont = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300'],
})

export const roboto400Font = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400'],
})
