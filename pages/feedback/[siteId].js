import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import FeedbackTable from '@/components/FeedbackTable'
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader'
import Page from '@/components/Page'
import { useRouter } from 'next/router'

const SiteFeedback = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const { data } = useSWR(user ? { url: `/api/feedback/${query.siteId}`, token: user.token } : null, fetcher)

  if(!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
        <SiteFeedbackTableHeader siteName={data.site.name} />
        { data.feedback?.length > 0 ? (
            <FeedbackTable allFeedback={data.feedback}/> 
        ) : (
            <EmptyState />
        )}
    </DashboardShell>
  )
}

const SiteFeedbackPage = () => (
  <Page name="Name of Site Feedback" path="/feedback">
    <SiteFeedback />
  </Page>
)


export default SiteFeedbackPage