"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState([]);
  const url = "http://127.0.0.1:8000";

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
      setPost(data);
    };
    getPost();
  }, [id]);

  const deletePost = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const isUser = session?.user.id === post.user;
  console.log(post);
  console.log(post.user);
  console.log(isUser);
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <img src={url + post.image} alt="" width="300" />

          {!isUser ? (
            ""
          ) : (
            <div className="mt-3">
              <Button
                variant="danger"
                onClick={() => deletePost(post.id)}
                className="me-3"
              >
                {" "}
                delete
              </Button>
              <Link href={`/update/${post.id}`}>
                <Button variant="success">update</Button>
              </Link>
            </div>
          )}
          <div className="my-5">
            <Link href="/" className="btn btn-outline-dark">
              back
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
