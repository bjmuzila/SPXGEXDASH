import { NextResponse } from "next/server";

// Forwards a multipart Discord webhook post through the local proxy,
// mirroring the vanilla site's /proxy/api/webhooks/... path.
const PROXY_WEBHOOK_URL =
  "http://localhost:3001/proxy/api/webhooks/1466249857122570454/TZKGiNy0y8LEn2Yjeli9ARpeDkaZwabUVDzd8uOhGXBLzF5qRb-SS9dk2DllpHK5XWVK";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const res = await fetch(PROXY_WEBHOOK_URL, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Webhook proxy returned ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
