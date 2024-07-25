import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import configServices from "../AppWrite/configure";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);
  // console.log("🚀 ~ configServices.getAllPost ~ posts:", posts);
  configServices.getAllPost([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  if (posts.length === 0) {
    return (
      <div className=" w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <button
                className="w-2/5 absolute top-1/2 left-[30%] inline-block rounded-full bg-green-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                type="button"
              >
                Upload Blogs...
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className=" w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className=" p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
