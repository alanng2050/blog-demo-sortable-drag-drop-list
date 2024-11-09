import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { ExpandedMenu, Menu } from './ExpandedMenu'
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from './constants'
import { useStoreDispatch, useStoreState } from '@/store'

export const SideBar = () => {
  const expanded = useStoreState((s) => s.layout.expanded)
  const openMobileSidebar = useStoreState((s) => s.layout.openMobileSidebar)
  const dispatch = useStoreDispatch()
  const onClose = () => dispatch.layout.toggleMobileMenu(false)

  return (
    <>
      <Drawer isOpen={openMobileSidebar} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader sx={{ ml: 6 }}>Logo here</DrawerHeader>

          <DrawerBody>
            <Menu expanded />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box
        sx={{
          flexShrink: 0,
          width: {
            base: 0,
            lg: SIDEBAR_COLLAPSED_WIDTH,
            xl: expanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          },
          overflow: 'hidden',
          display: {
            base: 'none',
            lg: 'block',
          },
        }}
      >
        <ExpandedMenu />
      </Box>
    </>
  )
}
