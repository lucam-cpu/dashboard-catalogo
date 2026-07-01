import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const password = formData.get("password") || "";
  const expected = process.env.DASHBOARD_PASSWORD || "";

  const url = new URL(request.url);

  if (expected !== "" && password === expected) {
    const response = NextResponse.redirect(new URL("/", url), 303);
    response.cookies.set("dash_auth", "granted", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 giorni
    });
    return response;
  }

  const response = NextResponse.redirect(new URL("/login?errore=1", url), 303);
  return response;
}
