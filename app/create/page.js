"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function NewPost() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const { push } = useRouter();
  const user = session?.user.id;

  const loadImage = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setFile(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", file);
    formData.append("user", user);

    try {
      await axios.post("http://127.0.0.1:8000/api/posts/create/", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();

  //   formData.append("image", file);

  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const { data } = await axios.post(
  //       "http://127.0.0.1:8000/api/posts/upload/",
  //       formData,
  //       config
  //     );

  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     setUploading(false);
  //   }
  // };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center my-3">Add Post</h2>
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
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="file"
                placeholder="Enter image"
                onChange={loadImage}
                className="my-3"
              ></Form.Control>
            </Form.Group>
            <input type="hidden" value={user} />
            <Button type="submit" variant="dark" className="my-3">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <h1>Buat Posting Baru</h1>
    //   <form
    //     onSubmit={handleSubmit}
    //     className="form-container"
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       width: "300px",
    //       gap: "10px",
    //     }}
    //   >
    //     <input type="hidden" value={user} />
    //     <label htmlFor="title"></label>
    //     Judul:
    //     <input
    //       type="text"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       id="title"
    //       style={{ height: "30px" }}
    //     />
    //     <label htmlFor="content">Content</label>
    //     <textarea
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //       id="content"
    //       rows="9"
    //     />
    //     <button
    //       type="submit"
    //       className="submit-button"
    //       style={{ height: "30px" }}
    //     >
    //       Buat Post
    //     </button>
    //   </form>
    // </div>
  );
}
