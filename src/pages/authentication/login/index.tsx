import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../api/firebase";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import "./login.scss";
import Footer from "../../../components/footer";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { translateErrorMessages } from "../../../utils/format";
import PopupAlert from "../../../components/popupAlert";
import { FirebaseAuthError } from "../../../interfaces";


const schema = yup.object({
    email: yup.string()
        .email('Por favor informe o e-mail usasdo no cadastro.')
        .required('Por favor informe o e-mail usado no cadastro.'),
    password: yup.string()
        .required('informe a senha usada no cadastro.')
}).required();
type FormData = yup.InferType<typeof schema>;

const Login = () => {
    const [alert, setAlert] = React.useState({
        type: '',
        text: '',
        show: false
    });
    const navigate = useNavigate();
    const { control, handleSubmit: onSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const handleSubmit = async (data: FormData) => {
        try {
            const { email, password } = data;
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
        }
        catch (error: any) { 
            onShowAlert('erro', translateErrorMessages(((error as unknown) as FirebaseAuthError)
            .code as string));
        }
    }
    function onCloseAlert( ) {
        setAlert({
            type: '',
            text: '',
            show: false,
        })
    }
    function onShowAlert(type:string, text: string) {
        setAlert({
            type: type,
            text: text,
            show: true
        })

    }

    return (
        <section className="loginSection">
            <PopupAlert {...alert} onClosePress={onCloseAlert} title='Não foi possível entrar'/>
            <div className="login">
                <h1 className="titleL">Entrar</h1>
                <form onSubmit={onSubmit(handleSubmit)} >
                    <div className="formContent">
                        <div>
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
                            <p className="errorMessage">
                                {errors.email?.message}
                            </p>
                        </div>
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, name, onChange } }) =>
                                    <DefaultInput
                                        type={"password"}
                                        inputName={name}
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Senha"
                                    />
                                }
                            />
                            <p className="errorMessage">
                                {errors.password?.message}
                            </p>
                        </div>

                        <span className="forgotPassword">
                            <a href="/recoverPassword">Esqueci minha senha</a>
                        </span>
                        <button type="submit" className="btn" id="btnSignIn">
                            Entrar
                        </button>
                        <div className="subscribe">
                            <p className="content">Ainda não tem conta?</p>
                            <a href="/signUp" className="linkSubscribe">Cadastre-se</a>
                        </div>
                    </div>
                </form>
                <div className="footerLogin">
                    <Footer />
                </div>
            </div>
        </section>
    )
}

export default Login;