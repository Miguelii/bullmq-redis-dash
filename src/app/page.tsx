import Image from 'next/image'

export default function RootPage() {
   return (
      <main className="@container/main flex flex-1 flex-col gap-2 px-5 py-10 md:p-10 max-w-[1000px]">
         <h1 className="text-4xl font-bold mb-4">🎯 QueueDash</h1>

         <div className="flex flex-col gap-5 mb-6 text-lg">
            <p className="">
               A simple and educational demo showcasing how to manage background tasks using{' '}
               <strong>BullMQ</strong>, <strong>Redis</strong>, and <strong>Next.js</strong>.
            </p>

            <p>
               This application demonstrates how to offload long or intensive processes (like
               sending emails, processing files, or performing heavy computations) to background
               jobs using a queue system.
            </p>
         </div>

         <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Technologies</h2>
            <ul className="list-disc list-inside space-y-4 text-base">
               <li>
                  <b>Next.js</b> – Framework for frontend and API routes.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-base text-gray-700">
                     <li>React Compiler</li>
                     <li>Partial Prerendering (PPR)</li>
                     <li>App Router</li>
                     <li>
                        T3 Env (Framework agnostic validation for type-safe environment variables)
                     </li>
                  </ul>
               </li>

               <li>
                  <b>tRPC</b> - End-to-end typesafe API between the Next.js frontend and API routes.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-base text-gray-700">
                     <li>React Query for caching and revalidating</li>
                  </ul>
               </li>

               <li>
                  <b>Redis</b> - An in-memory data store used by BullMQ to persist job states and
                  manage queues.
               </li>

               <li>
                  <b>BullMQ</b> - A Node.js library for creating and managing job queues based on
                  Redis.
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-base text-gray-700">
                     <li>Worker process running in a dedicated Node.js API</li>
                  </ul>
               </li>
            </ul>
         </section>

         <section className="mb-10">
            <h3 className="text-2xl font-semibold mb-0">How it works?</h3>

            <div className="w-full h-full">
               <Image
                  src={'/diagram.webp'}
                  alt="Project diagram"
                  width={1000}
                  height={300}
                  className="object-contain w-full h-full"
               />
            </div>
         </section>

         <section className="mb-10">
            <h4 className="text-2xl font-semibold mb-4">Open Source</h4>

            <div className="flex flex-col gap-5 mb-6 text-lg">
               <p className="">This project is completely open source and available on GitHub.</p>
               <p>
                  You can explore the full source code, clone the repository, suggest improvements,
                  or use it as a starting point for your own applications.
               </p>
            </div>
         </section>
      </main>
   )
}
