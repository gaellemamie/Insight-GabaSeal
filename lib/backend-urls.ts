

export const signingServer:string = process.env.NEXT_PUBLIC_SIGNING_SERVICE_URL || "";
export const absDocPath:string = process.env.NEXT_PUBLIC_DOC_PATH || "";
export const digitalSigningUrl:string = process.env.NEXT_PUBLIC_DIGITAL_SIGNING_URL || "";

export const Endpoints = {
     signing: {
          document: {
               default: "document",
               findBySeeker: "document/seeker",
          },
          documentType: {
               default: "document-type",
               findByInstitution: "document-type/institution",
          },
          documentRequest: {
               default: "document-request",
               findBySeeker: "document-request/seeker"
          },
          certificate: {
               default: "certificates"
          },
          upload: {
               default: "upload",
          }
     }
}