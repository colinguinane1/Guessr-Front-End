"use client";
import api from "@/utils/axios";
import { use } from "react";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { CgSpinner } from "react-icons/cg";
import { useUser } from "@/context/UserContext";
import UserCard from "@/components/UserCard";
import { EyeIcon } from "lucide-react";

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

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const cutGuessedNumbers = profile?.guessed_numbers.slice(
    0,
    profile.guessed_numbers.length - 5
  );

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
    <div className="flex flex-col p-4 w-full   space-y-4 justify-center">
      <UserCard user={profile} />
      <p className="flex items-center gap-1">
        {profile?.profile_views} <EyeIcon size={15} /> views
      </p>

      {(cutGuessedNumbers?.length ?? 0) > 0 ? (
        <div className="flex bg-card w-full max-w-2xl p-4 rounded-xl border flex-col gap-2">
          {" "}
          <p>{cutGuessedNumbers?.length} guessed numbers</p>
          {cutGuessedNumbers?.map((number) => (
            <div
              key={number._id}
              className="flex items-center justify-between w-full gap-2"
            >
              <div className="flex items-center gap-2">
                <p className="capitalize">{number.difficulty}</p>
                <p>{number.value}</p>
              </div>

              <div>
                <p>{formatDate(number.created)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No guessed numbers</p>
      )}
    </div>
  );
}
