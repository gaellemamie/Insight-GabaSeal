import { createUser, fetchUser } from "@/lib/actions/auth/user";
import { createAdmin } from "@/lib/actions/management/Admin";
import { EUserType } from "@/prisma/lib/generated/prisma";


export async function GET(request:Request) {
     try {
          const res = await fetchUser({id:true, email:true, password:true});
          return Response.json(res);
     } catch (error) {
          return Response.json({ error: "Failed to fetch users" }, { status: 400 });
     }
}

export async function POST(request: Request) {
     try {
          const body = await request.json();
          const {email, password, type, image, certificateUrl, name} = body;
          // Validate required fields
          if (!email || !password || !type || !image || !certificateUrl || !name) {
               return Response.json({ error: "Email, password, type, image, name and certificateUrl are required" }, { status: 400 });
          }
          const res = await createUser({email, password, type: type as EUserType, image, certificateUrl});

          if (!res) {
               return Response.json({ error: "Failed to create user" }, { status: 500 });
          }
          if(type === "ADMIN") {
               await createAdmin({name, email, userId: res.id});
          }
          return Response.json({ message: "User registered successfully", data: body });
     } catch (error) {
          return Response.json({ error: "Failed to register user" }, { status: 400 });
     }
}
