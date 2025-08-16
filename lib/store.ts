import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string
  email: string
  password: string
  role: "admin" | "institution" | "seeker"
  name?: string
  institutionName?: string
}

export interface Institution {
  id: string
  name: string
  email: string
  password: string
  status: "pending" | "verified"
  createdAt: string
  contactPerson?: string
  phone?: string
  address?: string
}

export interface DocumentType {
  id: string
  name: string
  description: string
  institutionId: string
  institutionName: string
  format: string[]
  templateUrl?: string
  placeholders: string[]
  createdAt: string
  template?: string // HTML template with placeholders
}

export interface SeekerRequest {
  id: string
  documentTypeId: string
  documentTypeName: string
  institutionId: string
  institutionName: string
  seekerId: string
  seekerName: string
  seekerEmail: string
  status: "pending" | "approved" | "rejected"
  requestedAt: string
  approvedAt?: string
  generatedDocUrl?: string
  placeholderValues?: Record<string, string>
  signedDocumentContent?: string // HTML content with filled placeholders
  certificateUsed?: string // ID of certificate used for signing
}

export interface GeneratedDocument {
  id: string
  name: string
  url: string
  institutionId: string
  requestId?: string
  createdAt: string
  isSigned?: boolean
  certificateUsed?: string
}

export interface Certificate {
  id: string
  name: string
  institutionId: string
  fileName: string
  fileContent: string // Base64 encoded PFX certificate content
  password: string // Password for PFX certificate
  issuer: string
  validFrom: string
  validTo: string
  status: "active" | "expired" | "revoked"
  uploadedAt: string
}

export interface VerificationRequest {
  id: string
  seekerId: string
  seekerName: string
  seekerEmail: string
  documentName: string
  documentContent: string // Base64 encoded document
  institutionId?: string
  institutionName?: string
  status: "pending" | "verified" | "invalid" | "rejected"
  uploadedAt: string
  verifiedAt?: string
  verificationResult?: {
    isValid: boolean
    certificateMatch: boolean
    contentIntegrity: boolean
    issuerVerified: boolean
    message: string
  }
}

interface AppState {
  // Auth
  currentUser: User | null

  // Data
  institutions: Institution[]
  documentTypes: DocumentType[]
  seekerRequests: SeekerRequest[]
  generatedDocuments: GeneratedDocument[]
  certificates: Certificate[]
  verificationRequests: VerificationRequest[]

  // Auth Actions
  login: (email: string, password: string) => User | null
  logout: () => void

  // Institution Actions
  addInstitution: (institution: Omit<Institution, "id" | "createdAt">) => Institution
  verifyInstitution: (id: string) => void
  getInstitutions: () => Institution[]

  // Document Type Actions
  addDocumentType: (docType: Omit<DocumentType, "id" | "createdAt">) => DocumentType
  getDocumentTypes: (institutionId?: string) => DocumentType[]
  updateDocumentType: (id: string, updates: Partial<DocumentType>) => void

  // Seeker Request Actions
  addSeekerRequest: (request: Omit<SeekerRequest, "id" | "requestedAt">) => SeekerRequest
  approveRequest: (id: string, generatedDocUrl: string, certificateId?: string) => void
  approveMultipleRequests: (requestIds: string[], certificateId?: string) => void
  rejectRequest: (id: string) => void
  getSeekerRequests: (institutionId?: string, seekerId?: string) => SeekerRequest[]

  // Generated Document Actions
  addGeneratedDocument: (doc: Omit<GeneratedDocument, "id" | "createdAt">) => GeneratedDocument
  getGeneratedDocuments: (institutionId?: string) => GeneratedDocument[]

  // Certificate Actions
  addCertificate: (cert: Omit<Certificate, "id" | "uploadedAt">) => Certificate
  getCertificates: (institutionId?: string) => Certificate[]
  updateCertificateStatus: (id: string, status: Certificate["status"]) => void
  deleteCertificate: (id: string) => void

