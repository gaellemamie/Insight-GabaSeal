"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createAdmin, deleteAdmin, fetchAdminById, updateAdmin } from "@/lib/actions/management/Admin";
import {  SAdminUpdate, SSimpleAdmin } from "@/lib/select-types/management/admin";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { PasswordInputGroup, SelectInputGroup, SubmitBtn, TextInputGroup } from "../InputGroups";
import { EAdminRole, EStatus, EUserType } from "@/prisma/lib/generated/prisma";
import { createUser, deleteUser, updateUser } from "@/lib/actions/auth/user";
import { QueryKeys } from "@/lib/query-keys";


export const AdminForm = ({id, onComplete}:{id?:string, onComplete: () => void}) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();


     const {data: admin, isLoading, isError} = useQuery({
          queryKey: [`admin-form-update-${id}`],
          queryFn: () => id ? fetchAdminById(id, SAdminUpdate) : null
     });

     const fetchingData = isLoading;
     const errorFetchingData =  isError;

     const submitForm = async(event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const data = new FormData(event.currentTarget);
               const name = String(data.get("name"));
               const email = String(data.get("email"));
               const password = String(data.get("password"));
               const status = String(data.get("status"));
               const role = String(data.get("role"));
          
               if(!admin && !id) {
                    const newUser = await createUser({
                         email, password, type: EUserType.ADMIN, status: status as EStatus
                    });
                    if(newUser) {
                         const newAdmin = await createAdmin({
                              name, email, role: role as EAdminRole, status: status as EStatus, userId: newUser.id
                         });
                         if(newAdmin) {
                              // refresh the cached data
                              queryClient.invalidateQueries({queryKey: [newAdmin.id]});
                              queryClient.invalidateQueries({queryKey: [newUser.id]});
                              queryClient.invalidateQueries({queryKey: [QueryKeys.management.admins]});
                              queryClient.invalidateQueries({queryKey: [QueryKeys.auth.users]});
                              
                              toast.success("Successfully save the admin info");
                              return onComplete();
                         }else return toast.error("Something went wrong. Please try again");
                    }else return toast.error("Something went wrong. Please try again");
               }

               const updatedAdmin = await updateAdmin(id ?? "", {
                    ...(name ? {name} : {}),
                    ...(email ? {email} : {}),
                    ...(role ? {role: role as EAdminRole} : {}),
                    ...(status ? {status: status as EStatus} : {}),
               });

               const updatedUser = await updateUser(admin?.userId ?? "", {
                    ...(email ? {email} : {}),
                    ...(password ? {email} : {}),
                    ...(status ? {status: status as EStatus} : {}),
               });

               if(updatedAdmin && updatedUser) {
                    queryClient.invalidateQueries({queryKey: [updatedAdmin.id]});
                    queryClient.invalidateQueries({queryKey: [updatedUser.id]});
                    queryClient.invalidateQueries({queryKey: [QueryKeys.management.admins]});
                    queryClient.invalidateQueries({queryKey: [QueryKeys.auth.users]});
                    toast.success("Admin updated successfully!");
                    return onComplete();
               }else return toast.error("Error updating admin");

          } catch (error) {
               return toast.error("Application error. Please contact support");
          }finally{
               setLoading(false);
          }
     }

     // indicators
     if(fetchingData) return <p className="w-full py-2 px-4 text-base font-medium text-gray-600">Loading...</p>
     if(errorFetchingData) return <p className="w-full py-2 px-4 text-base font-medium text-gray-600">An Error occurred while fetching data</p>

     return (
          <form onSubmit={submitForm} className="w-full flex flex-col items-start justify-start gap-4">
               <TextInputGroup name="name" type="text" label={`Full Name: ${admin ? admin.name : ""}`} placeholder="ex. Dushime Brother" required={admin ? false : true} />
               <TextInputGroup name="email" type="email" label={`Email: ${admin ? admin.email : ""}`} placeholder="ex. dushime@gmail.com" required={admin ? false : true} />
               <PasswordInputGroup name="password" label="Password:" placeholder="****" type="password" required={admin ? true : false}  />
               <SelectInputGroup name="role" label={`Role: ${admin ? admin.role : ""}`}  values={Object.values(EAdminRole).map(r => ({label: r, value: r}))}  required={admin ? false : true} />
               <SelectInputGroup name="status" label={`Status: ${admin ? admin.status : ""}`}  values={Object.values(EStatus).map(s => ({label: s, value: s}))}  required={admin ? false : true} />
               <SubmitBtn name={id ? "Update Admin" : "Save Admin"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}

export const AdminFormToggler = ({id, className,name, icon, title}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string }) => {
     const [open,setOpen] = useState(false);
     if(!open) return <button type="button" onClick={() => setOpen(true)} className={className}>{icon? icon : null} {name ? name : ""}</button>

     return (
          <Dialog open={open} onClose={() => {}} className="relative z-50">
               <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex justify-center items-center ">
               <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[40%] max-h-[90%] overflow-y-auto flex flex-col items-center justify-start gap-[10px]" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex items-center justify-between gap-[8px]">
                         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                         <CircleX size={32} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>
                    <AdminForm id={id} onComplete={() => setOpen(false)} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const AdminDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const exAdmin = await fetchAdminById(id, SSimpleAdmin);
          if(!exAdmin) return toast.error("Admin does not exist");
          const res = await deleteAdmin(id);
          const deletedUser = await deleteUser(exAdmin.userId);

          if (res && deletedUser) {
               queryClient.invalidateQueries({queryKey: [id]});
               queryClient.invalidateQueries({queryKey: [QueryKeys.management.admins]});
               queryClient.invalidateQueries({queryKey: [QueryKeys.auth.users]});
               toast.success("Successfully deleted Admin");
          }
          else toast.error("Error deleting Admin");
          setLoading(false);
     };

     return (
          <AlertDialog>
               <AlertDialogTrigger asChild>
               <Button variant="destructive" className={className}>
                    {icon ? icon : null}
                    {name}
               </Button>
               </AlertDialogTrigger>
               <AlertDialogContent className="bg-white text-black">
               <AlertDialogHeader>
                    <AlertDialogTitle className="text-blue-600">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the Admin and remove its data from our servers.
                    </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                    <AlertDialogCancel className="text-blue-600 border-blue-600 hover:bg-blue-50">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    disabled={loading}
                    onClick={deleteAction}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                    {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                    Confirm
                    </AlertDialogAction>
               </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}