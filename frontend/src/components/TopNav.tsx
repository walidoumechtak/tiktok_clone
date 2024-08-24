import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import tikTokLogo from '../assets/images/tiktok-logo.png';
import {
    AiOutlineSearch,
    AiOutlineFileSearch,
    AiOutlineUpload
} from 'react-icons/ai'

import {
    BsThreeDotsVertical,
    BsFillSendFill,
    BsFillPersonFill,
} from 'react-icons/bs';
import {BiMessageDetail} from 'react-icons/bi'
import {GrLogout} from 'react-icons/gr'

import { useGeneralStore } from "../stores/generalStore";
import { useUserStore } from "../stores/userStore";
import { LOGOUT_USER } from "../graphql/mutations/Logout";
import { useMutation } from "@apollo/client";
import { LogoutUserMutation } from "../gql/graphql";

function TopNav() {

    const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)
    const user = useUserStore((state) => state);
    const setUser = useUserStore((state) => state.setUser);
    const [logoutUser, {error, loading, data}] = useMutation<LogoutUserMutation>(LOGOUT_USER);
    const location = useLocation();
    const getUrl = () => {
        return window.location.pathname
    }
    const [showMenu, setShowMenu] = useState(false);
    const handleLogout = async () => {
        try{
            await logoutUser();
            setUser({
                id: undefined,
                fullName: "",
                email: "",
                bio: "",
                image: ""
            })
            setLoginIsOpen(true);
        }catch(err) {
            console.log(err)
        }
    }
    
    return (
        <div id="TopNav" className="bg-white fixed z-30 flex items-center w-full border-b h-[61px]">
            <div className={[ getUrl() === "/" ? "max-w-[1150px]" : "",
                "flex items-center justify-between w-full px-6 mx-auto",
            ].join(" ")}>
                <div className={getUrl() === "/" ? "w-[80%]" : "lg:w-[20%] w-[70%]"}>
                    <Link to="/">
                    <img
                        src={tikTokLogo}
                        width={getUrl() === "/" ? "100" : "50"}
                        height={getUrl() === "/" ? "100" : "50"}
                        alt="logo"
                    />
                    </Link>
                </div>
          <div className="hidden md:flex items-center bg-[#F1F1F1] p-1
                rounded-full max-w-[380px] w-full">
            <input
              type="text"
              className="w-full pl-3 my-2 bg-transparent placeholder-[#838383]
                text-[15px] focus:outline-none"
              placeholder="Search accounts"
            />
            <div className="px-3 py-1 flex items-center border-l border-l-gray-4">
              <AiOutlineSearch size="20" color="#838383" />
            </div>
          </div>
          {/* end of search input */}
          {/* start the upload button and other stuff */}
          <div className="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full">
            {
                location.pathname === "/" ? (
                    <Link to="/upload" className="flex items-center border rounded-sm px-3 py-[6px]
                        hover:bg-gray-100">
                        <AiOutlineUpload size="20" color="#161724"/>
                        <span className="px-2 font-medium text-[15px] text-[#161724]">
                            Upload
                        </span>
                    </Link>
                ) : (
                    <Link to="/" className="flex items-center border rounded-sm px-3 py-[6px]
                        hover:bg-gray-100">
                        <AiOutlineFileSearch size="20" color="#161724"/>
                        <span className="px-2 font-medium text-[15px] text-[#161724]">
                            Feed
                        </span>
                    </Link>
                )}
                {
                    !user.id && (
                        <div className="flex items-center">
                            <button onClick={() => setLoginIsOpen(!isLoginOpen)}
                                className="flex items-center bg-[#F02C56] text-white border
                                rounded-md px-3 py-[6px] min-w-[110px]">
                                <span className="mx-4 font-medium text-[15px]">Login In</span>
                            </button>
                        </div>
                )}
                {/* i think i should check if the user.id === true here.?! */}
                <div className="flex items-center">
                    <BsFillSendFill size={25} color="#161724"/>
                    <BiMessageDetail size={25} color="#161724"/>
                    <div className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className="mt-1">
                            <img 
                                className="rounded-full"
                                width={33}
                                src={!user.image ? "https://picsum.photos/200" : user.image}
                            />
                        </button>
                        {/* drow down menu for profile icon */}
                        <div className="absolute bg-white rounded-lg w-[200px] shadow-xl*:
                            border top-[46px] -right-2">
                            <Link
                                to={`/profile/${user.id}`}
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center px-3 py-3 hover:bg-gray-100"
                            >
                                <BsFillPersonFill size={20} color="#161724"/>
                                <span className="px-3 text-sm font-semibold text-[#161724]">
                                    Profile
                                </span>
                            </Link>
                            {
                                user.id && (
                                    <div
                                        onClick={handleLogout}
                                        className="flex border-t items-center px-4 py-3 text-sm text-red-400 hover:bg-gray-100"
                                    >
                                        <GrLogout size={20} className="text-red-400"/>
                                        <span className="px-3 text-sm font-semibold text-red-400">
                                            Logout
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>
    )
}
export default TopNav;