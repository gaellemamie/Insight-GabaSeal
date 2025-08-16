"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSeekerContext } from "@/lib/contexts/SeekerContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSeekerById } from "@/lib/actions/seeker/Seeker";
import { SSeekerUpdate } from "@/lib/select-types/seeker/seeker";
import { fetchUserById } from "@/lib/actions/auth/user";
import { SUserUpdate } from "@/lib/select-types/auth/user";

export default function SeekerProfileSettingsPage() {
     const { seeker } = useSeekerContext();
     const {data: seekerData} = useQuery({
          queryKey:["seeker", "profile-page", seeker.id],
          queryFn: () => fetchSeekerById(seeker.id, SSeekerUpdate)
     });

     const {data:userData} = useQuery({
          queryKey: ["seeker", "user-info", seeker.id],
          queryFn: () => fetchUserById(seeker.userId, SUserUpdate)
     })

  // Submit Handlers (to be implemented by you)
  const handleUserUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update logic for User model
  };

  const handleSeekerUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update logic for Seeker model
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Profile Settings</h2>

      {/* Account Information */}
      <Card className="mb-6 border border-blue-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Account Information</CardTitle>
        </CardHeader>
        <Separator />
        <form onSubmit={handleUserUpdate}>
          <CardContent className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={userData?.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
              />
            </div>
            <div className="grid gap-2">
              <Label>Profile Image URL</Label>
              <Input
                type="url"
                defaultValue={userData?.image ?? ""}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Update Account
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Seeker Profile */}
      <Card className="border border-blue-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Seeker Profile</CardTitle>
        </CardHeader>
        <Separator />
        <form onSubmit={handleSeekerUpdate}>
          <CardContent className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                defaultValue={seekerData?.name}
                name="name"
                id="name"
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                    name="phone"
                    type="phone"
                    id="phone"
                    defaultValue={seekerData?.phone ?? ""}
                    placeholder="Enter your phone number"
              />
            </div>
            <div className="grid gap-2">
              <Label>Location</Label>
              <Input
                defaultValue={seekerData?.location}
                name="location"
                id="location"
                placeholder="Enter your location"
              />
            </div>
            <div className="grid gap-2">
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dob"
                id="dob"
                defaultValue={seekerData?.dob.toDateString()}
               />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Select
                defaultValue={seekerData?.gender}
                name="gender"
               >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>National ID</Label>
              <Input
                value={seekerData?.nationalId}
                name="nationalId"
                id="nationalId"
                placeholder="Enter your national ID"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Update Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