  // Verification Actions
  addVerificationRequest: (request: Omit<VerificationRequest, "id" | "uploadedAt">) => VerificationRequest
  processVerificationRequest: (id: string, result: VerificationRequest["verificationResult"]) => void
  getVerificationRequests: (seekerId?: string, institutionId?: string) => VerificationRequest[]
}

const generateId = () => Math.random().toString(36).substr(2, 9)

// Simulate document signing by filling template placeholders and creating downloadable content
const signDocument = (template: string, placeholders: Record<string, string>, certificateId: string): string => {
  let signedContent = template

  // Replace placeholders with actual values
  Object.entries(placeholders).forEach(([placeholder, value]) => {
    const regex = new RegExp(`\\{${placeholder}\\}`, "g")
    signedContent = signedContent.replace(regex, value)
  })

  // Add digital signature simulation with proper styling
  const timestamp = new Date().toISOString()
  const signatureBlock = `
    <div style="margin-top: 40px; padding: 20px; border: 2px solid #059669; border-radius: 8px; background-color: #f0fdf4; page-break-inside: avoid;">
      <h3 style="color: #059669; margin: 0 0 10px 0; font-family: Arial, sans-serif;">Digital Signature</h3>
      <p style="margin: 5px 0; font-size: 14px; font-family: Arial, sans-serif;"><strong>Certificate ID:</strong> ${certificateId}</p>
      <p style="margin: 5px 0; font-size: 14px; font-family: Arial, sans-serif;"><strong>Signed At:</strong> ${timestamp}</p>
      <p style="margin: 5px 0; font-size: 14px; font-family: Arial, sans-serif;"><strong>Status:</strong> Digitally Signed and Verified</p>
      <p style="margin: 5px 0; font-size: 14px; font-family: Arial, sans-serif;"><strong>Signature Hash:</strong> SHA256:${Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
      <div style="margin-top: 10px; padding: 10px; background-color: #dcfce7; border-radius: 4px;">
        <p style="margin: 0; font-size: 12px; color: #166534; font-family: Arial, sans-serif;">
          This document has been digitally signed using a PFX certificate and is legally binding. 
          Any modifications after signing will invalidate the signature.
        </p>
      </div>
    </div>
  `

  // Create complete HTML document
  const completeDocument = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signed Document</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .document-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .document-content { margin-bottom: 30px; }
        @media print { body { margin: 0; padding: 15px; } }
    </style>
</head>
<body>
    <div class="document-header">
        <h1>Official Document</h1>
        <p>This is an officially signed document</p>
    </div>
    <div class="document-content">
        ${signedContent}
    </div>
    ${signatureBlock}
</body>
</html>
  `

  return completeDocument
}

// Simulate document verification
const verifyDocument = (
  documentContent: string,
  certificates: Certificate[],
): VerificationRequest["verificationResult"] => {
  // Check if document contains signature block
  const hasSignature = documentContent.includes("Digital Signature")

  if (!hasSignature) {
    return {
      isValid: false,
      certificateMatch: false,
      contentIntegrity: false,
      issuerVerified: false,
      message: "Document does not contain a digital signature",
    }
  }

  // Extract certificate ID from signature block (simplified simulation)
  const certMatch = documentContent.match(/Certificate ID:\s*([^\s<]+)/)
  const certificateId = certMatch ? certMatch[1] : null

  if (!certificateId) {
    return {
      isValid: false,
      certificateMatch: false,
      contentIntegrity: false,
      issuerVerified: false,
      message: "Cannot extract certificate information from signature",
    }
  }

  // Check if certificate exists and is active
  const certificate = certificates.find((cert) => cert.id === certificateId && cert.status === "active")

  if (!certificate) {
    return {
      isValid: false,
      certificateMatch: false,
      contentIntegrity: true,
      issuerVerified: false,
      message: "Certificate not found or inactive",
    }
  }

  // Check certificate validity
  const now = new Date()
  const validFrom = new Date(certificate.validFrom)
  const validTo = new Date(certificate.validTo)

  if (now < validFrom || now > validTo) {
    return {
      isValid: false,
      certificateMatch: true,
      contentIntegrity: true,
      issuerVerified: false,
      message: "Certificate has expired or is not yet valid",
    }
  }

  // All checks passed
  return {
    isValid: true,
    certificateMatch: true,
    contentIntegrity: true,
    issuerVerified: true,
    message: "Document signature is valid and verified",
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentUser: null,
      institutions: [],
      documentTypes: [],
      seekerRequests: [],
      generatedDocuments: [],
      certificates: [],
      verificationRequests: [],

      // Auth Actions
      login: (email: string, password: string) => {
        const state = get()

        // Check hardcoded users first
        const hardcodedUsers: User[] = [
          { id: "admin-1", email: "admin@demo.com", password: "admin123", role: "admin", name: "System Admin" },
          { id: "seeker-1", email: "seeker@demo.com", password: "seek123", role: "seeker", name: "John Seeker" },
        ]

        const hardcodedUser = hardcodedUsers.find((u) => u.email === email && u.password === password)
        if (hardcodedUser) {
          set({ currentUser: hardcodedUser })
          return hardcodedUser
        }

        // Check institutions
        const institution = state.institutions.find(
          (inst) => inst.email === email && inst.password === password && inst.status === "verified",
        )

        if (institution) {
          const user: User = {
            id: institution.id,
            email: institution.email,
            password: institution.password,
            role: "institution",
            name: institution.contactPerson || "Institution Admin",
            institutionName: institution.name,
          }
          set({ currentUser: user })
          return user
        }

        return null
      },

      logout: () => {
        set({ currentUser: null })
      },

      // Institution Actions
      addInstitution: (institutionData) => {
        const newInstitution: Institution = {
          ...institutionData,
          id: generateId(),
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          institutions: [...state.institutions, newInstitution],
        }))

        return newInstitution
      },

      verifyInstitution: (id: string) => {
        set((state) => ({
          institutions: state.institutions.map((inst) =>
            inst.id === id ? { ...inst, status: "verified" as const } : inst,
          ),
        }))
      },

      getInstitutions: () => {
        return get().institutions
      },

      // Document Type Actions
      addDocumentType: (docTypeData) => {
        const newDocType: DocumentType = {
          ...docTypeData,
          id: generateId(),
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          documentTypes: [...state.documentTypes, newDocType],
        }))

        return newDocType
      },

      updateDocumentType: (id: string, updates: Partial<DocumentType>) => {
        set((state) => ({
          documentTypes: state.documentTypes.map((docType) =>
            docType.id === id ? { ...docType, ...updates } : docType,
          ),
        }))
      },

      getDocumentTypes: (institutionId?: string) => {
        const docTypes = get().documentTypes
        return institutionId ? docTypes.filter((dt) => dt.institutionId === institutionId) : docTypes
      },

      // Seeker Request Actions
      addSeekerRequest: (requestData) => {
        const newRequest: SeekerRequest = {
          ...requestData,
          id: generateId(),
          requestedAt: new Date().toISOString(),
        }

        set((state) => ({
          seekerRequests: [...state.seekerRequests, newRequest],
        }))

        return newRequest
      },

      approveRequest: (id: string, generatedDocUrl: string, certificateId?: string) => {
        const state = get()
        const request = state.seekerRequests.find((req) => req.id === id)
        const docType = state.documentTypes.find((dt) => dt.id === request?.documentTypeId)

        let signedContent = ""
        if (request && docType && docType.template && request.placeholderValues && certificateId) {
          signedContent = signDocument(docType.template, request.placeholderValues, certificateId)
        }

        set((state) => ({
          seekerRequests: state.seekerRequests.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: "approved" as const,
                  approvedAt: new Date().toISOString(),
                  generatedDocUrl,
                  signedDocumentContent: signedContent,
                  certificateUsed: certificateId,
                }
              : req,
          ),
        }))
      },

      approveMultipleRequests: (requestIds: string[], certificateId?: string) => {
        const state = get()

        set((state) => ({
          seekerRequests: state.seekerRequests.map((req) => {
            if (requestIds.includes(req.id)) {
              const docType = state.documentTypes.find((dt) => dt.id === req.documentTypeId)
              let signedContent = ""

              if (docType && docType.template && req.placeholderValues && certificateId) {
                signedContent = signDocument(docType.template, req.placeholderValues, certificateId)
              }

              return {
                ...req,
                status: "approved" as const,
                approvedAt: new Date().toISOString(),
                generatedDocUrl: `/generated/approved-document-${req.id}.pdf`,
                signedDocumentContent: signedContent,
                certificateUsed: certificateId,
              }
            }
            return req
          }),
        }))
      },

      rejectRequest: (id: string) => {
        set((state) => ({
          seekerRequests: state.seekerRequests.map((req) =>
            req.id === id ? { ...req, status: "rejected" as const } : req,
          ),
        }))
      },

      getSeekerRequests: (institutionId?: string, seekerId?: string) => {
        const requests = get().seekerRequests
        let filtered = requests

        if (institutionId) {
          filtered = filtered.filter((req) => req.institutionId === institutionId)
        }

        if (seekerId) {
          filtered = filtered.filter((req) => req.seekerId === seekerId)
        }

        return filtered
      },

      // Generated Document Actions
      addGeneratedDocument: (docData) => {
        const newDoc: GeneratedDocument = {
          ...docData,
          id: generateId(),
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          generatedDocuments: [...state.generatedDocuments, newDoc],
        }))

        return newDoc
      },

      getGeneratedDocuments: (institutionId?: string) => {
        const docs = get().generatedDocuments
        return institutionId ? docs.filter((doc) => doc.institutionId === institutionId) : docs
      },

      // Certificate Actions
      addCertificate: (certData) => {
        const newCert: Certificate = {
          ...certData,
          id: generateId(),
          uploadedAt: new Date().toISOString(),
        }

        set((state) => ({
          certificates: [...state.certificates, newCert],
        }))

        return newCert
      },

      getCertificates: (institutionId?: string) => {
        const certs = get().certificates
        return institutionId ? certs.filter((cert) => cert.institutionId === institutionId) : certs
      },

      updateCertificateStatus: (id: string, status: Certificate["status"]) => {
        set((state) => ({
          certificates: state.certificates.map((cert) => (cert.id === id ? { ...cert, status } : cert)),
        }))
      },

      deleteCertificate: (id: string) => {
        set((state) => ({
          certificates: state.certificates.filter((cert) => cert.id !== id),
        }))
      },

      // Verification Actions
      addVerificationRequest: (requestData) => {
        const newRequest: VerificationRequest = {
          ...requestData,
          id: generateId(),
          uploadedAt: new Date().toISOString(),
        }

        set((state) => ({
          verificationRequests: [...state.verificationRequests, newRequest],
        }))

        return newRequest
      },

      processVerificationRequest: (id: string, result: VerificationRequest["verificationResult"]) => {
        set((state) => ({
          verificationRequests: state.verificationRequests.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: result?.isValid ? "verified" : "invalid",
                  verifiedAt: new Date().toISOString(),
                  verificationResult: result,
                }
              : req,
          ),
        }))
      },

      getVerificationRequests: (seekerId?: string, institutionId?: string) => {
        const requests = get().verificationRequests
        let filtered = requests

        if (seekerId) {
          filtered = filtered.filter((req) => req.seekerId === seekerId)
        }

        if (institutionId) {
          filtered = filtered.filter((req) => req.institutionId === institutionId)
        }

        return filtered
      },
    }),
    {
      name: "insight-demo-storage",
      partialize: (state) => ({
        institutions: state.institutions,
        documentTypes: state.documentTypes,
        seekerRequests: state.seekerRequests,
        generatedDocuments: state.generatedDocuments,
        certificates: state.certificates,
        verificationRequests: state.verificationRequests,
        currentUser: state.currentUser,
      }),
    },
  ),
)
