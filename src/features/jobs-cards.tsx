'use client'

import { BellIcon, LucideIcon, MailIcon, Plus } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc-server/client-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { type ExpectedJobsType } from '@/actions/add-job-to-email-queue.schema'
import { cn } from '@/lib/utils'

export function JobsCards() {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [isPending, startTransition] = useTransition()

   const utils = trpc.useUtils()

   const addJobToEmailQueueAction = trpc.addJobToEmailQueueAction.useMutation({
      onSuccess(state) {
         toast(
            state.success
               ? `E-mail job created with ID ${state?.jobId}`
               : 'Error creating E-mail job!'
         )

         utils.invalidate()

         router.refresh()
      },
      onError() {
         toast('Error creating E-mail job!')
      },
   })

   const router = useRouter()

   const jobHandler = (job: ExpectedJobsType) => {
      startTransition(async () => {
         toast(`Adding E-mail job [${job}]`)
         await addJobToEmailQueueAction.mutate({ job })
      })
   }

   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 XL:grid-cols-4 gap-4">
         <JobCardItem
            onClick={() => {
               jobHandler('send-email')
            }}
            title="Email Campaign"
            description="This job represents a bulk operation targeting all users in a email list."
            Icon={MailIcon}
            iconClass="bg-blue-500 text-white"
         />
         <JobCardItem
            onClick={() => {
               jobHandler('send_notification')
            }}
            title="Notification Campaign"
            description="This job represents a failing operation that will always return an error."
            Icon={BellIcon}
            iconClass="bg-red-500 text-white"
         />
      </div>
   )
}

type JobCardItemProps = {
   onClick: () => void
   title: string
   description: string
   Icon: LucideIcon
   iconClass: string
}

function JobCardItem({ onClick, title, description, Icon, iconClass }: JobCardItemProps) {
   return (
      <Card
         className="cursor-pointer hover:shadow-md transition-shadow duration-200 group"
         onClick={() => {
            onClick()
         }}
      >
         <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
               <div
                  className={cn(
                     `p-2 rounded-lg group-hover:scale-110 transition-transform duration-200`,
                     iconClass
                  )}
               >
                  <Icon className="w-5 h-5" />
               </div>
               <div className="flex-1">
                  <CardTitle className="text-base font-medium">{title}</CardTitle>
               </div>
               <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
         </CardHeader>
         <CardContent className="pt-0">
            <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
         </CardContent>
      </Card>
   )
}
