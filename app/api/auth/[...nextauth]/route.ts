// import { NextRequest, NextResponse } from 'next/server';
// import NextAuth from 'next-auth';
// import { authOptions } from '@/common/authOptions';

import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// import { handlers } from "@/auth";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

