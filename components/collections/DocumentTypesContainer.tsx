"use client";

import { SDocumentTypeCard, TDocumentTypeCard } from "@/lib/select-types/signing/document-type";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Link as LinkIcon, Users, FolderOpen, AlertCircle, Trash } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { fetchDocumentType } from "@/lib/actions/signing/document-type";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { DocumentTypeDeleteBtn } from "../forms/signing/DocumentTypeForm";
import { DocumentFormToggler } from "../forms/signing/DocumentForm";
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext";

export const DocumentTypesContainer = ({ institutionId }: { institutionId: string }) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`document-types-page-${institutionId}`],
    queryFn: () => fetchDocumentType(SDocumentTypeCard, { institutionId }, 1000),
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="rounded-xl shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center">
        <Alert variant="destructive" className="max-w-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to Load</AlertTitle>
          <AlertDescription>
            We couldn’t fetch the document types right now.  
            <button
              onClick={() => refetch()}
              className="underline text-sm ml-1 hover:text-red-700"
            >
              Try again
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Empty state
  if (!data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No document types found</p>
        <p className="text-sm text-muted-foreground">
          Start by creating a new document type for your institution.
        </p>
      </div>
    );
  }

  // Data state
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((docType) => (
        <DocumentTypeCard key={docType.id} documentType={docType} />
      ))}
    </div>
  );
};

const DocumentTypeCard = ({ documentType }: { documentType: TDocumentTypeCard }) => {
  const {authEmployee} = useInstitutionContext();
     return (
     <Card className="w-full shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
          {/* Header */}
          <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
               <CardTitle className="text-lg font-semibold text-gray-800">
               {documentType.name}
               </CardTitle>
               <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
               {documentType.formats}
               </Badge>
          </div>
          <CardDescription className="text-sm text-gray-500 flex items-center gap-1">
               <Calendar size={14} />
               Created {format(new Date(documentType.createdAt), "dd MMM yyyy")}
          </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-3">
          {/* Signing markers */}
          {documentType.signingMarkers.length > 0 && (
               <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Signing Markers</p>
                    <div className="flex flex-wrap gap-2">
                    {documentType.signingMarkers.split(";").map((marker, idx) => (
                         <Badge key={idx} variant="secondary">
                         {marker}
                         </Badge>
                    ))}
                    </div>
                    </div>
               )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                         <div className="flex items-center gap-2 text-gray-600">
                         <FolderOpen size={16} className="text-green-600" />
                         <span>{documentType._count.documents} Documents</span>
                         </div>
                         <div className="flex items-center gap-2 text-gray-600">
                         <Users size={16} className="text-green-600" />
                         <span>{documentType._count.documentRequests} Requests</span>
                         </div>
                    </div>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex justify-between">
                      <DocumentTypeDeleteBtn id={documentType.id} name="Delete" icon={<Trash size={18} />} className="px-3 py-2 bg-red-100 border-red-600 text-red-600 rounded-md" />
                      <DocumentFormToggler institutionId={authEmployee.employeeRole.department.institution.id} icon={<FileText size={14} className="mr-2" />} name="Create Document" className="bg-green-600 px-3 py-2 rounded-md hover:bg-green-700 text-white flex items-center gap-2" title="Add new Document"  />
                    </CardFooter>
               </Card>
     );
};