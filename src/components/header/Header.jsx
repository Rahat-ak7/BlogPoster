import React from "react";
import { Container, LogOutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authServices from "../../AppWrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navitems = [
    { name: "Home", path: "/", active: true },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "SignUp", path: "/signup", active: !authStatus },
    { name: "All Posts", path: "/all-posts", active: authStatus },
    { name: "Add Post", path: "/add-post", active: authStatus },
  ];

  return (
    <>
      <header className="py-3 shadow bg-slate-600">
        <Container>
          <nav className="flex">
            <div>
              <Link to="/">
                <Logo Width="100px" />
              </Link>
            </div>
            <ul className="flex ml-auto gap-10">
              {navitems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className=" p-2 rounded-[15px] font-bold text-white hover:text-green-400 focus:ring-green-500"
                      onClick={() => navigate(item.path)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogOutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
