// import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
// import EmptyState from '@/components/EmptyState'
// import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
// import fetcher from '@/utils/fetcher'
// import SiteTable from '@/components/SiteTable'
// import SiteTableHeader from '@/components/SiteTableHeader'
import { createCheckoutSession, goToBillingPortal } from '@/lib/db'
import { Box, Button } from '@chakra-ui/react'

const Account = () => {
  const { user } = useAuth()
//   const { data } = useSWR(user ? { url: "/api/sites", token: user.token } : null, fetcher)

//   if(!data) {
//     return (
//       <DashboardShell>
//         <SiteTableHeader />
//         <SiteTableSkeleton />
//       </DashboardShell>
//     )
//   }

  return (
    <DashboardShell>
        <Box>
            <Button 
                variant="solid" 
                size="md" 
                backgroundColor="#000000"
                color='#ffffff' 
                mt={4} 
                onClick={() => createCheckoutSession(user.uid)}
            >
                Upgrade to Starter
            </Button>
            <Button 
                variant="solid" 
                size="md" 
                backgroundColor="#000000"
                color='#ffffff' 
                mt={4}
                ml={4} 
                onClick={() => goToBillingPortal()}
            >
                View Billing Portal
            </Button>
        </Box>
    </DashboardShell>
  )
}

export default Account

