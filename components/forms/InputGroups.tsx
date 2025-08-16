"use client";

import { ChangeEvent, ReactNode, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type TInputMode = "text" | "search" | "email" | "tel" | "url" | "numeric" | "none" | "decimal" | undefined;

export const TextInputGroup = ({type="text",label, placeholder,name, accept,required=true, action, defaultValue, maxWords=20, inputMode="text"}:{label: string, placeholder:string, name:string, required?: boolean, inputMode?:TInputMode,accept?:string ,defaultValue?: string , maxWords?:number, type:string, action?:(e:string | number) => unknown}) => {
     const [value, setValue] = useState(defaultValue || "");

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
     const inputValue = e.target.value;
     const wordCount = inputValue.trim().split(/\s+/).length;

     if (wordCount <= maxWords) {
          setValue(inputValue);
          if (action) action(inputValue);
     }
     };
     return (
          <div className="w-full flex flex-col items-start gap-[5px]">
               <label
               className="w-full rounded-[5px] text-[1rem] font-medium text-gray-800 text-start"
               htmlFor={name}
               >
               {label}
               </label>
               <Input
               type={type === "number" ? "text" : type}
               className="w-full"
               name={name}
               id={name}
               accept={accept}
               placeholder={placeholder}
               required={required}
               value={value}
               onChange={handleChange}
               inputMode={type ==="email" ? "email" : type === "number" ? "numeric" : type === "phone" ? "tel" : inputMode}
               />
          </div>
     )
}

export const PasswordInputGroup = ({label, placeholder,name, required=true, action}:{label: string, placeholder:string, name:string, required?: boolean, type:string, action?:(e:string | number) => unknown}) => {
     const [showPassword, setShowPassword] = useState<boolean>(false);
     return (
          <div className="w-full  flex flex-col items-start gap-[5px]">
               <label className="w-full rounded-[5px] text-[1rem] font-medium text-gray-800" htmlFor={name}>{label}</label>
               <div className="w-full relative">
                    <Input type={showPassword ? 'text' :"password"} className="w-full" name={name} id={name} placeholder={placeholder} required={required} onChange={(e:ChangeEvent<HTMLInputElement>) => action ? action(e.target.value) : () =>{}} />
                    <i onClick={()=> setShowPassword(prev => !prev)} className="absolute top-[50%] -translate-y-[50%] right-[10px] text-gray-700 cursor-pointer " >{showPassword ? <FaEye /> : <FaEyeSlash />}</i>
               </div>
          </div>
     )
}

export const SelectInputGroup = ({label, name, required=true,values, action}:{label: string, name:string, required?: boolean, values: Array<{label:string, value:string}>, action?: (res:string) => unknown}) => {
     return (
          <div className="w-full flex flex-col items-start gap-[5px]">
               <label className="text-[1rem] font-medium text-gray-800" htmlFor={name}>{label}</label>
               <Select onValueChange={v => action ? action(v) : () => {} } required={required} name={name}>
                    <SelectTrigger className="w-full">
                         <SelectValue placeholder={`Select ${name}`} />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                         <SelectGroup>
                              <SelectLabel>{name}</SelectLabel>
                              {values.map((v, index) => <SelectItem key={`${name}-value-${index}`} value={v.value}>{v.label}</SelectItem>)}
                              
                         </SelectGroup>
                    </SelectContent>
               </Select>
          </div>
     )
}

export const ObjSelectInputGroup = ({label, name, required=true,values, action}:{label: string, name:string, required?: boolean, values: Array<{label:string, value:string}>, action?: (res:string) => unknown}) => {
     return (
          <div className="w-full flex flex-col items-start gap-[5px]">
               <label className="text-[1rem] font-medium text-gray-800" htmlFor={name}>{label}</label>
               <select onChange={(e:ChangeEvent<HTMLSelectElement>) => action ? action(e.target.value) : () => {}}  className=" w-full rounded-[5px] text-[0.8rem] text-gray-900 border border-gray-400 bg-gray-200 outline-none py-[9.5px] px-[10px]" name={name} id={name} required={required}>
                    <option value="">Select {name}</option>
                    {
                         values.map((value, index) => <option key={`${name}-${index}`} value={value.value} >{value.label}</option>)
                    }
               </select>
          </div>
     )
}

export const CheckInputGroup = ({label, placeholder,name, required=true}:{label: string, placeholder:string, name:string, required?: boolean}) => {
     return (
          <div className="w-full flex  items-center gap-[5px]">
               <label className="text-[1rem] font-medium text-gray-800" htmlFor={name}>{label}</label>
               <input type="checkbox" className="text-[0.8rem] text-gray-900 border border-gray-400 bg-gray-200 outline-none" name={name} id={name} placeholder={placeholder} required={required} />
          </div>
     )
}

export const RadioInputGroup = ({label, name, required=true, defaultChecked=false}:{label: string,  name:string, required?: boolean, defaultChecked?:boolean}) => {
     return (
          <div className="w-full flex  items-center gap-[5px]">
               <label className="text-[1rem] font-medium text-gray-800" htmlFor={name}>{label}</label>
               <input type="checkbox" defaultChecked={defaultChecked} className="text-[1rem] text-gray-900 border border-gray-400 bg-gray-200 outline-none" name={name} id={name} required={required} />
          </div>
     )
}

export const TextAreaInputGroup = ({label, placeholder,name, required=true, action, maxWords,defaultValue}:{label: string, placeholder:string, name:string, required?: boolean, action?:(e:string | number) => unknown, maxWords:number,defaultValue?:string}) => {
     
     const [wordCount, setWordCount] = useState(0);
     const [text, setText] = useState("");

     const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
          const inputText = e.target.value;
          const words = inputText.trim().split(/\s+/).filter(Boolean);
          
          if (words.length <= maxWords) {
               setText(inputText);
               setWordCount(words.length);
               if (action) action(inputText);
          }
     };
     return (
          <div className="w-full  flex flex-col items-start gap-[5px]">
               <div className="w-full flex items-center justify-start gap-[10px]">
                    <label className="w-full rounded-[5px] text-[1rem] font-medium text-gray-800" htmlFor={name}>{label}</label>
                    <span className="text-gray-600 text-xs mt-1 whitespace-nowrap">
                    {wordCount} / {maxWords} words
                    </span>
               </div>
               <Textarea className="w-full" name={name} id={name} required={required} defaultValue={defaultValue} onChange={handleChange} placeholder={placeholder} />
          </div>
     )
}

export const SubmitBtn = ({className, disabled=false,name, icon, }:{className?:string, disabled?:boolean,name?:string, icon?:ReactNode}) => {
     return(
          <button type="submit" disabled={disabled} className={`w-full flex items-center text-white justify-center gap-[8px] rounded-[8px] py-[8px] px-[12px] disabled:cursor-not-allowed ${className ? className : "bg-blue-600 hover:bg-blue-800 " }`}>{icon? icon : ""}{name ? name : "bg"}</button>
     )
}