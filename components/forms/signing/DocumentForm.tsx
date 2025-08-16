"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createDocument, deleteDocument, fetchDocumentById, updateDocument } from "@/lib/actions/signing/document";
import { absDocPath, digitalSigningUrl, Endpoints, signingServer } from "@/lib/backend-urls";
import { DataService } from "@/lib/data-service";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { PasswordInputGroup, SelectInputGroup, SubmitBtn, TextInputGroup } from "../InputGroups";
import { SDocumentUpdate, TDocumentTableRow } from "@/lib/select-types/signing/document";
import { fetchDocumentType } from "@/lib/actions/signing/document-type";
import { SSimpleDocumentType } from "@/lib/select-types/signing/document-type";
import FileCapture from "../FileCapture";
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext";
import { getFileNameFromUrl, getMarker } from "@/utils/signing";
import { IResponse } from "@/lib/types/Reponse";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import axios from "axios";

export const DocumentForm = ({id,institutionId, onComplete,seekerId}:{id?:string, institutionId:string, onComplete: () => void, seekerId?:string }) => {
     const [loading,setLoading] = useState(false);
     const [newFile,setNewFile] = useState<File | null>(null);
     const {authEmployee} = useInstitutionContext();
     const {data: document, isLoading:fetchingDocument, isError: errorFetchingDocument} = useQuery({
          queryKey: ["documents", "update", id],
          queryFn: () => id ? fetchDocumentById(id, SDocumentUpdate) : null
     });
     const {data: documentTypesData, isLoading: fetchingDocumentTypes, isError: errorFetchingDocumentTypes} = useQuery({
          queryKey: ["document-types", "list", institutionId],
          queryFn: () => fetchDocumentType(SSimpleDocumentType, {institutionId, signingMarkers: {contains: getMarker(authEmployee.employeeRole)}}, 1000)
     });
     const queryClient = useQueryClient();

     const isLoading = fetchingDocument || fetchingDocumentTypes;
     const isError = errorFetchingDocument || errorFetchingDocumentTypes || !documentTypesData;
     

     const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const formData = new FormData(event.currentTarget);
               const name = String(formData.get("name"));
               const type = String(formData.get("type"));
               const selectedType = documentTypesData?.data.find(dt => dt.id === type);
               let fileUrl = "";
               if(newFile) {
                    const fileData = new FormData();
                    fileData.append("file", newFile);
                    const fileUpload = await DataService.post<typeof formData,IResponse<string>>(signingServer, Endpoints.signing.upload.default, fileData);
                    if(fileUpload && fileUpload.success && fileUpload.data){
                         fileUrl = fileUpload.data;
                    }else{
                         return toast.error("Error uploading the new document.Try again", {description:"Please contact support is this issue continues!!!"})
                    }
               }
               if(!document || !id) {
                    if(!name) return toast.warning("Document Name cannot be empty");
                    if(!selectedType) return toast.warning("Please select the document type");
                    if(!fileUrl) return toast.warning("Please upload a document to continue");

                    const newDocument = await createDocument({name, documentType: {connect: {id: selectedType.id}}, seekerId, url: fileUrl, unSignedBy: selectedType.signingMarkers});
                    if(newDocument){
                         queryClient.invalidateQueries({queryKey: ["documents"]});
                         toast.success("Successfully saved the document");
                         return onComplete();
                    }else {
                         return toast.error("Something went wrong. Try again!",{description: "If the issue persists. Contact support"});
                    }
               }
               const updatedDocument = await updateDocument(id, {
                    ...(name ? {name} :{}),
                    ...(selectedType ? {
                         documentType: {connect: {id: selectedType.id}},
                         unSignedBy: selectedType.signingMarkers
                    } : {}),
                    ...(fileUrl ? {url: fileUrl} :{})
               });
               if(updatedDocument) {
                    queryClient.invalidateQueries({queryKey: ["documents"]});
                    toast.success("Successfully updated the document");
                    return onComplete();
               }else {
                    return toast.error("Something went wrong. Try again!",{description: "If the issue persists. Contact support"});
               }
          } catch (error) {
               console.log(error);
               toast.error("Application error. Please contact system support.")
          }finally{
               setLoading(false);
          }
     }
     if(isLoading) return <p className="w-full py-2 px-4 text-base font-medium text-red-600">Loading...</p>
     if(isError) return <p className="w-full py-2 px-4 text-base font-medium text-red-600">An Error occurred while fetching data</p>
     return (
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-start gap-4" >
               <TextInputGroup required={document ? false : true} name="name" label="Document Name" placeholder="ex. Announcement" type="text"  />
               <SelectInputGroup required={document ? false : true} name="type" label="Document Type" values={documentTypesData.data.map(type => ({label: type.name, value: type.id}))} />
               <FileCapture onComplete={res => setNewFile(res)} name="Document" allowedFiles={[".pdf"]} />
               <SubmitBtn name={id ? "Update Document" : "Save Document"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}

export const DocumentFormToggler = ({id, seekerId,institutionId,className,name, icon, title}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string, institutionId: string, seekerId?:string }) => {
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
                    <DocumentForm seekerId={seekerId} institutionId={institutionId} id={id} onComplete={() => setOpen(false)} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const DocumentDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const deletedDocument = await deleteDocument(id);
          if(deletedDocument) {
               const data = new FormData();
               data.append("fileUrl", deletedDocument.url);
               await DataService.delete<string>(signingServer, Endpoints.signing.upload.default);
               queryClient.invalidateQueries();
               toast.success("Document deleted successfully!");
          }
          else toast.error("Error deleting Document");
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

export const SignBtn = ({document, className,name, icon,title}:{document:TDocumentTableRow, name?:string, icon?:ReactNode, className:string, title:string }) => {
     const [open,setOpen] = useState(false);
     const [loading,setLoading] = useState(false);
     const {user} = useAuthContext();
     const {authEmployee} = useInstitutionContext();
     const queryClient = useQueryClient();
     
     const signDoc = async (event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const formData = new FormData(event.currentTarget);
               const password  = String(formData.get("password"));
               if(!password) return toast.warning("Please password cannot be empty");
               const documentPath = `${absDocPath}${getFileNameFromUrl(document.url)}`;
               // const signImagePath = `${absDocPath}/${getFileNameFromUrl(user?.signImageUrl ?? "")}`;
               const pfxPath = `${absDocPath}/${getFileNameFromUrl(user?.certificateUrl ?? "")}`;
               const keyword = getMarker(authEmployee.employeeRole);
               
               const res = await axios.post(`${digitalSigningUrl}/api/sign/single`, {
                    password, documentPath, pfxPath, keyword, name:authEmployee.name
               });
               
               if(res && res.data){
                    if(res.data.status === "success"){
                         let unsignedKeys = document.unSignedBy.split(";").filter(Boolean);
                         let signedKeys = document.signedBy.split(";").filter(Boolean);

                         // Remove the current keyword from unsigned keys
                         unsignedKeys = unsignedKeys.filter(k => k !== keyword);

                         // Add it to signed keys if it's not already there
                         if (!signedKeys.includes(keyword)) {
                              signedKeys.push(keyword);
                         }

                         // Update the document
                         await updateDocument(document.id, {
                              unSignedBy: unsignedKeys.join(";"),
                              signedBy: signedKeys.join(";"),
                         });
                         queryClient.invalidateQueries();

                         toast.success("Document signed successfully!");
                         return setOpen(false);
                    }
                    return toast.error(res.data.message);
               }
               return toast.error("Error signing the document");

          } catch (error) {
               console.log(error);
               toast.error("Application Error", {description: "Please contact support on this issue!"})
          }finally{
               setLoading(false);
          }
     }
     if(!open) return <button type="button" onClick={() => setOpen(true)} className={className}>{icon? icon : null} {name ? name : ""}</button>
     return (
          <Dialog open={open} onClose={() => {}} className="relative z-50">
               <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex justify-center items-center ">
               <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[40%] max-h-[90%] overflow-y-auto flex flex-col items-center justify-start gap-[10px]" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex items-center justify-between gap-[8px]">
                         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                         <CircleX size={32} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>
                    <form className="w-full flex flex-col items-start justify-start gap-4" onSubmit={signDoc}>
                         <PasswordInputGroup name="password" type="password" label="Enter your certificate Password" placeholder="************" />
                         <SubmitBtn name={"Sign Document"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
                    </form>
               </DialogPanel >
               </div>
          </Dialog>
     )
}

// export const DocumentViewerBtn = ({document, className,name, icon}:{document:TDocumentTableRow, name?:string, icon?:ReactNode, className:string}) => {
//      const [open,setOpen] = useState(false);
     
//      if(!open) return <button type="button" onClick={() => setOpen(true)} className={className}>{icon? icon : null} {name ? name : ""}</button>
//      return (
//           <Dialog open={open} onClose={() => {}} className="relative z-50">
//                <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex justify-center items-center ">
//                <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[40%] max-h-[90%] overflow-y-auto flex flex-col items-center justify-start gap-[10px]" onClick={(e) => e.stopPropagation()}>
//                     <div className="w-full flex items-center justify-between gap-[8px]">
//                          <h2 className="text-lg font-bold text-gray-800">Viewing {document.name}</h2>
//                          <CircleX size={32} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setOpen(false)} />
//                     </div>
//                     <RichPdfSignerViewer
//                          src={document.url}
//                          theme="light"
//                          enableRevisionTimeline
//                          enableAnnotations
//                          onSignaturesParsed={(sigs) => console.log(sigs)}
//                          />
//                </DialogPanel >
//                </div>
//           </Dialog>
//      )
// }