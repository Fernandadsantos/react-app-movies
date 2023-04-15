import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import "./newPassword.scss";
import Footer from "../../../components/footer";

const NewPassword = () => {

    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }

    React.useEffect(() => {

    }, [])

    return (
        <section className="formSection">
            <div className="formLogin">
                <h1 className="title">Definir nova senha</h1>
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
                                    placeholder="Confirmar nova senha"
                                />
                            }
                        /> 
                        <button type="submit" className="btnFinish">
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