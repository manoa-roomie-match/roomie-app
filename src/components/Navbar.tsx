'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import {
  BoxArrowRight,
  Lock,
  PersonFill,
  PersonPlusFill,
} from 'react-bootstrap-icons';

import styles from './navbar.module.css';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  return (
    <Navbar expand="lg" className="uh-navbar">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center px-3"
      >
        <Navbar.Brand className="d-flex align-items-center gap-1 px-0">
          <Image
            src="/uh-manoa-logo.ico"
            alt="UH Manoa Logo"
            width={40}
            height={40}
          />
          <span className={styles.navBrand}>
            Mānoa
            <br />
            <span className={styles.navBrandLine}>Roomie Match</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link href="/" active={pathName === '/'}>
              Home
            </Nav.Link>
            {!currentUser
              ? [
                <Nav.Link href="/contact" active={pathName === '/contact'}>
                  Contact Us
                </Nav.Link>,
                <Nav.Link
                  href="/how-it-works"
                  active={pathName === '/how-it-works'}
                >
                  How It Works
                </Nav.Link>,
              ]
              : ''}

            {currentUser && role === 'USER'
              ? [
                <Nav.Link
                  id="view-roommate-nav"
                  href="/view-roommates"
                  key="view-roommates"
                  active={pathName === '/view-roommates'}
                >
                  View Roommate Listings
                </Nav.Link>,
                <Nav.Link
                  id="my-messages-nav"
                  href="/messages"
                  key="messages"
                  active={pathName === '/messages'}
                >
                  My Messages
                </Nav.Link>,
                <Nav.Link
                  id="edit-profile-nav"
                  href="/edit-profile"
                  key="edit-profile"
                  active={pathName === '/edit-profile'}
                >
                  Edit Profile
                </Nav.Link>,
              ]
              : ''}

            {/* Admin log in has admin dashboard */}
            {currentUser && role === 'ADMIN'
              ? [
                <Nav.Link
                  id="admin-dashboard-nav"
                  href="/admin/dashboard"
                  key="admin-dashboard"
                  active={pathName === '/admin/dashboard'}
                >
                  Admin Dashboard
                </Nav.Link>,
                <Nav.Link
                  id="manage-users-nav"
                  href="/admin/manage-users"
                  key="manage-users"
                  active={pathName === '/admin/manage-users'}
                >
                  Manage Users
                </Nav.Link>,
              ]
              : ''}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser} align="end">
                <NavDropdown.Item
                  id="login-dropdown-sign-out"
                  href="/api/auth/signout"
                >
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="login-dropdown-change-password"
                  href="/auth/change-password"
                >
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login" align="end">
                <NavDropdown.Item
                  id="login-dropdown-sign-in"
                  href="/auth/signin"
                >
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="login-dropdown-sign-up"
                  href="/auth/signup"
                >
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;