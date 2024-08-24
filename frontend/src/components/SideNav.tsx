import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries/getUsers";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

function SideNav() {
    const {data, error, loading} = useQuery(GET_USERS, {});
    const [showAllUsers, setShowAllUsers] = useState(false);
    const displayedUsers = showAllUsers ? data?.getUsers : data?.getUsers.slice(0, 3);
    const location = useLocation();
    return (
        <div
          id="SideNavMain"
          className={[
            useLocation().pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]",
            "fixed z-20 bg-white pt-[70px] h-full lg:pl-10 lg:border-r-0 border-r  overflow-auto",
          ].join(" ")}
        >
          <div className="lg:w-full w-[55px] mx-auto">
            <Link to="/">
              <MenuItem
                iconString="For You"
                colorString="#F02C56"
                sizeString="30"
              />
            </Link>
            <MenuItem
              iconString="Following"
              colorString="#000000"
              sizeString="27"
            />
            <MenuItem
              iconString="Live"
              colorString="#000000"
              sizeString="27"
            />
          </div>
        </div>
      )
}

export default SideNav;