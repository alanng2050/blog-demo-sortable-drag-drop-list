import { HStack, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { AppBar } from '@/components/AppBar'
import { Logo } from '@/components/AppBar/Logo'
import { Lang } from '@/components/AppBar/Lang'
import { DarkMode } from '@/components/AppBar/DarkMode'

export const Public = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      sx={{
        minHeight: '100vh',
        bgColor: 'hover',
      }}
    >
      <AppBar>
        <Logo />
        <HStack
          sx={{
            flex: 1,
            ml: 2,
            display: {
              base: 'none',
              md: 'flex',
            },
          }}
        >
          <Link href="/product">Product</Link>
          <Link href="/about">About</Link>
        </HStack>
        <HStack>
          <DarkMode />
          <Lang />
        </HStack>
      </AppBar>
      {children}
    </Stack>
  )
}
