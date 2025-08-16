"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import { CircleX, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { createInstitutionCategory, deleteInstitutionCategory, fetchInstitutionCategoryById, updateInstitutionCategory } from "@/lib/actions/institution/InstitutionCategory";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitBtn, TextAreaInputGroup, TextInputGroup } from "../InputGroups";
import { SInstitutionCategoryUpdate } from "@/lib/select-types/institution/institution-category";
import { QueryKeys } from "@/lib/query-keys";

export const InstitutionCategoryForm = ({id, onComplete}:{id?:string, onComplete: () => void}) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();


     const {data: category, isLoading, isError} = useQuery({
          queryKey: [`category-update-form-${id}`],
          queryFn: () => id ? fetchInstitutionCategoryById(id, SInstitutionCategoryUpdate) : null
     });

     const fetchingData = isLoading;
     const errorFetchingData =  isError;

     const submitForm = async(event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const data = new FormData(event.currentTarget);
               const name = String(data.get("name"));
               const description = String(data.get("description"));
               
               if(!category && !id) {
                    const newCategory = await createInstitutionCategory({
                         name, description
                    });

                    if(newCategory) {
                         queryClient.invalidateQueries({queryKey: [newCategory.id]});
                         queryClient.invalidateQueries({queryKey: [QueryKeys.institution.adminInstitutionCategories]});
                         toast.success("Successfully added a new institution category!");
                         return onComplete();
                    }else{
                         return toast.error("Error saving institution category. Please try again later!");
                    }
               }

               const updatedInstitution = await updateInstitutionCategory(id ?? "", {
                    ...(name ? {name} : {}),
                    ...(description ? {description} : {}),
                    });

               if(updatedInstitution) {
                    queryClient.invalidateQueries();
                    toast.success("Institution updated successfully!");
                    return onComplete();
               }else return toast.error("Error updating institution");

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
               <TextInputGroup name="name" type="text" label={`Category name: ${category ? category.name : ""}`} placeholder="ex. Education" required={category ? false : true} />
               <TextAreaInputGroup name="description" label="Description" placeholder="Enter category description" defaultValue={category ? category?.description ?? "" : ""} maxWords={100} />
               <SubmitBtn name={id ? "Update Institution" : "Save Institution"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}

export const InstitutionCategoryFormToggler = ({id, className,name, icon, title}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string }) => {
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
                    <InstitutionCategoryForm id={id} onComplete={() => setOpen(false)}   />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const InstitutionCategoryDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const res = await deleteInstitutionCategory(id);
          if (res) {
               queryClient.invalidateQueries();
               toast.success("Successfully deleted institution");
          }
          else toast.error("Error deleting institution");
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
                    This action cannot be undone. This will permanently delete the institution Category and remove its data and connected institutions from our servers.
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