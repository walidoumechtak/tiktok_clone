import { REGISTER_USER } from "../graphql/mutations/Register";
import { useMutation } from "@apollo/client";
import { useUserStore } from "../stores/userStore";
import { GraphQLErrorExtensions } from "graphql";
import { useGeneralStore } from "../stores/generalStore";
import { RegisterUserMutation, RegisterUserMutationVariables } from "../gql/graphql";
import { useState } from "react";
import { BsPass } from "react-icons/bs";
import Input from "./Inupt";


function Register() {
    const [registerUser, {data, error, loading}] = useMutation<RegisterUserMutation,
    RegisterUserMutationVariables>(REGISTER_USER);
    
    const setUser = useUserStore(state => state.setUser);
    const setLoginIsOpen = useGeneralStore(state => state.setLoginIsOpen);
    const [errors, setErrors] = useState<GraphQLErrorExtensions>({});
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: ""
    });

    const handleRegister = async () => {
        setErrors({});
        await registerUser({
            variables: {
                email: registerData.email,
                password: registerData.password,
                fullName: registerData.fullName,
                confirmPassword: registerData.confirmPassword,
            }
        }).catch(err => {
            setErrors(err.graphQLErrors[0].extensions);
        })
        if (data?.register.user) {
            setUser({
                id: data.register.user.id,
                fullName: data.register.user.fullName,
                email: data.register.user.email,
            });
            setLoginIsOpen(false); // we didn't open the login modal yet.
        }
    }
    return (
        <>
            <div className="text-center text-[28px] mb-4 font-bold">Sign up</div>
            <div className="px-6 pb-2">
                <Input 
                    placeHolder="Full Name"
                    InputType="text"
                    max={64}
                    error={errors?.fullName as string}
                    onChange={(e) => setRegisterData({...registerData, fullName: e.target.value})}
                    autoFocus={true}
                />
            </div>
            <div className="px-6 pb-2">
                <Input 
                    placeHolder="Email"
                    InputType="email"
                    max={64}
                    error={errors?.email as string}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    autoFocus={false}
                />
            </div>
            <div className="px-6 pb-2">
                <Input 
                    placeHolder="Password"
                    InputType="password"
                    max={64}
                    error={errors?.password as string}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    autoFocus={false}
                />
            </div>
            <div className="px-6 pb-2">
                <Input 
                    placeHolder="Confirm Password"
                    InputType="password"
                    max={64}
                    error={errors?.confirmPassword as string}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    autoFocus={false}
                />
            </div>
            <div className="mx-6 mt-6">
                <button
                    disabled={
                        !registerData.email ||
                        !registerData.password ||
                        !registerData.fullName ||
                        !registerData.confirmPassword
                    }
                    onClick={handleRegister}
                    className={[
                        "w-full text-[17px] font-semibold text-white py-3 rounded-sm",
                        !registerData.email ||
                        !registerData.password ||
                        !registerData.fullName ||
                        !registerData.confirmPassword
                          ? "bg-gray-200"
                          : "bg-[#F02C56]",
                      ].join(" ")}
                      >
                    Register
                </button>   
            </div>
        </> );
}

export default Register;