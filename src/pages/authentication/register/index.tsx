import React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import './register.scss';


const RegisterUser = () => {
    const auth = getAuth();
    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = (data: FieldValues) => {
    createUserWithEmailAndPassword(auth, email, password)
        
    }




    React.useEffect(() => {

    }, [])

    return (
        <section className="formSection">
            <div className="formRegister">
                <h1 className="titleRegister">Cadastro</h1>
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="inputs">
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, name, onChange } }) =>
                                    <DefaultInput
                                        type={"name"}
                                        inputName={name}
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Nome"
                                    />
                                }
                            />
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
                    </div>
                    <button type="submit" className="btnRegister">
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


