import { Box, Flex, Text, Stack } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { useRoute } from '../useRoute'
import { SIDEBAR_WIDTH } from './constants'
import { useStoreDispatch, useStoreState } from '@/store'

export const Menu = ({ expanded }: { expanded: boolean }) => {
  const { menu } = useRoute()
  const dispatch = useStoreDispatch()

  const closeMobileMenu = () => dispatch.layout.toggleMobileMenu(false)

  return (
    <Stack
      sx={{
        '& .sidebar-item': {
          flexDirection: {
            lg: 'column',
            xl: 'row',
          },
          alignItems: 'center',
          fontSize: {
            lg: 'sm',
            xl: 'md',
          },
          color: 'gray',
          py: 3,
          borderRadius: 2,
          '& svg': {
            fill: 'gray',
          },

          '&:hover, &.active': {
            color: 'second',
            bgColor: 'primary',
            '& svg': {
              fill: 'second',
            },
          },
        },
      }}
    >
      {/* ======== main menu ========== */}
      <Box sx={{ mt: 6 }}>
        {menu.map((item) => (
          <Flex
            className={item.className}
            key={item.name}
            as={Link}
            href={item.path}
            onClick={closeMobileMenu}
          >
            <Box as={item.icon} sx={{ mr: 6, ml: 5 }} />
            <Text>{item.name}</Text>
          </Flex>
        ))}
      </Box>
    </Stack>
  )
}

export const ExpandedMenu = () => {
  const expanded = useStoreState((s) => s.layout.expanded)

  return (
    <Box
      sx={{
        width: {
          lg: 'auto',
          xl: expanded ? SIDEBAR_WIDTH : 'auto',
        },
        position: 'fixed',

        px: 4,
        pb: 7,

        background: '#fff',
        height: `100vh`,
      }}
    >
      <Menu expanded={expanded} />
    </Box>
  )
}
