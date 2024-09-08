import { useEffect } from "react";

function Input(
    {
        placeHolder,
        InputType,
        max,
        error,
        autoFocus,
        onChange,
        value,
    } : {
        placeHolder: string,
        InputType: string,
        max: number,
        error: string,
        autoFocus: boolean,
        onChange: ( e: React.ChangeEvent<HTMLInputElement>) => void,
        value?: string,
    }) {

    useEffect(() => {
        if (autoFocus) {
            const input = document.getElementById(`input-${placeHolder}`);
            input?.focus();
        }
    }, [autoFocus, placeHolder]);
    return (
        <div>
            <input
                id={`input-${placeHolder}`}
                type={InputType}
                placeholder={placeHolder}
                className="w-full block bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md
                    py-2.5 px-3 focus:outline-none"
                maxLength={max}
                onChange={onChange}
                value={value}
            />
            { error && (<span className="text-red-500 text-[12px] font-semibold ">{error}</span> )}
        </div>
    );
}

export default Input;