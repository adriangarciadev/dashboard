import { Outlet, Link } from "react-router-dom";
import { Container } from "../layout/Container";
import { Navbar } from "../widgets/Navbar";
/*
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/main">main</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};*/

const Layout = () =>{


    return (
        <Container type="fluid" row>
            <Navbar></Navbar>
            <div className="col">
              <Outlet />
            </div>
        </Container>
    )
}

export default Layout;
