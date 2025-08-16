import { TSimpleEmployeeRole } from "@/lib/select-types/institution/employee-role";

export const getMarker = (role: TSimpleEmployeeRole):string =>`${role.department.name.toUpperCase().split(" ").join("_")}:${role.name.toUpperCase().split(" ").join("_")}`;

export async function getPdfFileSize(url: string): Promise<number | null> {
     const response = await fetch(url, { method: "HEAD" });

     if (response.ok) {
          const size = response.headers.get("content-length");
          return size ? parseInt(size, 10) : null;
     } else {
          throw new Error(`Failed to get file size: ${response.status}`);
     }
}

export function getFileNameFromUrl(url: string): string {
  return url.split("/").pop() || "";
}