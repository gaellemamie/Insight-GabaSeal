"use client";

import { Button } from "@/components/ui/button";
import { createServiceRequest } from "@/lib/actions/seeker/ServiceRequest";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

interface IServiceRequestBtnProps {
     seekerId: string 
     institutionId:string
     name?:string
     icon?: ReactNode 
     className: string
}

export const ServiceRequestBtn = ({seekerId, institutionId, name, icon, className}: IServiceRequestBtnProps) => {
     const [loading,setLoading] = useState(false);
     const queryClient = useQueryClient();

     const sendRequest = async() => {
          setLoading(true);
          const newRequest = await createServiceRequest({
               institutionId, seeker: {connect: {id:seekerId}}
          });
          if(newRequest) {
               queryClient.invalidateQueries();
               toast.success("Request created successfully!");
          }else {
               toast.error("Something went wrong. please try again later");
          }
          return setLoading(false);
     }
     return <Button className={className} onClick={sendRequest} disabled={loading}>{icon && !loading ? icon : null} {name && !loading ? name : null} {loading ? <><Loader /> Loading...</> : null }</Button>
}