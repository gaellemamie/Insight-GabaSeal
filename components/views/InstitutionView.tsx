"use client";

import { fetchInstitutionById } from "@/lib/actions/institution/Institution";
import { SInstitutionView } from "@/lib/select-types/institution/institution";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { CircleX, Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Skeleton } from "../ui/skeleton";
import { DepartmentFormToggler } from "../forms/institution/DepartmentForm";
import { EmployeeRoleFormToggler } from "../forms/institution/EmployeeRoleForm";
import { EmployeeFormToggler } from "../forms/institution/EmployeeForm";

export const InstitutionView =({id}: {id:string}) =>{
     const {data, isLoading, isError} = useQuery({
          queryKey: [`institution-view-${id}`],
          queryFn: () => fetchInstitutionById(id, SInstitutionView)
     })
     if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <Skeleton className="w-full h-24 rounded-xl" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-500">Failed to load institution data.</div>;
  }

  const { name, departments } = data;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <Card className="shadow-sm border-blue-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-blue-800">
            Institution: {name}
          </CardTitle>
          <DepartmentFormToggler institutionId={data.id} title={`Add Department in ${data.name}`} className="py-2 px-3 border hover:bg-gray-100 border-gray-400 rounded-md flex items-center gap-2 text-gray-600" name="Add Department" icon={<Plus className="w-4 h-4 mr-1" /> } />
        </CardHeader>
      </Card>

      <Accordion type="multiple" className="w-full">
        {departments.map((dept) => (
          <AccordionItem key={dept.id} value={`dept-${dept.id}`}>
            <AccordionTrigger className="text-lg font-medium text-blue-700">
              {dept.name}
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="flex justify-end">
               <EmployeeRoleFormToggler departmentId={dept.id} title={`Add Employee Role in ${dept.name} - ${data.name}`} className="py-2 px-3 border hover:bg-gray-100 border-gray-400 rounded-md flex items-center gap-2 text-gray-600" name="Add Role" icon={<Plus className="w-4 h-4 mr-1" /> } />
              </div>
              <Accordion type="multiple">
                {dept.roles.map((role) => (
                  <AccordionItem key={role.id} value={`role-${role.id}`}>
                    <AccordionTrigger className="text-base text-gray-800">
                      {role.name}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <div className="flex justify-end">
                         <EmployeeFormToggler institutionId={data.id} title={`Add Employee in ${dept.name} - ${data.name}`} className="py-2 px-3 border hover:bg-gray-100 border-gray-400 rounded-md flex items-center gap-2 text-gray-600" name="Add Employee" icon={<Plus className="w-4 h-4 mr-1" /> } />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {
                          role.employee ? 
                            <Card
                            key={role.employee.id}
                            className="border bg-white shadow-sm p-3"
                          >
                            <CardHeader className="p-0">
                              <CardTitle className="text-base font-medium text-gray-900">
                                {role.employee.name} — {role.employee.email}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600 space-y-1">
                              <p>Status: {role.employee.status}</p>
                              <p>Phone: {role.employee.phone}</p>
                              <p>Role: {role.name}</p>
                              <p>Department: {role.name}</p>
                            </CardContent>
                          </Card>
                          :
                          <p className="text-gray-600">No Employee added to this role</p>
                        }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export const InstitutionViewToggler = ({id, className,name, icon, title}:{id:string, name?:string, icon?:ReactNode, className:string, title: string}) => {
     const [open,setOpen] = useState(false);
     if(!open) return <button type="button" onClick={() => setOpen(true)} className={className}>{icon? icon : null} {name ? name : ""}</button>

     return (
          <Dialog open={open} onClose={() => {}} className="relative z-50">
               <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex justify-center items-center ">
               <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[80%] max-h-[90%] overflow-y-auto flex flex-col items-center justify-start gap-[10px]" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex items-center justify-between gap-[8px]">
                         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                         <CircleX size={32} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>
                    <InstitutionView id={id} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}