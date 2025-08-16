"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createDocumentRequest, deleteDocumentRequest } from "@/lib/actions/signing/document-request";
import { Endpoints, signingServer } from "@/lib/backend-urls";
import { DataService } from "@/lib/data-service";
import { TDocumentTypeCard } from "@/lib/select-types/signing/document-type";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, CircleX, Loader2, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { TextAreaInputGroup } from "../InputGroups";
import { useSeekerContext } from "@/lib/contexts/SeekerContext";

export const DocumentRequestForm = ({seekerId, documentType, id, onComplete}: {seekerId: string, documentType: TDocumentTypeCard, id?:string, onComplete: () => void}) => {
     return (
          <form className="w-full flex flex-col items-start gap-4">
               <TextAreaInputGroup name="description" label="Describe your request:" maxWords={100} placeholder="A short description of your request"   />
          </form>
     )
}

export const DocumentRequestFormToggler = ({id, documentType,seekerId,className,name, icon, title}:{id?:string, name?:string, icon?:ReactNode, className:string,seekerId:string, title: string, documentType: TDocumentTypeCard }) => {
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
                    <DocumentRequestForm seekerId={seekerId} documentType={documentType} id={id} onComplete={() => setOpen(false)} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const DocumentRequestDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const deletedDocumentRequest = await deleteDocumentRequest(id);
          if(deletedDocumentRequest) {
               const data = new FormData();
               data.append("fileUrl", deletedDocumentRequest.documentUrl ?? "");
               await DataService.delete<string>(signingServer, Endpoints.signing.upload.default);
               queryClient.invalidateQueries();
               toast.success("Document request deleted successfully!");
          }
          else toast.error("Error deleting Document request");
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
                    This action cannot be undone. This will permanently delete the Document from our servers.
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

export const DocumentRequestBtn = ({className, documentType,name, icon}:{name?:string, icon?:ReactNode, className:string, documentType: TDocumentTypeCard }) => {
     const [loading, setLoading] = useState(false);
     const {seeker} = useSeekerContext();
     const queryClient = useQueryClient();

     const requestDocument = async () => {
          setLoading(true);
          const description = `${seeker.name} requested for a ${documentType.name}`;
          const newRequest = await createDocumentRequest({description, seekerId: seeker.id, documentType: {connect: {id: documentType.id}}});
          if(newRequest) {
               toast.success("Successfully sent your request.", {description: "Your will be notified when your request is approved!"});
               queryClient.invalidateQueries();
          }
          else toast.error("Error sending you request");
          setLoading(false);
     };

     return (
          <AlertDialog>
               <AlertDialogTrigger asChild>
               <Button variant="default" className={className}>
                    {icon ? icon : null}
                    {name}
               </Button>
               </AlertDialogTrigger>
               <AlertDialogContent className="bg-white text-black">
               <AlertDialogHeader>
                    <AlertDialogTitle className="text-blue-600">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Are you sure you want to request a {documentType.name}?
                    </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                    <AlertDialogCancel className="text-blue-600 border-blue-600 hover:bg-blue-50">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    disabled={loading}
                    onClick={requestDocument}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                    {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                    Confirm
                    </AlertDialogAction>
               </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}

