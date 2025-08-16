"use client";

import { DocumentFormToggler } from "@/components/forms/signing/DocumentForm";
import { DocumentRequestBtn } from "@/components/forms/signing/DocumentRequestForm";
import { DocumentTypeDeleteBtn } from "@/components/forms/signing/DocumentTypeForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSeekerContext } from "@/lib/contexts/SeekerContext";
import { TDocumentTypeCard } from "@/lib/select-types/signing/document-type";
import { format } from "date-fns";
import { Calendar, FileArchive, FileText, FolderOpen, Trash, Users } from "lucide-react";

export const SeekerDocumentTypesContainer = ({types}:{types: TDocumentTypeCard[]}) => {
     if(types.length === 0) return <p className="text-gray-600 text-base">No Documents found for the institution</p>
     return (
          <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
               {
                  types.map(type => <SeekerDocumentTypeCard documentType={type} key={`seeker-document-type-${type.id}`} />)
               }
          </div>
     )
}
export const SeekerDocumentTypeCard = ({ documentType }: { documentType: TDocumentTypeCard }) => {
  const { seeker } = useSeekerContext();

  return (
    <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <FileArchive className="h-6 w-6 text-green-600" />
            <CardTitle className="text-lg font-semibold text-gray-800">
              {documentType.name}
            </CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 px-2 py-1 text-sm font-medium">
            {documentType.formats}
          </Badge>
        </div>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="flex justify-end pt-2">
        <DocumentRequestBtn documentType={documentType} name="Request Document" className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 text-white flex items-center gap-2 transition" />
      </CardFooter>
    </Card>
  );
};