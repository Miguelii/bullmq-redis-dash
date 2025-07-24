'use client'

import { MailIcon, Plus } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc-server/client-provider'

export function EmailJobCard() {
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

   const jobHandler = () => {
      startTransition(async () => {
         await addJobToEmailQueueAction.mutate()
      })
   }

   return (
      <Card
         className="cursor-pointer hover:shadow-md transition-shadow duration-200 group"
         onClick={() => {
            jobHandler()
         }}
      >
         <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
               <div
                  className={`p-2 rounded-lg bg-blue-500 text-white group-hover:scale-110 transition-transform duration-200`}
               >
                  <MailIcon className="w-5 h-5" />
               </div>
               <div className="flex-1">
                  <CardTitle className="text-base font-medium">Email Campaign</CardTitle>
               </div>
               <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
         </CardHeader>
         <CardContent className="pt-0">
            <CardDescription className="text-sm text-gray-600">
               Send bulk emails to your subscriber list.
            </CardDescription>
         </CardContent>
      </Card>
   )
}
