"use client";
import api from "@/utils/axios";
import { use } from "react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { CgSpinner } from "react-icons/cg";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
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
    <div>
      <p>User: {id}</p>
      <pre>{JSON.stringify(profile)}</pre>
    </div>
  );
}
