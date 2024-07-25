import React from "react";
import { Link } from "react-router-dom";
import configServices from "../AppWrite/configure";

function PostCard({ $id, title, FeaturedImage }) {
  // function PostCard(data) {
  // console.log("🚀 ~ PostCard ~ FeaturedImage:", FeaturedImage, $id, title);
  // const $id = data.post.$id;
  const imageUrl = FeaturedImage
    ? configServices.getFilePreview(FeaturedImage)
    : "placeholder-image-url"; // Provide a placeholder URL if no image

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-500 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {FeaturedImage ? (
            <img src={imageUrl} alt={title} className="rounded-xl" />
          ) : (
            <div className="bg-gray-300 rounded-xl w-full h-48 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
