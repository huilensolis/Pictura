import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const res = NextResponse;

  const url = new URL(req.url);

  const redirectUrl = `${url.origin}${url.pathname}/profile`;

  return res.redirect(redirectUrl);
}
