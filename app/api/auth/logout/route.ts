
import { getSessionUser } from "@/server-actions/user/User";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
     const {session} = await getSessionUser();

     if (!session) {
     return NextResponse.json({ message: 'No active session' }, { status: 401 });
     }

     const response = NextResponse.json({ message: 'Logged out successfully' });

     // Clear cookies (session cookies set by next-auth)
     response.cookies.set('next-auth.session-token', '', { expires: new Date(0) });
     response.cookies.set('next-auth.csrf-token', '', { expires: new Date(0) });

     return response;
};