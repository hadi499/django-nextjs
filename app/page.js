"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  // const res = await fetch(`http://127.0.0.1:8000/api/posts/`, {
  //   cache: "no-store",
  // });
  const { data: session } = useSession();
  console.log({ session });
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/posts/`, {
        cache: "no-store",
      });
      console.log(res.data);
      setPosts(res.data);
    };
    getPosts();
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            {posts.map((post) => (
              <div key={post.id} className="home">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-decoration-none text-dark "
                >
                  <h3 className="text-center mt-3">{post.title}</h3>
                  <p className="text-center">
                    <small>user : {post.user}</small>
                  </p>
                </Link>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
