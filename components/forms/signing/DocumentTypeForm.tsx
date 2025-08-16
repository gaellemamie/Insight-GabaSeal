import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteDocumentRequest } from "@/lib/actions/signing/document-request";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, CircleX, Loader2, Trash2, XCircle } from "lucide-react";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { SubmitBtn, TextInputGroup } from "../InputGroups";
import { createDocumentType, fetchDocumentTypeById, updateDocumentType } from "@/lib/actions/signing/document-type";
import { SDocumentTypeUpdate } from "@/lib/select-types/signing/document-type";
import { fetchEmployeeRole } from "@/lib/actions/institution/EmployeeRole";
import { SSimpleEmployeeRole, TSimpleEmployeeRole } from "@/lib/select-types/institution/employee-role";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMarker } from "@/utils/signing";

export const DocumentTypeForm = ({institutionId, onComplete, id}:{institutionId: string, id?:string, onComplete: () => void}) => {
     const [loading,setLoading] = useState(false);
     const [signingMarkers,setSigningMarkers] = useState<string[]>([]);

     const {data: documentType, isLoading: fetchingType, isError: errorFetchingType} = useQuery({
          queryKey: [`document-type-update-form-${id}`],
          queryFn: () => id ? fetchDocumentTypeById(id, SDocumentTypeUpdate ) : null
     });

     const {data: roles, isLoading: fetchingRoles, isError: errorFetchingRoles } = useQuery({
          queryKey: [`document-type-form-roles-${id}`],
          queryFn: () => fetchEmployeeRole(SSimpleEmployeeRole, {department: {institution: {id:institutionId}}}, 1000)
     });
     const queryClient = useQueryClient();
     const isError = errorFetchingType || errorFetchingRoles || !roles;
     const isLoading = fetchingType || fetchingRoles;

     const submitForm = async(event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const formData = new FormData(event.currentTarget);
               const name = String(formData.get("name"));
               if(!documentType || !id) {
                    if(!name) return toast.warning("Name cannot be empty please");
                    if(signingMarkers.length === 0) return toast.warning("Please no signers selected");
                    const newDocumentType = await createDocumentType({
                         name, formats: ".pdf", institutionId, templateUrl:"", signingMarkers: signingMarkers.join(";"), 
                    });
                    if(newDocumentType) {
                         toast.success("Document type saved successfully!");
                         queryClient.invalidateQueries()
                         return onComplete();
                    }else {
                         return toast.error("Something went wrong. Please try again");
                    }
               }
               const updatedDocumentType = await updateDocumentType(id, {
                    ...(name ? {name}: {}), 
                    ...(signingMarkers.length > 0 ? {signingMarkers: signingMarkers.join(";")} : {})
               });
               if(updatedDocumentType) {
                    toast.success("Successfully updated document type!");
                    queryClient.invalidateQueries();
                    return onComplete();
               }else{
                    return toast.error("Something went wrong. Please try again until you are tired!!")
               }
          } catch (error) {
               console.log(error);
               toast.error("Application Error");
          }finally{
               setLoading(false);
          }
     }

     

     const updateSigningMarkers = (role: TSimpleEmployeeRole) => {
          const marker = getMarker(role);
          setSigningMarkers((prev) => {
          // Check if marker already exists
          if (prev.includes(marker)) {
               // Remove it
               return prev.filter((m) => m !== marker);
          } else {
               // Add it
               return [...prev, marker];
          }
          });
     }

     useEffect(() => {
          if(documentType) {
               setSigningMarkers(documentType.signingMarkers.split(";"));
          }
     }, [documentType])
     if(isLoading) return <p className="w-full py-2 px-4 text-base font-medium text-red-600">Loading...</p>
     if(isError) return <p className="w-full py-2 px-4 text-base font-medium text-red-600">An Error occurred while fetching data</p>

     return (
          <form onSubmit={submitForm} className="w-full flex flex-col items-start justify-start gap-4">
               <TextInputGroup name="name" type="text" label={`Name: ${documentType ? documentType.name : ""}`} placeholder="ex. Diploma" required={documentType ? false : true} />
               <div className="w-full flex flex-col items-start justify-start gap-2 py-2">
                    <h3 className="text-base text-gray-800 font-medium">Select employees to sign on the document</h3>
                    {
                         roles.data.length === 0 ? 
                              <p className="text-gray-600">No Employee roles found. First add some roles bruh!!</p>
                         :
                         <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {
                                   roles.data.map(role => <RoleCard key={`role-card-role-form-${role.id}`} role={role} selected={signingMarkers.includes(getMarker(role))} onClick={() => updateSigningMarkers(role)} />)
                              }
                         </div>
                    }
               </div>
               <SubmitBtn name={id ? "Update Document Type" : "Save Document Type"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}

const RoleCard  = ({role, selected, onClick}:{role: TSimpleEmployeeRole, selected:boolean, onClick: () => void}) => {
     return (
          <Card onClick={onClick} className={`w-full border transition-all duration-200 hover:shadow-lg cursor-pointer rounded-xl ${ selected ? "border-green-500 bg-green-50" : "border-gray-200" }`}
          >
               <CardHeader className="pb-2">
               <CardTitle className="flex items-center justify-between text-base font-semibold">
                    {role.name}
                    {selected && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                    Selected
                    </Badge>
                    )}
               </CardTitle>
               </CardHeader>

               <CardContent className="space-y-2 text-sm text-gray-600">
               <p className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">Department:</span>
                    {role.department.name}
               </p>
               </CardContent>

               <CardFooter>
               <Button type="button" onClick={(e) => { e.stopPropagation(); onClick(); }} variant={selected ? "destructive" : "default"} className={`w-full flex items-center gap-2 ${ selected ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700 text-white" }`} >
                    {selected ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                    {selected ? "Remove" : "Select"}
               </Button>
               </CardFooter>
          </Card>
     )
}

export const DocumentTypeFormToggler = ({id, className,name, icon, title, institutionId}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string, institutionId: string }) => {
     const [open,setOpen] = useState(false);
     if(!open) return <button type="button" onClick={() => setOpen(true)} className={className}>{icon? icon : null} {name ? name : ""}</button>

     return (
          <Dialog open={open} onClose={() => {}} className="relative z-50">
               <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex justify-center items-center ">
               <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[80%] max-h-[90%] overflow-y-auto flex flex-col items-center justify-start gap-[10px]" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex items-center justify-between gap-[8px]">
                         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                         <CircleX size={32} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>
                    <DocumentTypeForm institutionId={institutionId} onComplete={() => setOpen(false)} id={id} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const DocumentTypeDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const res = await deleteDocumentRequest(id);
          if (res) {
               queryClient.invalidateQueries();
               toast.success("Delete document type successfully");
          }
          else toast.error("Error deleting DocumentType");
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
                    This action cannot be undone. This will permanently delete the DocumentType from our servers.
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