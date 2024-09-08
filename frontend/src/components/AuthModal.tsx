import { useState } from "react";
import { useGeneralStore } from "../stores/generalStore";
import { ImCross } from "react-icons/im";
import Login from "./Login";
import Register from "./Register";

function AuthModal() {
    const [isRegistered, setIsRegistered] = useState(false);
    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen);
    const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);

    return (
        <div
            id="AuthModal"
            className="fixed flex items-center justify-center w-full h-full bg-black bg-opacity-50
                       z-50 top-0 left-0"
            >
            <div
                className="bg-white relative w-full max-w-[480px] h-[70%] p-4 rounded-lg"
            >
                <div
                    className="w-full flex justify-end"
                >
                    <button onClick={() => {setLoginIsOpen(!isLoginOpen)}}>
                        <ImCross size={"17"} color="balck"/>
                    </button>
                </div>
                {isRegistered ? <Login /> : <Register />}
                <div className="absolute left-0 bottom-0 border-t w-full
                    py-5 flex justify-center items-center "
                >
                    <span className="text-[14px] text-gray-600">
                        Don't have an account?
                    </span>
                    <button className="text-[14px] text-[#F02C56] font-semibold pl-1"
                            onClick={() => setIsRegistered(!isRegistered)}
                    >
                        {isRegistered ? " Register" : " Login"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;