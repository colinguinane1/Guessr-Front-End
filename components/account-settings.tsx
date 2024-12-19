"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdManageAccounts } from "react-icons/md";
import api from "@/utils/axios";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";
import { AxiosError } from "axios";

interface AccountSettingsProps {
  user: User;
}

export default function AccountSettings({ user }: AccountSettingsProps) {
  const [changeUsername, setChangeUsername] = useState(user.username);
  const [changePassword, setChangePassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const { refetchUserData } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const response = await api.post("/api/auth/account", {
        userId: user?._id,
        username: changeUsername,
        password: changePassword,
      });
      if (response.status !== 200) {
        console.error("No user data in response");
        toast.error("Error updating account.");
      } else {
        toast.success("Account updated successfully!");
      }
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.message);
    }

    setFormLoading(false);
    refetchUserData();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col max-w-2xl w-full  space-y-2 bg-card border p-4 rounded-xl items-center gap-4"
    >
      <h1 className="flex items-center gap-2">
        <MdManageAccounts />
        Account Settings
      </h1>
      <div>
        <div>
          {" "}
          <Label htmlFor="username">Email</Label>
          <Input
            id="password"
            type="text"
            placeholder="Email"
            disabled
            value={user?.email}
          ></Input>
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => setChangeUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Change Username"
            value={changeUsername}
          ></Input>
        </div>

        {/* <div>
          <Label htmlFor="username">Password</Label>
          <Input
            onChange={(e) => setChangePassword(e.target.value)}
            id="password"
            type="text"
            placeholder="Change Password"
            value={changePassword}
          ></Input>
        </div> */}
      </div>
      <div className="flex justify-between w-full items-center">
        <Button variant={"outline"} type="submit" disabled={formLoading}>
          {formLoading ? <Loading /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
