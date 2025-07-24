'use client'

import { Clock, CheckCircle2, XCircle, MailIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { RedisJobInfo } from '@/types/RedisJobInfo'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { RedisJobStatusEnum } from '@/types/RedisJobStatusEnum'
import { trpc } from '@/trpc-server/client-provider'

export function JobsMonitoringCard() {
   const request = trpc.getAllQueryJobs.useQuery(undefined, {
      staleTime: 0,
      refetchInterval: 5 * 60 * 1000, //5min
   })

   //console.log(request.data);

   return (
      <Card>
         <Tabs defaultValue="pending" className="w-full">
            <CardHeader className="pb-3 h-full">
               <TabsList className="grid w-full grid-cols-1 lg:grid-cols-3 h-full">
                  <TabsTrigger value="pending" className="flex items-center gap-2 cursor-pointer">
                     <Clock className="w-4 h-4" />
                     <>
                        Pending {''}
                        {!request.isLoading && <>({request?.data?.totalPending ?? null})</>}
                     </>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center gap-2 cursor-pointer">
                     <CheckCircle2 className="w-4 h-4" />
                     <>
                        Completed {''}
                        {!request.isLoading && <>({request?.data?.totalCompleted ?? null})</>}
                     </>
                  </TabsTrigger>
                  <TabsTrigger value="failed" className="flex items-center gap-2 cursor-pointer">
                     <XCircle className="w-4 h-4" />
                     <>
                        Failed {''}
                        {!request.isLoading && <>({request?.data?.totalFailed ?? null})</>}
                     </>
                  </TabsTrigger>
               </TabsList>
            </CardHeader>

            <CardContent>
               <TabsContent value="pending" className="mt-0">
                  {(request?.data?.totalPending ?? 0) > 0 && (
                     <ScrollArea className="h-[400px]">
                        <div className="space-y-3">
                           {request?.data?.jobsPending?.map((item, index) => (
                              <JobMonitoringCardItem
                                 job={item as RedisJobInfo}
                                 Icon={MailIcon}
                                 key={`pending-job-${item.id}`}
                              />
                           ))}
                        </div>
                     </ScrollArea>
                  )}
               </TabsContent>
            </CardContent>
         </Tabs>
      </Card>
   )
}

type JobMonitoringCardItemProps = {
   job: RedisJobInfo
   Icon: React.ElementType
}
function JobMonitoringCardItem({ job, Icon }: JobMonitoringCardItemProps) {
   const BADGE_VARIANTS = {
      [RedisJobStatusEnum.COMPLETED]: {
         className: 'bg-green-100 text-green-800 border-green-200',
         Icon: CheckCircle2,
         label: 'Completed',
      },

      [RedisJobStatusEnum.FAILED]: {
         className: 'bg-red-100 text-red-800 border-red-200',
         Icon: XCircle,
         label: 'Failed',
      },

      [RedisJobStatusEnum.WAITING]: {
         className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
         Icon: null,
         label: 'Pending',
      },

      [RedisJobStatusEnum.ACTIVE]: {
         className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
         Icon: null,
         label: 'Active',
      },
   }

   const badgeVariant = BADGE_VARIANTS[job.status]

   return (
      <div
         key={job.id}
         className={cn(
            'flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 ',
            job.status === RedisJobStatusEnum.FAILED ? 'border-red-200 bg-red-50' : 'border'
         )}
      >
         <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-lg text-white`}>
               <Icon className="w-5 h-5 shrink-0 text-blue-500" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
               <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 truncate capitalize">{job.name}</h4>
                  <Badge variant="outline" className={cn(badgeVariant.className)}>
                     {badgeVariant.Icon && <badgeVariant.Icon className="w-3 h-3 mr-1" />}
                     {badgeVariant.label}
                  </Badge>
               </div>

               <p className="text-sm text-gray-600 mb-2">ID: {job.id}</p>

               <div className="flex flex-col gap-0.5">
                  <label className="text-sm text-gray-600">Request Body:</label>
                  <div className="bg-muted/50 p-4 text-sm whitespace-pre-wrap font-mono line-clamp-4">
                     {JSON.stringify(job.data, null, 2)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
