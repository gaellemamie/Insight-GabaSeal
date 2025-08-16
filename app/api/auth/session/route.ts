
import { getSessionUser } from "@/server-actions/user/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   const {user} = await getSessionUser();

    if (!user) {
        return NextResponse.json({ isValid: false }, { status: 401 });
    }
    return NextResponse.json({ isValid: true, user},{status: 200});
}