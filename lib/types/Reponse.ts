/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse <T =any> {
     success: boolean
     message: string 
     data?: T 
     statusCode: number
     error?: any
}