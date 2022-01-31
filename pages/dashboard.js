import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? { url: "/api/sites", token: user.token } : null, fetcher)

  if(!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      { data.sites?.length > 0 ? <SiteTable sites={data.sites}/> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard