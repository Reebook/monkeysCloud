import React from "react";
import { useFormik } from "formik";
import { FaTimes, FaUsers } from "react-icons/fa";
import * as Yup from "yup";
import "./style.scss";
function MenuAdminUserProject() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="admin-user-container">
      <div>
        <FaTimes className="icon-close" />
        <h2 className="title">Manage Team</h2>
        <hr />
      </div>

      <div>
        <h5 className="title">Site Owner</h5>
        <hr />
        <div className="owner">
          <div className="oval">
            <span className="avatar"></span>
          </div>

          <div className="user">
            <p>jorge@colibricode.com</p>
          </div>
        </div>
      </div>
      <div>
        <h5 className="title">Teams Members</h5>
        <form className="form-team">
          <input type="email" placeholder="their email address" />
          <label for="team-members"></label>
          <select
            id="team-members"
            name="team-members"
            className="select-member"
          >
            <option selected>Team Members</option>
            <option value="">Member 1</option>
            <option value="">Member 2</option>
            <option value="">Member 3</option>
          </select>

          <button className="submit" type="submit">
            Add to Team
          </button>
        </form>
      </div>

      <div>
        <h5 className="title">Supporting Organizations</h5>
        <p className="description-support">
          Adding Supporting Organization to your site will give their company
          access to help build,launch or maintain your site
        </p>
        <hr />
        <div className="organization-container">
          <FaUsers className="icon-organizations" />
          <p className="organization-name">ColibriCode</p>
        </div>
        <form className="form-organization">
          <input
            type="text"
            className="organization"
            placeholder="organization name"
            list="organizations"
          />
          <datalist id="organizations">
            <option value="test 1"></option>
            <option value="example 3"></option>
            <option value="build 1"></option>
          </datalist>
          <button className="search" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default MenuAdminUserProject;