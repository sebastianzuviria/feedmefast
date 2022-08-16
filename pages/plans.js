import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import PlansHeader from '@/components/PlansHeader'
import NextLink from 'next/link'

const Plans = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? { url: "/api/plans", token: user.token } : null, fetcher)

  if(!data) {
    return (
      <DashboardShell>
        <PlansHeader />
        <h1>There is not plans</h1>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
        <PlansHeader />
        {data.plans?.length > 0 ? data.plans.map(plan => {
            console.log(plan)
            return(<div key={plan.id}>
                <h1>{plan.reason}</h1>
                <h2>{plan.auto_recurring.transaction_amount}</h2><h2>{plan.auto_recurring.currency_id}</h2>
                <NextLink href={plan.init_point}>Detail</NextLink>
            </div>)
    }): <h1>There is not plans</h1>}
    </DashboardShell>
  )
}

export default Plans