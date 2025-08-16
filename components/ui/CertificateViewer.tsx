"use client";

import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, Calendar, User, Key, Building } from "lucide-react";
import * as forge from "node-forge";
import { PasswordInputGroup, SubmitBtn } from "../forms/InputGroups";
import { toast } from "sonner";
import { Badge } from "./badge";

interface CertificateInfo {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  publicKeyAlgorithm: string;
  serialNumber: string;
}

export function CertificateViewer({
  certificateUrl,
}: {
  certificateUrl: string;
}) {
  const [certInfo, setCertInfo] = useState<CertificateInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password,setPassword] = useState("");

  const updatePassword = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    if(!password) return toast.error("Password cannot be empty");
    setPassword(password);
    return;
  }

  const status = useMemo(() => {
  if (!certInfo) return "Missing";
  if (!certInfo.validTo) return "Unknown";
  try {
    const now = new Date();
    const expiry = new Date(certInfo.validTo);
    const diffDays = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (expiry < now) return "Expired";
    if (diffDays <= 30) return "Expiring soon";
    return "Valid";
  } catch {
    return "Unknown";
  }
}, [certInfo]);

  useEffect(() => {
    async function loadCertificate() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(certificateUrl);
        if (!response.ok) throw new Error("Failed to fetch certificate");

        const arrayBuffer = await response.arrayBuffer();
        const binary = new Uint8Array(arrayBuffer);
        const binaryStr = Array.from(binary)
          .map((b) => String.fromCharCode(b))
          .join("");

        const p12Asn1 = forge.asn1.fromDer(binaryStr);
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

        let foundCert: forge.pki.Certificate | null = null;

        for (const safeContent of p12.safeContents) {
          for (const safeBag of safeContent.safeBags) {
            if (safeBag.type === forge.pki.oids.certBag) {
              foundCert = safeBag.cert as forge.pki.Certificate;
              break;
            }
          }
        }

        if (!foundCert) throw new Error("No certificate found in PFX");

        const info: CertificateInfo = {
          subject: foundCert.subject.attributes
            .map((attr) => `${attr.shortName}=${attr.value}`)
            .join(", "),
          issuer: foundCert.issuer.attributes
            .map((attr) => `${attr.shortName}=${attr.value}`)
            .join(", "),
          validFrom: foundCert.validity.notBefore.toISOString(),
          validTo: foundCert.validity.notAfter.toISOString(),
          publicKeyAlgorithm:
            foundCert.publicKey &&
            foundCert.publicKey.constructor &&
            foundCert.publicKey.constructor.name
              ? foundCert.publicKey.constructor.name
              : "Unknown",
          serialNumber: foundCert.serialNumber,
        };

        setCertInfo(info);
      } catch (err: any) {
        setError(err.message || "Error parsing certificate");
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, [certificateUrl, password]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
      </div>
    );
  }

  

  if(!password || error) {
    return (
      <>
        <form onSubmit={updatePassword} className="w-full flex flex-col items-start justify-start gap-2">
          <PasswordInputGroup name="password" label="Please enter your password to view the certificate" placeholder="******" type="password" />
          <SubmitBtn name="Verify" icon={<Shield size={18} />} disabled={loading} />
        </form>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </>
      
    )
  }

  return (
    certInfo && (
      <Card className="max-w-7xl mx-auto shadow-md">
        <CardHeader className="w-full flex-row flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-blue-500" /> Certificate Information
          </CardTitle>
          <Badge
              variant={
                status === "Expired"
                  ? "destructive"
                  : status === "Expiring soon"
                  ? "secondary"
                  : "secondary"
              }
              className={`px-3 py-1 ${
                status === "Valid" ? "bg-green-600 text-white hover:bg-green-700" : ""
              }`}
            >
              {status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="text-gray-500" /> <strong>Subject:</strong>{" "}
            {certInfo.subject}
          </div>
          <div className="flex items-center gap-2">
            <Building className="text-gray-500" /> <strong>Issuer:</strong>{" "}
            {certInfo.issuer}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500" /> <strong>Valid From:</strong>{" "}
            {new Date(certInfo.validFrom).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500" /> <strong>Valid To:</strong>{" "}
            {new Date(certInfo.validTo).toLocaleString()}
          </div>
          {/* <div className="flex items-center gap-2">
            <Key className="text-gray-500" />{" "}
            <strong>Public Key Algorithm:</strong>{" "}
            {certInfo.publicKeyAlgorithm}
          </div> */}
          <div className="flex items-center gap-2">
            <Key className="text-gray-500" /> <strong>Serial Number:</strong>{" "}
            {certInfo.serialNumber}
          </div>
        </CardContent>
      </Card>
    )
  );
}

