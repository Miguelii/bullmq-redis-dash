import { Card, CardHeader, CardTitle, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle, XCircle } from 'lucide-react'

type RedisServerStatusCardProps = {
  redisServiceIsUpAndRunning: boolean
}

export function RedisServerStatusCard({ redisServiceIsUpAndRunning }: RedisServerStatusCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-col gap-5 lg:flex-row w-full justify-between items-center">
        <CardTitle className="text-bold">Redis Server Status</CardTitle>
        <Badge variant={'outline'} className="flex items-center gap-1.5">
          {redisServiceIsUpAndRunning ? (
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
          {redisServiceIsUpAndRunning
            ? 'Redis server is operational and accepting connections.'
            : 'Redis server is not responding or unavailable.'}
        </div>
      </CardFooter>
    </Card>
  )
}
