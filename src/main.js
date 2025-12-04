const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

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
        message: String(payload.message || "No message provided").substring(0, 1024),
        filename: payload.filename && payload.filename.trim() ? payload.filename.trim() : "unknown_file.js",
        lineno: Number(payload.lineno) || 0,
        colno: Number(payload.colno) || 0,
        stack: payload.stack ? String(payload.stack).substring(0, 8192) : "No stack trace",
        url: String(payload.url || "unknown").substring(0, 512),
        userAgent: String(payload.userAgent || "unknown").substring(0, 512),
        timestamp: new Date().toISOString(),
      }
    );

    res.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    res.json({ ok: false, error: error.message }, 500);
  }
};
