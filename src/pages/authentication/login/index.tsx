import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import "./login.scss";
import Footer from "../../../components/footer";



const Login = () => {

    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }

    React.useEffect(() => {

    }, [])

    function signIn() {
        const btnSignIn = document.querySelector("#btnSignIn");
        btnSignIn?.addEventListener('click', () => {

        })
    }

    return (
        <section>
            <div className="loginForm">
                <div className="screen">
                    <h1 className="titleL">Entrar</h1>
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
                    <span className="forgotPassword">
                        <a href="/recuperarSenha">Esqueci minha senha</a>
                    </span>
                    <button type="submit" className="btn" id="btnSignIn" onClick={signIn}>
                        Entrar
                    </button>
                    <div className="subscribe">
                        <p className="content">Ainda não tem conta?</p>
                        <span >
                            <a href="/cadastrar" className="linkSubscribe">Cadastre-se</a>
                        </span>
                    </div>

                </div>
                <div className="footerLogin">
                    <Footer />
                </div>
            </div>
        </section>
    )
}

export default Login;