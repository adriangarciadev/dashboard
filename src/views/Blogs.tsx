import { Outlet } from "react-router";

const Blogs = () => {
    return (
      <div>
        <h1>Blog Articles</h1>
        <Outlet />
    </div>
  );
};
  
  export default Blogs;
  