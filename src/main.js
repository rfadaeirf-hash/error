const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  try {
    const payload = JSON.parse(req.body || "{}");

    const client = new sdk.Client()
      .setEndpoint("https://nyc.cloud.appwrite.io/v1")
      .setProject("692c0711003d45cc29c0");

    const databases = new sdk.Databases(client);

    await databases.createDocument(
      "692c10040014dbde576f",
      "errors",
      "unique()",
      {
        email: payload.email || "r.fadaei.rf@gmail.com",
        type: payload.type || "error",
        message: String(payload.message || "No message").substring(0,1024),
        filename: payload.filename || null,
        lineno: payload.lineno || null,
        colno: payload.colno || null,
        stack: payload.stack ? String(payload.stack).substring(0,8192) : null,
        url: String(payload.url || "unknown").substring(0,512),
        userAgent: String(payload.userAgent || "unknown").substring(0,512),
        timestamp: new Date().toISOString(),
      }
    );

    res.json({ ok: true });
  } catch (e) {
    console.error("Error:", e);
    res.json({ ok: false, error: e.message }, 500);
  }
};
