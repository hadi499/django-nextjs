"use client";

import { useRef, useState } from "react";
import { redirect } from "next/navigation";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log({ session });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (session) {
    redirect("/");
  }
  // const userName = useRef("");
  // const pass = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      username: username,
      password: password,
      // username: userName.current,
      // password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={4}>
          <h1 className="text-center my-3">Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
