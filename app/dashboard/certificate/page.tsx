"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInstitutionContext } from "@/lib/contexts/InstitutionContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {  UploadCloud,AlertTriangle, Signature } from "lucide-react";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { CertificateFormToggler } from "@/components/forms/signing/CertificateForm";
import { CertificateViewer } from "@/components/ui/CertificateViewer";


export default function CertificatePage() {
     const { authEmployee } = useInstitutionContext();
     const {user} = useAuthContext();
     const certificateUrl = user?.certificateUrl;

     

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Signature className="w-6 h-6 text-sky-600" />
              <div>
                <CardTitle className="text-lg">Digital Certificate</CardTitle>
                <CardDescription className="text-sm">
                  Certificate status for <span className="font-medium">{authEmployee?.name}</span>
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Employee & Institution info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Employee</p>
              <p className="font-medium">{authEmployee?.name}</p>
              <p className="text-sm">{authEmployee?.email}</p>
              <p className="text-sm">{authEmployee?.phone}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Institution</p>
              <p className="font-medium">
                {authEmployee?.employeeRole?.department?.institution?.name ?? "—"}
              </p>
              <p className="text-sm">
                Department: {authEmployee?.employeeRole?.department?.name ?? "—"}
              </p>
            </div>
          </div>

          <Separator />

          {/* Certificate details */}
          <div className="space-y-2">
            {certificateUrl ? (
              <>
                <CertificateViewer certificateUrl={certificateUrl}/>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">No certificate uploaded.</p>
                  <p className="text-sm text-muted-foreground">Upload a .pfx certificate for digital signing.</p>
                </div>
                <CertificateFormToggler name="Add Certificate" icon={<UploadCloud className="w-4 h-4" />} className="p-2 px-3 rounded-md text-gray-200 font-medium text-sm bg-black flex items-center justify-center gap-1" title="Upload .pfx Certificate" userId={user?.id ?? ""} />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <AlertTriangle className="inline-block w-4 h-4 mr-2 align-middle" />
            Please keep secure your password for accessing the digital certificate.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
