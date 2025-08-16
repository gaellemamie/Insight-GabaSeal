/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { DefaultSession, NextAuthOptions, Session as NextAuthSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { SAuthUser, TAuthUser } from "./select-types/auth/user";
import { verifyPassword } from "../utils/bcryptFuncs";
import { EUserType } from "@/prisma/lib/generated/prisma";

declare module "next-auth" {
     interface Session extends DefaultSession {
          user: {
               type?: string | null;
          } & DefaultSession["user"];
     }
}

export const authOptions: NextAuthOptions = {
     adapter: PrismaAdapter(prisma),
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLIENT_ID!,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
               authorization: {
                    params: {
                      scope: "openid email profile", // Ensure these scopes are requested
                    },
               },
               profile(profile) {
                    return {
                         id: profile.sub,
                         name: profile.name,
                         email: profile.email,
                         image: profile.picture,
                    };
               },
          }),
          CredentialsProvider({
               name: "Credentials",
               credentials: {
               email: { label: "Email", type: "email" },
               password: { label: "Password", type: "password" },
               },
               async authorize(credentials) {
                    const { email, password } = credentials as {
                         email: string;
                         password: string;
                    };

                    
                    const user:TAuthUser | null = await prisma.user.findUnique({ where: { email }, select: SAuthUser }) as unknown as TAuthUser ;
                    if (!user || !user.password) return null;

                         // Validate password (use bcrypt or another hashing library)
                    const isPasswordValid = await verifyPassword(password,user.password);
                    if (!isPasswordValid) return null;
                    const type = user.type;

                    return {
                         ...user,
                         type,
                         id: (user.id || "").toString(),
                    };
               },
          }),
     ],
     session: {
          strategy: "jwt",
          maxAge: 2 * 60 * 60,
     },
     jwt: {
          maxAge: 2 * 60 * 60, // Ensure JWT also expires after 2 hours
     },
     cookies: {
          sessionToken: {
               name: `next-auth.session-token`,
               options: {
                    httpOnly: true, // Prevent JavaScript access
                    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                    sameSite: "lax", // Prevent CSRF attacks
                    path: "/", // Apply to the whole site
               },
          },
     },
     callbacks: {
          async signIn({ account, profile }) {
               if (account?.provider === "google" && profile && profile.email) {
                    const gProfile = profile as { email: string; name?: string; picture?: string };
                    let user = await prisma.user.findUnique({ where: { email: profile.email } });
          
                    if (!user) {
                         // Create the new user in the database
                         user = await prisma.user.create({
                              data: {
                                   email: gProfile.email,
                                   image: gProfile.picture,
                                   password: "",
                                   createdAt: new Date(),
                                   type: EUserType.SEEKER,
                                   
                              },
                         });
                    }
          
                    // Upsert account details
                    await prisma.account.upsert({
                         where: {
                              provider_providerAccountId: {
                                   provider: account.provider,
                                   providerAccountId: account.providerAccountId,
                              },
                         },
                         create: {
                              userId: user.id,
                              provider: account.provider,
                              providerAccountId: account.providerAccountId,
                              accessToken: account.access_token,
                              refreshToken: account.refresh_token,
                              accessTokenExpires: account.expires_at ? new Date(account.expires_at * 1000) : null,
                         },
                         update: {
                              accessToken: account.access_token,
                              refreshToken: account.refresh_token,
                              accessTokenExpires: account.expires_at ? new Date(account.expires_at * 1000) : null,
                         },
                    });
          
                    return true;
               }
               return true;
          },
          async jwt({token, user}) {
               if (user) {
                    const myUser = user as unknown as TAuthUser;
                    token.type = myUser.type || "unkown";
                    token.id = myUser.id;
                    token.email = myUser.email;
                    token.picture = myUser.image
                    token.iat = Math.floor(Date.now() / 1000); // Issue time
                    token.exp = (token.iat as number) + 2 * 60 * 60;
               }
               return token;
          },
          async session({ session, token }: { session: NextAuthSession; token: any }) {
               // Add additional fields to the session object
               if (token) {
                    if (token.exp && Date.now() >= token.exp * 1000) {
                         throw new Error("Session expired. Please log in again.");
                    }
                    session.user = {
                         ...session.user,
                         email: token.email,
                         type: token.type || "unknown",
                         image: token.picture || null
                    };
               }else {
                    console.error("Token is undefined in session callback.");
               }
               return session;
          },
     },
     secret: process.env.NEXTAUTH_SECRET,
     pages: {
          signIn: "/auth/login",
     },
};

