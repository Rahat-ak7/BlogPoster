import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import configServices from "../AppWrite/configure";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await configServices.getAllPost([]);
        // console.log("🚀 ~ fetchPosts ~ postsData:", postsData);
        if (postsData) {
          setPosts(postsData.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-2xl font-bold text-white">Posts:</h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-full md:w-1/2 lg:w-1/3" key={post.$id}>
              <PostCard
                $id={post.$id}
                title={post.title}
                FeaturedImage={post.FeaturedImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
