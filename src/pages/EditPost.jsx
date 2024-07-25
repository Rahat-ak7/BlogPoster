import React, { useEffect, useState } from "react";
import { Container, PostCard, Postform } from "../components";
import configServices from "../AppWrite/configure";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      configServices.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  configServices.getAllPost([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  return post ? (
    <div className=" py-8">
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  ) : (
    <h1>NO Posts</h1>
  );
}

export default EditPost;
