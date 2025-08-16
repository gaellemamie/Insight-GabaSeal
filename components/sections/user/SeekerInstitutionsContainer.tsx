"use client";

import { fetchInstitution } from "@/lib/actions/institution/Institution";
import { useSeekerContext } from "@/lib/contexts/SeekerContext";
import { SInstitutionSeeker, TInstitutionSeeker } from "@/lib/select-types/institution/institution";
import { EServiceRequestStatus } from "@/prisma/lib/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";// adjust import path
import { Mail, Phone, MapPin, Calendar, Building2 } from "lucide-react";
import { format } from "date-fns";
import { JSX } from "react";
import { ServiceRequestBtn } from "@/components/forms/seeker/ServiceRequestForm";
import { TAuthSeeker } from "@/lib/select-types/seeker/seeker";
import Link from "next/link";

export default function SeekerInstitutionsContainer() {
     const {seeker} = useSeekerContext();
     const institutionIds = seeker.institutions.split(";").filter(i => i !== " ");
     const {data,isLoading} = useQuery({
          queryKey: ["institutions", "seeker", "list-section"],
          queryFn: () => fetchInstitution(SInstitutionSeeker, undefined, 1000)
     });

     const institutions = data ? data.data : [];

     return (
          <div className="w-full flex flex-col gap-4">
               <h2 className="text-navy-blue-900 text-xl font-bold">Available Institutions or Companies </h2>
               {
                    institutions.length === 0 ? <p className="text-base text-gray-600">No institutions found!</p>:
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                         {
                              institutions.map(i => <InstitutionCard request={seeker.requests.find(r => r.institutionId === i.id)} seeker={seeker} key={`seeker-institution-${i.id}`} institution={i} seekerInstitutions={institutionIds} />)
                         }
                    </div>
               }
          </div>
     )
}

interface InstitutionCardProps {
  institution: TInstitutionSeeker; // IDs of institutions already linked to seeker
  request?: { institutionId: string; status: EServiceRequestStatus; createdAt: Date };
  seekerInstitutions: string[];
  onRequestService?: (institutionId: string) => void;
  onRequestDocuments?: (institutionId: string) => void;
  seeker: TAuthSeeker
}

export function InstitutionCard({
     institution,
     seeker,
     request,
     seekerInstitutions,
     onRequestDocuments
}: InstitutionCardProps) {
     const isPrivate = institution.serviceType === "PRIVATE";
     const isLinked = seekerInstitutions.includes(institution.id);
     const hasRequest = !!request;

     let button: JSX.Element | null = null;

     if (isPrivate) {
     if (!hasRequest) {
          button = (
               <ServiceRequestBtn className="bg-green-600 hover:bg-green-700 text-white" name="Request Service" seekerId={seeker.id} institutionId={institution.id} />
          );
     } else if (request?.status === EServiceRequestStatus.PENDING) {
          button = (
          <Button disabled variant="outline" className="cursor-not-allowed">
               Pending Request
          </Button>
          );
     } else if (
          request?.status === EServiceRequestStatus.APPROVED ||
          isLinked
     ) {
          button = (
          <Link prefetch href={`/user/institutions/${institution.id}`} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md">
               Request Documents
          </Link>
          );
     }
     } else {
     // Public institutions can be accessed directly
     button = (
          <Link prefetch href={`/user/institutions/${institution.id}`} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md">
               Request Documents
          </Link>
     );
     }

     return (
     <Card className="w-full shadow-sm hover:shadow-md transition rounded-xl">
          <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
               <Building2 className="h-5 w-5 text-green-600" />
               {institution.name}
          </CardTitle>
          <CardDescription>
               {institution.category?.name || "Uncategorized"}
          </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
               <MapPin className="h-4 w-4 text-gray-500" />
               {institution.location}
          </div>
          <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-gray-500" />
               {institution.email}
          </div>
          <div className="flex items-center gap-2">
               <Phone className="h-4 w-4 text-gray-500" />
               {institution.phone}
          </div>
          {/* <div className="flex items-center gap-2">
               <Calendar className="h-4 w-4 text-gray-500" />
               Joined {format(new Date(institution.createdAt), "MMM dd, yyyy")}
          </div> */}
          <div className="flex items-center gap-2">
               <span className="px-2 py-0.5 text-xs rounded-full border bg-gray-100">
               {institution.serviceType}
               </span>
          </div>
          </CardContent>
          <CardFooter className="pt-4">{button}</CardFooter>
     </Card>
     );
}