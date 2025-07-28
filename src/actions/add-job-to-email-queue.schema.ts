import z from "zod";

const ExpectedJobs = z.enum(['send-email','send_notification']);

export type ExpectedJobsType = z.infer<typeof ExpectedJobs>;

export const AddJobActionSchema = z.object({
   job: z.enum(['send-email','send_notification'])
})

export type addJobToEmailQueueActionProps = {
   job: ExpectedJobsType;
}