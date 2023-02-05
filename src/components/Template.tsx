import { ReactNode } from "react";
import { NavLink, Outlet, To } from "react-router-dom";

interface HeaderLinkProps {
  to: To;
  children: ReactNode;
}

const HeaderLink = ({ to, children }: HeaderLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "underline hover:bg-pink-600" + (isActive ? " bg-lime-600" : "")
    }
  >
    {children}
  </NavLink>
);

interface TemplateProps {
  children?: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <>
      <header className="flex bg-black text-white p-2">
        <h1 className="mr-1">
          <HeaderLink to="/">Crypto Tools</HeaderLink>:
        </h1>
        <ul className="grow flex gap-x-1">
          <li>
            <HeaderLink to="/accounting">Accounting</HeaderLink>
          </li>
        </ul>
        <div>
          (<HeaderLink to="/storage">Storage</HeaderLink>)
        </div>
      </header>
      <main>{children ? children : <Outlet />}</main>
    </>
  );
};

export default Template;
