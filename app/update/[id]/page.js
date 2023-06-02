"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UpdatePost() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const user = session?.user.id;
  const url = "http://127.0.0.1:8000";
  const aa = "airpods.jpg";
  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/posts/${id}`,
        {
          cache: "no-store",
        }
      );
      setPost(data);
      setTitle(data.title);
      setImage(data.image);
      setContent(data.content);
    };
    getPost();
  }, [id]);

  const loadImage = (e) => {
    const newImage = e.target.files[0];
    console.log(newImage);
    setImage(newImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data =  {
    //   title,
    //   content,
    //   image,
    //   user,
    // }
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("user", user);

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/posts/update/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("post_id", id);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/posts/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center my-3">Edit Post</h2>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <div>
              <img src={url + image} alt="" width="150" />
            </div>

            <Form.Group className="mt-3" controlId="oldImage">
              <Form.Label>Old Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mt-3" controlId="image">
              <Form.Label>New Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter image"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            <input type="hidden" value={user} />
            <div className="d-flex justify-content-between my-3">
              <Button type="submit" variant="dark">
                Update
              </Button>
              <Link href={`/posts/${post.id}`}>
                <Button variant="outline-success">Back</Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
