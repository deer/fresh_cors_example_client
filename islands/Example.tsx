import { useSignal } from "@preact/signals";

const baseUrl = "https://fresh-cors-example-server.deno.dev/api";
type stylesKey = "idle" | "ok" | "error";
const styles = {
  idle: {
    backgroundColor: "white",
    color: "black",
  },
  ok: {
    backgroundColor: "green",
    color: "white",
  },
  error: {
    backgroundColor: "red",
    color: "white",
  },
};

interface ExampleProps {
  heading: string;
  url: string;
  method: string;
}

export default function Example({ heading, url, method }: ExampleProps) {
  const state = useSignal<stylesKey>("idle");
  const response = useSignal("");

  const callUrlWithMethod = async (ev: MouseEvent) => {
    try {
      ev.preventDefault();
      const res = await fetch(baseUrl + url, { method: method });
      if (res.ok) {
        state.value = "ok";
        response.value = res.status === 204
          ? "STATUS CODE: 204"
          : (await res.json()).text;
      } else {
        throw await res.text();
      }
    } catch (err) {
      state.value = "error";
      response.value = err.toString();
    }
  };

  return (
    <article>
      <h2>{heading}</h2>
      <pre>
        {method} {baseUrl}
        {url}
      </pre>
      <div>
        <textarea
          style={styles[state.value]}
          value={(state.value === "ok" && response.value) || ""}
          readOnly
        />
        {state.value === "error" && (
          <p style={{ color: "red" }}>{response.value}</p>
        )}
      </div>
      <div>
        <button onClick={callUrlWithMethod}>Fetch</button>
      </div>
    </article>
  );
}
