import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import user from '../../../assets/user.png';
import email from '../../../assets/o-email.png';
import Password  from "../../../assets/trancar.png";
import './register.scss';



const RegisterUser = () => {
    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }

    return (
        <section className="formSection">
            <div className="formRegister">
                <h1 className="titleRegister">Cadastro</h1>
                <form onSubmit={onSubmit(handleSubmit)} className="formContent">
                    <div className="inputs">
                        <div className="userName">
                            <img src={user} alt="usuario" className="icon"/>
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
                        </div>
                        <div className="userEmail">
                            <img src={email} alt="" className="icon"/>
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
                        <div className="userPassword">
                            <img src={Password} alt="" className="icon"/>
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
                    </div>
                    <button type="submit" className="btnRegister">
                        Cadastrar
                    </button>
                </form>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </section>
    )
}

export default RegisterUser;


