import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'

const MyFeedback = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? { url: "/api/feedback", token: user.token } : null, fetcher)

  if(!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
        <FeedbackTableHeader />
        { data.feedback?.length > 0 ? <FeedbackTable allFeedback={data.feedback}/> : <EmptyState />}
    </DashboardShell>
  )
}

export default MyFeedback