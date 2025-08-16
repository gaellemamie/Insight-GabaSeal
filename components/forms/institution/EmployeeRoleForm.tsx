"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createEmployeeRole, deleteEmployeeRole, fetchEmployeeRoleById, updateEmployeeRole } from "@/lib/actions/institution/EmployeeRole";
import { SEmployeeRoleUpdate } from "@/lib/select-types/institution/employee-role";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { SubmitBtn, TextAreaInputGroup, TextInputGroup } from "../InputGroups";

export const EmployeeRoleForm = ({id, departmentName, departmentId, onComplete}: {id?:string, departmentId:string, departmentName:string, onComplete: () => void}) => {
     const {data: role, isLoading, isError} = useQuery({
          queryKey: [`update-info-${id}`],
          queryFn: () => id ? fetchEmployeeRoleById(id, SEmployeeRoleUpdate) : null
     });
     const [loading,setLoading] = useState(false);
     const queryClient = useQueryClient();

     const submitForm = async (event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const formData = new FormData(event.currentTarget);
               const name = String(formData.get("name"));
               const description = String(formData.get("description"));

               if(!role) {
                    const signingMark = `${departmentName.toUpperCase().split(" ").join("_")}:${name.toUpperCase().split(" ").join("_")}`;
                    const newRole = await createEmployeeRole({
                         name,description, signingMark, department: {connect: {id:departmentId}}
                    });

                    if(newRole) {
                         queryClient.invalidateQueries();
                         toast.success("Saved employee role successfully");
                         return onComplete();
                    }
                    return toast.error("Error saving the employee role. Please try again");
               }

               const updatedDepartment = await updateEmployeeRole(id ?? "", {
                    ...(name ? {name} :{}),
                    ...(description ? {description} :{}),
               });

               if(updatedDepartment) {
                         queryClient.invalidateQueries();
                         toast.success("Updated employee role successfully");
                         return onComplete();
                    }
                    return toast.error("Error  updating the employee role. Please try again");
          } catch (error) {
               console.log(error);
               toast.error("Application error. please contact Support");
          }finally{
               setLoading(false);
          }
     }
     return (
          <form onSubmit={submitForm} className="w-full flex flex-col items-start justify-start gap-4">
               <TextInputGroup name="name" type="text" label={`Name: ${role ? role.name : ""}`} placeholder="ex. Header of Department" required={role ? false : true} />
               <TextAreaInputGroup name="description" label="Description" placeholder="Enter role description" defaultValue={role ? role.description ?? "" : ""} maxWords={100} />
               <SubmitBtn name={id ? "Update Role" : "Save Role"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}

export const EmployeeRoleFormToggler = ({id, className,name, departmentName, icon, title, departmentId}:{id?:string, name?:string, icon?:ReactNode, departmentName:string, className:string, title: string, departmentId:string }) => {
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
                    <EmployeeRoleForm departmentName={departmentName} id={id} departmentId={departmentId} onComplete={() => setOpen(false)} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const EmployeeRoleDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const res = await deleteEmployeeRole(id);
          if (res) {
               queryClient.invalidateQueries();
               toast.success("Successfully deleted EmployeeRole");
          }
          else toast.error("Error deleting EmployeeRole");
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
                    This action cannot be undone. This will permanently delete the EmployeeRole and remove its data from our servers.
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