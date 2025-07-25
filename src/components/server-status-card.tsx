import { CheckCircle, XCircle } from 'lucide-react'
import { Badge } from './badge'
import { Card, CardHeader, CardTitle, CardFooter } from './card'
import { cn } from '@/lib/utils'

type ServerStatusCardProps = {
   serviceRunning: boolean
   title: string
   serviceRunningDescription: string
   serviceDownDescription: string
}

export function ServerStatusCard({
   serviceRunning,
   title,
   serviceDownDescription,
   serviceRunningDescription,
}: ServerStatusCardProps) {
   return (
      <Card
         className={cn('@container/card', serviceRunning ? 'border-green-500' : 'border-red-500')}
      >
         <CardHeader className="flex flex-col gap-5 lg:flex-row w-full justify-between items-start lg:items-center">
            <CardTitle className="text-bold">{title}</CardTitle>
            <Badge
               variant={'outline'}
               className={cn(
                  'flex items-center gap-1.5'
                  //serviceRunning ? 'border-green-500' : 'border-red-500'
               )}
            >
               {serviceRunning ? (
                  <div className="flex flex-row gap-1.5 items-center">
                     <CheckCircle className="size-3 text-green-500 animate-pulse" />
                     Service Running
                  </div>
               ) : (
                  <div className="flex flex-row gap-1.5 items-center">
                     <XCircle className="size-3 text-red-500 animate-pulse" />
                     Service Down
                  </div>
               )}
            </Badge>
         </CardHeader>
         <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground ">
               {serviceRunning ? serviceRunningDescription : serviceDownDescription}
            </div>
         </CardFooter>
      </Card>
   )
}
