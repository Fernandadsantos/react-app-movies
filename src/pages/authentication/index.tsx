import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../components/input";
import "./login.scss"; 



const Login = () => {

    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => {}

    React.useEffect(()=>{
       
    },[])

    return (
        <form onSubmit={onSubmit(handleSubmit)} >
            <Controller
                name="Email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, name, onChange } }) =>
                    <DefaultInput
                        type={"email"}
                        inputName={name}
                        value={value}
                        onChange={onChange}
                    />
                }
            />

        </form>
    )
}

export default Login;