import { NextResponse } from "next/server";

export async function POST(request) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(new URL("/login", url), 303);
  response.cookies.set("dash_auth", "", { path: "/", maxAge: 0 });
  return response;
}
