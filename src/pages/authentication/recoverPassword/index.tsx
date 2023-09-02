import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { sendPasswordResetEmail} from "firebase/auth";
import { FirebaseAuthError } from "../../../interfaces";
import { auth } from "../../../api/firebase";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import './recoverPassword.scss';
import { useNavigate } from "react-router-dom";
import { translateErrorMessages } from "../../../utils/format";
import PopupAlert from "../../../components/popupAlert";


const schema = yup.object({
    email: yup.string()
    .email('Por favor informe um e-mail válido.')
    .required('Por favor informe o e-mail usado no cadastro da conta que deseja recuperar.'), 
}).required();
type FormData = yup.InferType<typeof schema>;

const RecoverPassword = () => {
    const [alert, setAlert] = React.useState({
        type: '',
        text: '',
        show: false
    });
    const navigate = useNavigate();
    const { control, handleSubmit: onSubmit, formState:{errors}} = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const handleSubmit = async(data: FormData) => {
        try {
            const { email} = data;
            await sendPasswordResetEmail( auth, email)
            navigate("/login");

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
            <PopupAlert {...alert} onClosePress={onCloseAlert} title='Não foi possível entrar'/>
            <div className="formLoginPass">
                <h1 className="titlePass">Redefinir senha</h1>
                <p className="inform">Informe o
                    email usado no cadastro. </p>
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