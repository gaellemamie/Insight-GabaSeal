"use client";

import {
     Card,
     CardContent,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";

import { Gauge, Activity, ShieldCheck, Users, Mail, Building2, Bell } from "lucide-react";

const modules = [
     {
          name: "Auth Module",
          icon: ShieldCheck,
          stats: {
               uptime: "99.97%",
               avgLatency: "120ms",
               errors: 2,
          },
     },
     {
          name: "Management Module",
          icon: Users,
          stats: {
               uptime: "99.90%",
               avgLatency: "140ms",
               errors: 5,
          },
     },
     {
          name: "Seeker Module",
          icon: Activity,
          stats: {
               uptime: "99.80%",
               avgLatency: "160ms",
               errors: 1,
          },
     },
     {
          name: "Signing Module",
          icon: Gauge,
          stats: {
               uptime: "99.95%",
               avgLatency: "100ms",
               errors: 0,
          },
     },
     {
          name: "Message Module",
          icon: Mail,
          stats: {
               uptime: "99.85%",
               avgLatency: "130ms",
               errors: 4,
          },
     },
     {
          name: "Institution Module",
          icon: Building2,
          stats: {
               uptime: "99.89%",
               avgLatency: "110ms",
               errors: 3,
          },
     },
     {
          name: "Notification Module",
          icon: Bell,
          stats: {
               uptime: "99.92%",
               avgLatency: "125ms",
               errors: 2,
          },
     },
];

export default function MonitoringPage() {
     return (
     <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
               <h2 className="text-2xl font-bold text-navy-blue-900">
               Overall Monitoring of GabaSeal
               </h2>
               <p className="text-gray-600 mt-1">
               View live performance of all key modules in GabaSeal.
               </p>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
               <Card key={mod.name} className="bg-white shadow-md border-blue-100">
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-base font-medium text-blue-800 flex items-center gap-2">
                    <mod.icon className="w-5 h-5 text-blue-600" />
                    {mod.name}
               </CardTitle>
               </CardHeader>
               <CardContent className="pt-2">
               <div className="text-sm text-gray-600 mb-1">
                    Uptime:{" "}
                    <span className="font-semibold text-green-600">
                    {mod.stats.uptime}
                    </span>
               </div>
               <div className="text-sm text-gray-600 mb-1">
                    Avg Latency:{" "}
                    <span className="font-semibold text-yellow-600">
                    {mod.stats.avgLatency}
                    </span>
               </div>
               <div className="text-sm text-gray-600">
                    Errors:{" "}
                    <span
                    className={`font-semibold ${
                         mod.stats.errors > 0 ? "text-red-600" : "text-green-600"
                    }`}
                    >
                    {mod.stats.errors}
                    </span>
               </div>
               </CardContent>
               </Card>
          ))}
          </div>
     </div>
     );
}
