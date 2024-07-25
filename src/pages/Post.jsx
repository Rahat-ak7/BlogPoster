import React, { useEffect, useState } from "react";
import { Container, Button } from "../components";
import configServices from "../AppWrite/configure";
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Post() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null); // Use singular to indicate a single post
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      configServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/"); // Redirect if post not found
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (post) {
      const status = await configServices.deletePost(post.$id);
      if (status) {
        if (post.FeaturedImage) {
          await configServices.DeleteFile(post.FeaturedImage);
        }
        navigate("/");
      }
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full justify-center flex mb-4 relative border rounded-xl p-2">
          {post.FeaturedImage && (
            <img
              src={configServices.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-xl"
            />
          )}
        </div>
        {isAuthor && (
          <div className="flex right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColour="bg-green-500"
                className="mr-3 text-white font-bold"
              >
                Edit
              </Button>
            </Link>
            <Button
              onClick={deletePost}
              bgColour="bg-red-500 text-white font-bold"
            >
              Delete
            </Button>
          </div>
        )}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-white">Author:</h1>
          <p className="text-xl font-bold text-gray-400"> {post.title}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">Description</p>
          {/* <div className="browser-css"></div> */}
          <p className="text-xl font-bold text-gray-400">
            {parse(post.content)}{" "}
          </p>
        </div>
      </Container>
    </div>
  ) : (
    <>
      <button
        className="w-64 absolute top-1/2 left-[30%] inline-block rounded-full bg-green-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
        type="button"
      >
        <div
          role="status"
          class="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        Wait for Posts
      </button>
    </>
  );
}

export default Post;
