"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import { CircleX, Loader2, Trash2 } from "lucide-react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";
import { createEmployee, deleteEmployee, fetchEmployeeById, updateEmployee } from "@/lib/actions/institution/Employee";
import { PasswordInputGroup, SelectInputGroup, SubmitBtn, TextInputGroup } from "../InputGroups";
import { EEmployeeRoleType, EStatus, EUserType } from "@/prisma/lib/generated/prisma";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInstitutionById } from "@/lib/actions/institution/Institution";
import { SEmployeeFormInstitution } from "@/lib/select-types/institution/institution";
import { SEmployeeUpdate } from "@/lib/select-types/institution/employee";
import { createUser, updateUser } from "@/lib/actions/auth/user";

export const EmployeeForm = ({id, institutionId, onComplete}:{id?:string, institutionId:string, onComplete: () => void}) => {
     const [loading,setLoading] = useState(false);
     const [department,setDepartment] = useState<{id:string, name:string, roles: {id:string, name:string}[]} | null | undefined>(null);
     const {data: institutionData, isLoading: fetchingInstitution, isError: errorFetchingInstitutionData} = useQuery({
          queryKey: [`employee-update-${institutionId}`],
          queryFn:() => fetchInstitutionById(institutionId, SEmployeeFormInstitution)
     });
     const queryClient = useQueryClient();


     const {data: employee, isLoading: fetchingEmployee, isError: errorFetchingEmployee} = useQuery({
          queryKey: [`institution-form-update-${id}`],
          queryFn:() => id ? fetchEmployeeById(id, SEmployeeUpdate) : null
     });

     const submitForm = async (event: ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          try {
               setLoading(true);
               const formData = new FormData(event.currentTarget);
               const name = String(formData.get("name"));
               const email = String(formData.get("email"));
               const phone = String(formData.get("phone"));
               const departmentRole = String(formData.get("departmentRole"));
               const password = String(formData.get("password"));
               const platformRole = String(formData.get("platformRole"));
               const status = String(formData.get("status"));

               if(!employee) {
                    const newUser = await createUser({
                         email, password, type: EUserType.EMPLOYEE, status: status as EStatus
                    });
                    if(newUser) {
                         const newEmployee = await createEmployee({
                              name, email, phone, role: platformRole as EEmployeeRoleType, status: status as EStatus, userId: newUser.id, 
                              employeeRole: {connect:{id: departmentRole}}
                         });
                         if(newEmployee){
                              queryClient.invalidateQueries();
                              toast.success("Successfully save new employee");
                              return onComplete();
                         }
                         return toast.error("Something went wrong!. please try again");
                    }
                    return toast.error("Something went wrong! Contact support");
               }
               const updatedUser = await updateUser(employee.userId,{
                    ...(email ? {email} : {}),
                    ...(password ? {password} : {}),
                    ...(status ? {status: status as EStatus} : {}),
               });
               const updatedEmployee = await updateEmployee(employee.id, {
                    ...(name ? {name} : {}),
                    ...(email ? {email} : {}),
                    ...(phone ? {phone} : {}),
                    ...(platformRole ? {role: platformRole as EEmployeeRoleType} : {}),
                    ...(status ? {status: status as EStatus} : {}),
               });

               if(!updatedUser ||!updatedEmployee) return toast.error("Something went wrong employee");
               toast.success("successfully update employee data");
               return onComplete();

          } catch (error) {
               console.log(error);
               toast.error("Error saving new Employee. Try again later");
          }finally{
               setLoading(false);
          }
     }

     const fetchingData = fetchingEmployee || fetchingInstitution;
     const errorFetchingData = errorFetchingEmployee || errorFetchingInstitutionData || !institutionData;

     if(fetchingData) return <p className="w-full py-2 px-4 text-base font-medium text-gray-600">Loading...</p>
     if(errorFetchingData) return <p className="w-full py-2 px-4 text-base font-medium text-gray-600">An Error occurred while fetching data</p>

     return(
          <form onSubmit={submitForm} className="w-full flex flex-col items-start justify-start gap-4">
               <TextInputGroup name="name" type="text" label={`Full Name: ${employee ? employee.name : ""}`} placeholder="ex. Dushime Brother" required={employee ? false : true} />
               <TextInputGroup name="email" type="email" label={`Email: ${employee ? employee.email : ""}`} placeholder="ex. dushime@gmail.com" required={employee ? false : true} />
               <TextInputGroup name="phone" type="phone" label={`Phone: ${employee ? employee.phone : ""}`} placeholder="ex. dushime@gmail.com" required={employee ? false : true} />
               <PasswordInputGroup name="password" label="Password:" placeholder="****" type="password" required={employee ? true : false}  />
               <SelectInputGroup name="department" label={`Department: ${employee ? employee.employeeRole.department.name : ""}`}  values={institutionData?.departments.map(d => ({label: d.name, value: d.id}))}  required={employee ? false : true} action={res => setDepartment(institutionData.departments.find(d => d.id === res))} />
               {department ? <SelectInputGroup name="departmentRole" label={`Department Role: ${employee ? employee.employeeRole.department.name : ""}`}  values={department.roles.map(r => ({label: r.name, value: r.id}))}  required={employee ? false : true} />: null}
               <SelectInputGroup name="platformRole" label={`Platform Role: ${employee ? employee.role : ""}`}  values={Object.values(EEmployeeRoleType).map(r => ({label: r, value: r}))}  required={employee ? false : true} />
               <SelectInputGroup name="status" label={`Status: ${employee ? employee.status : ""}`}  values={Object.values(EStatus).map(s => ({label: s, value: s}))}  required={employee ? false : true} />
               <SubmitBtn name={id ? "Update Employee" : "Save Employee"} icon={loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null} disabled={loading} />
          </form>
     )
}


