import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import "./newPassword.scss";
import png from '../../../assets/trancar.png';
import Footer from "../../../components/footer";



const NewPassword = () => {

    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }



    return (
        <section className="formSection">
            <h1 className="title">Definir nova senha</h1>
            <div className="formLogin">
                <img src={png} alt="icone" className="iconPadlock" />
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="inputs">
                        <Controller
                            name="Senha"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, name, onChange } }) =>
                                <DefaultInput
                                    type={"Senha"}
                                    inputName={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Nova senha"
                                />
                            }
                        />
                        <Controller
                            name="Senha"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, name, onChange } }) =>
                                <DefaultInput
                                    type={"Senha"}
                                    inputName={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="confirmar nova senha"
                                />
                            }
                        /> 
                        <button type="submit" className="buttonSuccess">
                            concluir
                        </button>
                    </div>
                </form>
            </div>
            <div className="footerLogin">
                <Footer />

            </div>
        </section>
    )
}

export default NewPassword;