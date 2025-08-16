"use client";

import { useSeekerContext } from "@/lib/contexts/SeekerContext";
import { fetchDocument } from "@/lib/actions/signing/document";
import { fetchDocumentRequest } from "@/lib/actions/signing/document-request";
import { SSeekerDocument } from "@/lib/select-types/signing/document";
import { SSeekerDocumentRequest } from "@/lib/select-types/signing/document-request";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, FileCheck, FileClock } from "lucide-react";
import { format } from "date-fns";
import { EDocumentRequestStatus } from "@/prisma/lib/generated/prisma";

export default function NotificationsPage() {
  const { seeker } = useSeekerContext();

  const { data: documentRequestsData, isLoading: fetchingDocumentRequests } = useQuery({
    queryKey: ["document-requests", "notifications", seeker.id],
    queryFn: () => fetchDocumentRequest(SSeekerDocumentRequest, { seekerId: seeker.id }, 1000),
  });

  const { data: documentsData, isLoading: fetchingDocuments } = useQuery({
    queryKey: ["documents", "notifications", seeker.id],
    queryFn: () => fetchDocument(SSeekerDocument, { seekerId: seeker.id }, 1000),
  });

  if (fetchingDocuments || fetchingDocumentRequests) {
    return <div className="text-center py-6 text-blue-600 font-medium">Loading notifications...</div>;
  }

  const documentRequests = documentRequestsData ? documentRequestsData.data : []
  const documents = documentsData ? documentsData.data : []

  // Merge notifications
  const notifications = [
    ...(documentRequests?.map((req) => ({
      id: req.id,
      type: "request" as const,
      title: `Document Request: ${req.documentType.name}`,
      status: req.status,
      date: req.updatedAt || req.createdAt,
      description: req.description || "No description provided",
    })) || []),
    ...(documents?.map((doc) => ({
      id: doc.id,
      type: "document" as const,
      title: `Document Created: ${doc.name}`,
      status: "approved",
      date: doc.updatedAt || doc.createdAt,
      description: `Type: ${doc.documentType.name}`,
    })) || []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by latest first

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Notifications</h2>

      <Card className="shadow-md border border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notifications yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {notifications.map((notif, i) => (
                <div key={notif.id}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-full">
                      {notif.type === "document" ? (
                        <FileText className="w-5 h-5 text-blue-600" />
                      ) : notif.status === EDocumentRequestStatus.APPROVED ? (
                        <FileCheck className="w-5 h-5 text-green-600" />
                      ) : (
                        <FileClock className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{notif.title}</p>
                      <p className="text-sm text-gray-600">{notif.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={
                            notif.status === "approved"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : notif.status === "pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }
                        >
                          {notif.status}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {format(new Date(notif.date), "PPpp")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {i < notifications.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}