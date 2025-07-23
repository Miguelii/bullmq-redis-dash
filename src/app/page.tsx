export default function RootPage() {
  return (
    <main className="@container/main flex flex-1 flex-col gap-2 px-5 py-10 md:p-10">
      <h1 className="text-4xl font-bold mb-4">🎯 Campaign Queue Dash</h1>

      <p className="text-lg mb-6">
        A simple and educational demo showcasing how to manage background tasks using{' '}
        <strong>BullMQ</strong>, <strong>Redis</strong>, and <strong>Next.js</strong>.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📘 About the Project</h2>
        <p>
          This application simulates a basic SaaS platform that any team could use to automate and
          monitor operational tasks. It demonstrates how queues can be used to handle heavy jobs
          like mass emailing and scheduled posts — all without blocking the main thread of your app.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🛠️ Technologies</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <b>Next.js</b> (API + frontend)
          </li>
          <li>
            <b>tRPC</b> (End-to-end typesafe API for Next.js)
          </li>
          <li>
            <b>Redis</b> (for persistence and coordination)
          </li>
          <li>
            <b>BullMQ</b> (queue and job system)
          </li>
        </ul>
      </section>
    </main>
  )
}
