import Link from 'next/link';
import AppComponent from "../pages/_app.js";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Products', href: '/products/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link className="nav-link" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand ml-5" href="/" style={{marginLeft: 15 + 'px'}}>
          MicroService Demo
      </Link>
        <Link className="navbar-brand ml-5" href="https://www.linkedin.com/in/willnguyendotdev/" style={{marginLeft: 15 + 'px'}}>
            [Will Nguyen Linkedin]
        </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header
