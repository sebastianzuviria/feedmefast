import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import SiteTable from '@/components/SiteTable'
import SiteTableHeader from '@/components/SiteTableHeader'
import UpgradeEmptyState from '@/components/UpgradeEmptyState'
import Page from '@/components/Page'

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? { url: "/api/sites", token: user.token } : null, fetcher)
  const isPaidAccount =  user?.stripeRole

  if(!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  if(data.sites?.length) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTable sites={data.sites}/>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount}/>
      { isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  )
}

const DashboardPage = () => (
  <Page name="Dashboard" path="/dashboard">
    <Dashboard />
  </Page>
)

export default DashboardPage