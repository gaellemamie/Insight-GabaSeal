"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createInstitution, deleteInstitution, fetchInstitutionById, updateInstitution } from "@/lib/actions/institution/Institution";
import { fetchInstitutionCategory } from "@/lib/actions/institution/InstitutionCategory";
import { QueryKeys } from "@/lib/query-keys";
import { SSimpleInstitutionCategory } from "@/lib/select-types/institution/institution-category";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { SelectInputGroup, SubmitBtn, TextInputGroup } from "../InputGroups";
import { EServiceType, EStatus } from "@/prisma/lib/generated/prisma";
import { SInstitutionUpdate } from "@/lib/select-types/institution/institution";

export const InstitutionForm = ({id, adminId, onComplete}:{id?:string, adminId:string, onComplete: () => void}) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const {data: categoriesData, isLoading, isError} = useQuery({
          queryKey: [QueryKeys.institution.adminInstitutionCategories],
          queryFn: () => fetchInstitutionCategory(SSimpleInstitutionCategory)
     });

     const {data: institution, isLoading: fetchingInstitution, isError: isErrorFetchingInstitution} = useQuery({
          queryKey: [`institution-form-update-${id}`],
          queryFn: () => id ? fetchInstitutionById(id, SInstitutionUpdate) : null
     });

     const fetchingData = isLoading || fetchingInstitution;
     const errorFetchingData = isError || isErrorFetchingInstitution;

     const submitForm = async(event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const data = new FormData(event.currentTarget);
               const name = String(data.get("name"));
               const email = String(data.get("email"));
               const phone = String(data.get("phone"));
               const location = String(data.get("location"));
               const categoryId = String(data.get("category"));
               const status  = String(data.get("status"));
               const fieldType = categories.find(c => c.id === categoryId)?.name ?? "";
               const serviceType = String(data.get("type"));

               if(!institution && !id) {
                    const newInstitution = await createInstitution({
                         name, email, phone, location, category: {connect: {id:categoryId}}, status: status as EStatus,
                         verifiedBy: adminId, field: fieldType, serviceType: serviceType as EServiceType
                    });

                    if(newInstitution) {
                         queryClient.invalidateQueries();
                         toast.success("Successfully added a new institution!");
                         return  onComplete();
                    }else{
                         return toast.error("Error saving institution. Please try again later!");
                    }
               }

               const updatedInstitution = await updateInstitution(id ?? "", {
                    ...(name ? {name} : {}),
                    ...(email ? {email} : {}),
                    ...(email ? {phone} : {}),
                    ...(location ? {location} : {}),
                    ...(phone ? {phone} : {}),
                    ...(status ? {status: status as EStatus} : {}),
                    ...(categoryId ? {field: fieldType, category:{connect: {id: categoryId}}} : {}),
                    ...(serviceType ? {serviceType: serviceType as EServiceType}:{})
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

     const categories = categoriesData ? categoriesData.data : [];

     // indicators
     if(fetchingData) return <p className="w-full py-2 px-4 text-base font-medium text-gray-600">Loading...</p>
     if(errorFetchingData) return <p className="w-full py-2 px-4 text-base font-medium text-gray-600">An Error occurred while fetching data</p>

     return (
          <form onSubmit={submitForm} className="w-full flex flex-col items-start justify-start gap-4">
               <TextInputGroup name="name" type="text" label={`Institution name: ${institution ? institution.name : ""}`} placeholder="ex. AUCA" required={institution ? false : true} />
               <TextInputGroup name="email" type="email" label={`Institution Email: ${institution ? institution.email : ""}`} placeholder="ex. info@xcv.com" required={institution ? false : true}/>
               <TextInputGroup name="phone" type="phone" label={`Contact phone: ${institution ? institution.phone : ""}`} placeholder="ex. +25078079...." required={institution ? false : true}/>
               <TextInputGroup name="location" type="text" label={`Location: ${institution ? institution.location : ""}`} placeholder="ex. Rwanda, kigali - Gasabo" required={institution ? false : true}/>
               <SelectInputGroup name="category" label={`Field of work: ${institution ? institution.category.name : ""}`} values={categories.map(c => ({label: c.name, value: c.id}))} required={institution ? false : true} />
               <SelectInputGroup name="status" label={`Status: ${institution ? institution.status : ""}`}  values={Object.values(EStatus).map(s => ({label: s, value: s}))}  required={institution ? false : true} />
               <SelectInputGroup name="type" label={`Service Type: ${institution ? institution.serviceType : ""}`}  values={Object.values(EServiceType).map(s => ({label: s, value: s}))}  required={institution ? false : true} />
               <SubmitBtn name={id ? "Update Institution" : "Save Institution"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}


export const InstitutionFormToggler = ({id, className,name, icon, title, adminId}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string, adminId:string }) => {
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
                    <InstitutionForm onComplete={() => setOpen(false)} id={id} adminId={adminId} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const InstitutionDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const res = await deleteInstitution(id);
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
                    This action cannot be undone. This will permanently delete the institution and remove its data from our servers.
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