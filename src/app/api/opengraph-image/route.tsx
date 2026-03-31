import { ImageResponse } from "next/og";
import { APP_NAME, APP_DESCRIPTION } from "~/lib/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, #ff2fb5 0%, transparent 35%), radial-gradient(circle at 80% 20%, #326dff 0%, transparent 35%), #0b0b14",
          color: "#ffffff",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 900, letterSpacing: -2 }}>
          {APP_NAME}
        </div>
        <div style={{ marginTop: 24, fontSize: 40, opacity: 0.9 }}>
          {APP_DESCRIPTION}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
