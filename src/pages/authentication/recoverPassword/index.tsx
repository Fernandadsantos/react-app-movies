import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import png from '../../../assets/senha.png'
import './recoverPassword.scss';

const RecoverPassword = () => {
    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }

    return (
        <section className="formSection">
            <h1 className="title">Redefinir senha</h1>
            <div className="formLogin">
                <img src={png} alt="" className="icon" />
                <p className="inform">informe o
                    email usado no cadastro e lhe enviaremos um
                    link com as instruções para redefinir sua senha. </p>
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="inputEmail">
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
                                    placeholder="Email"
                                />
                            }
                        />
                    </div>
                    <button type="submit" className="btnFinish">
                        concluir
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