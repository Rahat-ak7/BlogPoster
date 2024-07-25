import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Input, Button } from "../index";
import configServices from "../../AppWrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "../../components/Select";

function Postform({ post }) {
  // console.log("🚀 ~ Postform ~ post:", post);
  const { register, setValue, getValues, watch, control, handleSubmit } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log("🚀 ~ Postform ~ userData:", userData);

  // useEffect(() => {
  //   if (!userData) {
  //     console.error("User data not found");
  //   }
  // }, [userData]);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "-")
        .replace(/\s+/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      if (post && post.length > 0) {
        // Check if post is defined and not empty
        const currentPost = post[0]; // Assuming post is an array, accessing the first item
        // console.log("🚀 ~ submit ~ post:", currentPost);
        // console.log("🚀 ~ submit ~ post.$id:", currentPost.$id); // Log post.$id
        const file = data.image[0]
          ? await configServices.UploadFile(data.image[0])
          : null;
        if (file) {
          await configServices.DeleteFile(currentPost.FeaturedImage);
        }
        const dbPost = await configServices.updatePost(currentPost.$id, {
          ...data,
          FeaturedImage: file ? file.$id : currentPost.FeaturedImage,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await configServices.UploadFile(data.image[0]);
        // console.log("🚀 ~ submit ~ file:", file);
        if (file) {
          const fileId = file.$id;
          data.FeaturedImage = fileId;
          const sanitizedSlug = slugTransform(data.title);
          const dpPost = await configServices.createPost({
            ...data,
            slug: sanitizedSlug,
            userId: userData.$id,
          });
          // console.log("🚀 ~ submit ~ dpPost:", dpPost);
          if (dpPost) {
            navigate(`/post/${dpPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      // setErr("An error occurred while submitting the post");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          placeholder="title.."
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug:"
          placeholder="Slug.."
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />

        <label className="text-[20px] font-bold" htmlFor="content">
          Message:
        </label>
        <div>
          <textarea
            name="content"
            rows="4"
            cols="50"
            placeholder="Post Description"
            {...register("content", {
              required: true,
            })}
          />
        </div>

        {/* <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        /> */}
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="FeatureImage:"
          type="file"
          className="mb-4"
          accept="image/png,image/jpg,image/jpeg,image/gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && post.FeaturedImage && (
          <div className="w-full mb-4">
            <img
              src={configServices.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColour={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default Postform;
