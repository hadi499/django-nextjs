"use client";

import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav>
          <Link href="/">
            <Nav.Link as="li">Home</Nav.Link>
          </Link>
        </Nav>

        <Nav className="me-5">
          {session?.user ? (
            <>
              <Link href="/create">
                <Button variant="primary" className="me-5">
                  Create Post
                </Button>
              </Link>
              <NavDropdown
                title={session?.user.username}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item as="button" onClick={() => signOut()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link as="button" onClick={() => signIn()}>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
