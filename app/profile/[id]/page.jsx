"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Loading from "@utils/Loading";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
      setLoading(false);
    };
    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Profile
          name={`${userName}'s`}
          desc={`Welcome to ${userName}'s personalized profile page`}
          data={userPosts}
        />
      )}
    </div>
  );
};

export default UserProfile;
