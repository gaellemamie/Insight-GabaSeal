import { revalidatePath } from "next/cache";

export default function revalidateApp() {
     revalidatePath("/");
}