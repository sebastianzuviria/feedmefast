import useSWR from 'swr'
import { useAuth } from '@/lib/auth'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import PlansHeader from '@/components/PlansHeader'
import { getAllPlans, getPlan } from '@/lib/db-admin'
import { useState } from 'react'

export async function getStaticProps(context) {
  const planId = context.params.planId
  const { plan } = await getPlan(planId)
  
  return {
    props: {
        initialPlan: plan
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { plans } = await getAllPlans()
  const paths = plans?.map(plan => ({
      params: { 
          planId: plan.id.toString()
      }
  }))

  return {
    paths,
    fallback: true
  };
}

const Plans = ({ initialPlan }) => {
  const [plan, setPlan] = useState(initialPlan)

  if(!plan) {
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
      {plan ? <h1>{plan.name}</h1>: <h1>There is not plan</h1>}
    </DashboardShell>
  )
}

export default Plans