import { EUserType } from "@/prisma/lib/generated/prisma";

export function getRedirectPath(type: EUserType) {
     switch(type) {
          case EUserType.ADMIN:
               return '/admins';
          case EUserType.EMPLOYEE: 
               return '/dashboard';
          case EUserType.SEEKER: 
               return '/user';
          default: 
               return '/'

     }
}