import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import PlansHeader from '@/components/PlansHeader'

const Plans = () => {
  const planId = context.params.planId
  const { user } = useAuth()
  const { data } = useSWR(user ? { url: `/api/plans/${planId}`, token: user.token } : null, fetcher)

  if(!data) {
    return (
      <DashboardShell>
        <PlansHeader />
        <h1>There is not plan</h1>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <PlansHeader />
      {data.plans?.length > 0 ? <h1>There is plan </h1>: <h1>There is not plan</h1>}
    </DashboardShell>
  )
}

export default Plans