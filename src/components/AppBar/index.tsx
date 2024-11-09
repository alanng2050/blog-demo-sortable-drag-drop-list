import { HStack, SystemStyleObject } from '@chakra-ui/react'

export const AppBar = ({
  children,
  sx,
}: {
  children: React.ReactNode
  sx?: SystemStyleObject
}) => {
  return (
    <HStack
      sx={{
        zIndex: 1000,
        position: 'sticky',
        width: '100%',
        top: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        height: 70,
        ...sx,
      }}
    >
      {children}
    </HStack>
  )
}
