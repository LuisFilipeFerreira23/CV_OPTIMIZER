import { readFileSync } from "node:fs";
import { parse } from "yaml";

const master = parse(readFileSync("data/master_cv.yaml", "utf8"));
console.log("Name:", master.profile.name);

const res = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "qwen3:14b",
    stream: false,
    think: false,
    options: { num_ctx: 8192 },
    messages: [{ role: "user", content: "Reply with the single word: ready" }],
  }),
});
const data = await res.json();
console.log("Model:", data.message.content);
