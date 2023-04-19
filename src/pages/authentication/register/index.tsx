import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import './register.scss';
import { auth } from "../../../api/firebase";
import { updateProfile, createUserWithEmailAndPassword, User } from "firebase/auth";
import { translateErrorMessages } from '../../../utils/format'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import PopupAlert from "../../../components/popupAlert";

const schema = yup.object({
    name: yup.string()
        .matches(/^[A-Za-z ]*$/, 'Por favor informe um nome válido.')
        .max(40)
        .required('Por favor informe um nome.'),
    email: yup.string()
        .email('Por favor informe um e-mail válido.')
        .required('Por favor informe um e-mail.'),
    password: yup.string()
        .min(6, 'Crie uma senha com mínimo de 6 caracteres.')
        .max(12, 'A senha deve conter no máximo 12 caracteres.')
        .required('A senha deve conter entre 6 e 12 caracteres.')
}).required();
type FormData = yup.InferType<typeof schema>;

interface FirebaseAuthError {
    code: string;
    message: string;
}


const RegisterUser = () => { 
    const navigate = useNavigate();
    const [alert, setAlert] = React.useState({
        type: '',
        text: '',
        show: false
    });
    const { control, handleSubmit: onSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const handleSubmit = async (data: FormData) => {
        try {
            const { name, email, password } = data;
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            if (user) {
                await updateProfile(auth.currentUser as User, {
                    ...auth.currentUser,
                    displayName: name
                });

                navigate("/");

                return
            }
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
        <section className="formSection">
            <PopupAlert {...alert} onClosePress={onCloseAlert}/>
            <div className="formRegister">
                <h1 className="titleRegister">Cadastro</h1>
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="inputs">
                        <div className="controller">
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, name, onChange } }) =>
                                    <DefaultInput
                                        type={"text"}
                                        inputName={name}
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Nome"
                                    />
                                }
                            />
                            <p>{errors.name?.message}</p>
                        </div>
                        <div className="controller">
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
                        <div className="controller">
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
                            <p>{errors.password?.message}</p>
                        </div>
                    </div>
                    <button type="submit" className="btnRegister"  >
                        Cadastrar
                    </button>
                    <div className="loginRef">
                        <p >Já tem uma conta? </p>
                        <a href="/login">  Acesse aqui</a>
                    </div>
                </form>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </section>
    )
}

export default RegisterUser;


