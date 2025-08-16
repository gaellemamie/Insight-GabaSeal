
import { signIn, signOut } from "next-auth/react";

export async function GoogleSignIn(){
     signIn("google");
}

export async function CredentialsSignin(formData: FormData) {
     try {
          const credentials = Object.fromEntries(formData.entries());
          const result = await signIn("credentials", {redirect:false,...credentials});
          return result;
     } catch (error) {
          // console.log(error);
          return null;
     }
     
}

export async function logoutUser() {
     return await signOut();
}