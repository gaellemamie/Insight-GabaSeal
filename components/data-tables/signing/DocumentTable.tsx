"use client"
import { SignBtn } from "@/components/forms/signing/DocumentForm"
import { Button } from "@/components/ui/button"
import { GenericTable } from "@/components/ui/generic-data-table"
import { useAuthContext } from "@/lib/contexts/AuthContext"
import { TDocumentTableRow } from "@/lib/select-types/signing/document"
import { format} from "date-fns"
import { Download, FileText, Signature } from "lucide-react"
import Link from "next/link"
import React from "react"

 

export const DocumentsTable = ({data, refresh}:{data: TDocumentTableRow[], refresh?:() => void}) => {
     const {user} = useAuthContext();
     const columns = [
          {
               header: "Document",
               accessor: "name",
               searchable: true, 
               render: (doc: TDocumentTableRow) => {
               return (
               <div className="w-auto flex items-start justify-start gap-2">
                    <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                    <p className="font-medium text-navy-blue-900">{doc.name}</p>
                    <p className="font-medium text-navy-blue-900">Created on: {format(new Date(doc.createdAt), "PPPP")}</p>
                    </div>
               </div>
               );
               },
          },
          {header: "Type", accessor: "documentType", sortable:true, render: (doc:TDocumentTableRow) => doc.documentType.name },
          {
               header: "Status",
               accessor: "id",
               sortable: true,
               render: (doc: TDocumentTableRow) => {
                    const unsignedList = doc.unSignedBy
                    .split(";")
                    .filter(name => name.trim() !== ""); // remove empty entries

                    return unsignedList.length > 0
                    ? <span className="p-1 text-sm text-orange-800 bg-orange-100 rounded-sm whitespace-nowrap">
                         {unsignedList.length} to Sign
                         </span>
                    : <span className="p-1 text-sm text-green-800 bg-green-100 rounded-sm">
                         Signed
                         </span>;
               }
          },
          {
               header: "Signers",
               accessor: "id",
               render: (doc: TDocumentTableRow) => (
                    <div className="flex flex-col gap-1">
                         <p>Signed By: {doc.signedBy}</p>
                         <p>Not Sign: {doc.unSignedBy} </p>
                    </div>
               )
          },
          {
               header: "Actions",
               accessor: "id",
               render: (doc: TDocumentTableRow) => (
                    <div className="flex items-center justify-center gap-2">
                         {user?.certificateUrl ? 
                         <SignBtn name="Sign" document={doc} icon={<Signature size={18} />} title="Digitally sign the document" className="py-2 px-3 text-white bg-black rounded-md hover:bg-gray-700 flex items-center gap-2 "/>:
                         <Link href={"/dashboard/certificate"} prefetch className="bg-blue-800 text-white p-2 text-sm rounded-md whitespace-nowrap">Upload Certificate</Link>
                         }
                         <Link href={doc.url} download={true} target="_blank" className="p-2 rounded-md bg-gray-200 text-gray-800"><Download size={22} /></Link>
                    </div>
               )
          }

     ]
     return <GenericTable columns={columns} refresh={refresh} data={data} />
}

function formatFileSize(bytes: number | null): string {
     if (bytes === null || bytes === undefined || isNaN(bytes)) return "";
     if (bytes < 1024) return `${bytes} B`;
     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
     if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
     return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
