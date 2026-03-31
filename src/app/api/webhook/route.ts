import { NextRequest } from "next/server";

export async function POST(_request: NextRequest) {
  return Response.json({
    success: true,
    message: "Webhook processing is disabled in this deployment.",
  });
}
