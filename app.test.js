const request = require("supertest");
const app = require("./app");

describe("Webhook endpoint", () => {
  test("ignores non-push events", async () => {
    const res = await request(app)
      .post("/webhook")
      .set("X-GitHub-Event", "issues")
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.ignored).toBe(true);
  });

  test("accepts push events", async () => {
    const payload = {
      ref: "refs/heads/main",
      pusher: { name: "Cristian" },
      repository: { full_name: "CrisDavid-code/webhook-ci-basic" },
    };

    const res = await request(app)
      .post("/webhook")
      .set("X-GitHub-Event", "push")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.event).toBe("push");
    expect(res.body.repo).toBe(payload.repository.full_name);
  });
});
