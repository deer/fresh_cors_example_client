import { Head } from "$fresh/runtime.ts";
import Example from "../islands/Example.tsx";

export default function Home() {
  return (
    <>
      <main>
        <Head>
          <title>Fresh Cors Example</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <section>
          <h1>What happens without CORS?</h1>
          <Example heading="Example #1" url="/no-cors" method="GET" />
          <p>(Example #1 should fail.)</p>
        </section>

        <hr />

        <section>
          <h1>Simple Requests (No Pre-Flight)</h1>
          <Example heading="Example #2" url="/simple-cors" method="GET" />
          <Example heading="Example #3" url="/simple-cors" method="HEAD" />
          <Example heading="Example #4" url="/simple-cors" method="POST" />
        </section>

        <hr />

        <section>
          <h1>Complex Requests (Pre-Flight Required)</h1>
          <Example heading="Example #5" url="/complex-cors" method="DELETE" />
        </section>
      </main>
    </>
  );
}
