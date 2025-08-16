"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Endpoints, signingServer } from "@/lib/backend-urls";
import { DataService } from "@/lib/data-service";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { CircleX, Loader, Loader2, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import FileCapture from "../FileCapture";
import { IResponse } from "@/lib/types/Reponse";
import { updateUser } from "@/lib/actions/auth/user";
import { createCertificate, deleteCertificate} from "@/lib/actions/signing/certificate";

export const CertificateForm = ({userId,onComplete}:{userId:string, onComplete: () => void}) => {
     const [file,setFile] = useState<File | null>(null);
     const [loading,setLoading] = useState(false);
     const queryClient = useQueryClient();
     const submitCertificate = async () => {
          try {
               setLoading(true);
               if(!file) return toast.warning("Please select a file to continue");
               const formData = new FormData();
               formData.append("file", file);
               const res = await DataService.post<typeof formData,IResponse<string>>(signingServer, Endpoints.signing.upload.default, formData);
               if(res && res.success && res.data) {
                    await createCertificate({userId, url: res.data})
                    toast.success("Successfully saved certificate!");
                    await updateUser(userId, {
                         certificateUrl: res.data,
                    });
                    queryClient.invalidateQueries();
                    return onComplete();
               }else {
                    return toast.error(res?.message ?? "Something went wrong. Try again");
               }
          } catch (error) {
               console.log(error);
               toast.error("application error. please try again");
          }finally{
               setLoading(false);
          }
     }

     return (
          <div className="w-full flex flex-col items-start justify-start gap-4">
               <FileCapture allowedFiles={[".pfx"]} onComplete={res => setFile(res)} name="certificate" />
               <button type="button" onClick={submitCertificate} className="py-2 px-4 text-white bg-blue-800 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 disabled:bg-gray-800" disabled={loading}> {loading ? <Loader size={22} /> : null} {loading ? "Submitting..." : "Submit"}</button>     
          </div>
     )
}

export const CertificateFormToggler = ({id, className,name, icon, title, userId}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string, userId: string }) => {
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
                    <CertificateForm userId={userId} onComplete={() => setOpen(false)} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const CertificateDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const deletedCertificate = await deleteCertificate(id);
          if(deletedCertificate) {
               const data = new FormData();
               data.append("fileUrl", deletedCertificate.url);
               await DataService.delete<string>(signingServer, Endpoints.signing.certificate.default);
               await updateUser(deletedCertificate.userId, {certificateUrl: ""});
               queryClient.invalidateQueries();
               toast.success("Certificate deleted successfully!");
          }
          else toast.error("Error deleting certificate");
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
                    This action cannot be undone. This will permanently delete the certificate from our servers.
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