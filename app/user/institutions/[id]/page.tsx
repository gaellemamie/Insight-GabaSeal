import { SeekerDocumentTypesContainer } from "@/components/sections/user/SeekerDocumentTypeContainer";
import { fetchDocumentType } from "@/lib/actions/signing/document-type";
import { SDocumentTypeCard } from "@/lib/select-types/signing/document-type";

export default async function SeekerInstitutionPage({params}:{params: Promise<{id:string}>}) {
     const {id } = await params;
     const {data:documentTypes} = await fetchDocumentType(SDocumentTypeCard, {institutionId: id}, 1000);

     return (
          <div className="w-full flex flex-col gap-3">
               <h2 className="text-2xl font-bold text-navy-blue-800">Documents Types:</h2>
               <SeekerDocumentTypesContainer types={documentTypes} />
          </div>
     )
}