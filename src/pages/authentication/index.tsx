import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@material-ui/core";
import "./login";

const Login = () => {

    const {register, control, handleSubmit: onSubmit, watch, formState } = useForm();
    const handleSubmit = (data: any) => {


    }

    return (
        <form onSubmit={onSubmit(handleSubmit)} >
            <Controller 
                name="checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Checkbox {...field} />}
            />
            
        </form>
    )
}

export default Login;