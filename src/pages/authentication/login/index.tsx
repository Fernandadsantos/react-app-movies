import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import "./login.scss";
import png from '../../../assets/user.png';
import Footer from "../../../components/footer";



const Login = () => {

    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }

    React.useEffect(() => {

    }, [])

    return (
        <section className="formSection">
            <h1 className="title">catalogo</h1>
            <div className="formLogin">
                <img src={png} alt="icone de usuario" className="userIcon" />
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="loginInputs">
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
                                    placeholder="Senha"
                                />
                            }
                        />
                        <button type="submit" className="btnFinish">
                            concluir
                        </button>
                        <span className="forgotPassword">
                            <a href="#">Esqueceu a senha?</a>
                        </span>
                    </div>
                </form>
            </div>
            <div className="footerLogin">
                <Footer />

            </div>
        </section>
    )
}

export default Login;