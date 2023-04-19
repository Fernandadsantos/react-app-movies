import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import './recoverPassword.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    email: yup.string()
        .email('Por favor informe um e-mail válido.')
        .required('Por favor informe o e-mail usado no cadastro da conta que deseja recuperar.'), 
}).required();
type FormData = yup.InferType<typeof schema>;

const RecoverPassword = () => {
    const { control, handleSubmit: onSubmit, formState:{errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const handleSubmit = () => { }

    React.useEffect(() => {

    }, [])
    
    return (
        <section className="formSection">
            <div className="formLoginPass">
                <h1 className="titlePass">Redefinir senha</h1>
                <p className="inform">Informe o
                    email usado no cadastro e lhe enviaremos um
                    link com instruções para redefinir sua senha. </p>
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="inputEmail">
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, name, onChange } }) =>
                                <DefaultInput
                                    type={"email"}
                                    inputName={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Email"
                                />
                            }
                        />
                        <p>{errors.email?.message}</p>
                    </div>
                    <button type="submit" className="btnPassword">
                        Enviar
                    </button>
                </form>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </section>
    )

}

export default RecoverPassword;