export const EmployeeFormToggler = ({id, className,name, icon, title, institutionId}:{id?:string, name?:string, icon?:ReactNode, className:string, title: string, institutionId: string }) => {
     const [open,setOpen] = useState(false);
     if(!open) return <button type="button" onClick={() => setOpen(true)} className={className}>{icon? icon : null} {name ? name : ""}</button>

     return (
          <Dialog open={open} onClose={() => {}} className="relative z-50">
               <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex justify-center items-center ">
               <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[40%] max-h-[90%] overflow-y-auto flex flex-col items-center justify-start gap-[10px]" onClick={(e) => e.stopPropagation()}>
                    <div className="w-full flex items-center justify-between gap-[8px]">
                         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                         <CircleX size={32} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setOpen(false)} />
                    </div>
                    <EmployeeForm institutionId={institutionId} id={id} onComplete={() => setOpen(false)} />
               </DialogPanel >
               </div>
          </Dialog>
     )
}

export const EmployeeDeleteBtn = ({id, className,name, icon}:{id:string, name?:string, icon?:ReactNode, className:string }) => {
     const [loading, setLoading] = useState(false);
     const queryClient = useQueryClient();

     const deleteAction = async () => {
          setLoading(true);
          const res = await deleteEmployee(id);
          if (res) {
               queryClient.invalidateQueries();
               toast.success("Successfully deleted Employee");
          }
          else toast.error("Error deleting Employee");
          setLoading(false);
     };

     return (
          <AlertDialog>
               <AlertDialogTrigger asChild>
               <Button variant="destructive" className={className}>
                    {icon ? icon : null}
                    {name}
               </Button>
               </AlertDialogTrigger>
               <AlertDialogContent className="bg-white text-black">
               <AlertDialogHeader>
                    <AlertDialogTitle className="text-blue-600">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the Employee and remove its data from our servers.
                    </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                    <AlertDialogCancel className="text-blue-600 border-blue-600 hover:bg-blue-50">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    disabled={loading}
                    onClick={deleteAction}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                    {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                    Confirm
                    </AlertDialogAction>
               </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     );
}