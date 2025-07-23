import { IconDashboard, IconReport } from '@tabler/icons-react'

export const useSidebarData = () => {
  const data = {
    menu: [
      {
        name: 'About',
        url: '/',
        icon: IconDashboard,
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: IconReport,
      },
    ],
  }

  return data
}
