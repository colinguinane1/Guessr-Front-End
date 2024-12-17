"use client";
import api from "@/utils/axios";
import { use } from "react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { CgSpinner } from "react-icons/cg";
import { useUser } from "@/context/UserContext";
import UserCard from "@/components/UserCard";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user } = useUser();
  const { id } = resolvedParams;
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async (id: string) => {
      const response = await api.get(`/api/auth/profile/${id}`);
      if (!response.data) {
        console.error("No user data in response");
        return;
      }
      console.log(profile);
      setProfile(response.data);
      setLoading(false);
    };

    if (id) {
      fetchUserById(id);
    }
    const addProfileView = async (id: string) => {
      const response = await api.post(`/api/auth/profile/${id}`, { user });
      if (!response.data) {
        console.error("No user data in response");
        return;
      }
      console.log(profile?.profile_views);
    };
    addProfileView(id);
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-screen min-w-screen place-content-center">
        <p>
          <CgSpinner size={50} className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4  text-lg space-y-4 justify-center">
      <UserCard user={profile} />
      <p>{profile?.profile_views} profile views.</p>
      <p>
        {profile?.guessed_numbers.map((number) => (
          <div key={number._id}>
            <p>{number.value}</p>
          </div>
        ))}
      </p>
    </div>
  );
}
