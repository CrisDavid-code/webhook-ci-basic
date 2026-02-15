const express = require("express");
const app = express();

app.use(express.json());

// Webhook SOLO para evento push
app.post("/webhook", (req, res) => {
  const event = req.headers["x-github-event"];

  if (event !== "push") {
    return res.status(200).json({ ok: true, ignored: true, reason: "not push" });
  }

  const repo = req.body?.repository?.full_name || "unknown";
  const pusher = req.body?.pusher?.name || "unknown";
  const ref = req.body?.ref || "unknown";

  return res.status(200).json({
    ok: true,
    event: "push",
    repo,
    pusher,
    ref,
  });
});

module.exports = app;
