import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import Footer from "../../../components/footer";
import png from '../../../assets/forma.png';
import './register.scss';



const RegisterUser = () => {
    const { control, handleSubmit: onSubmit, setValue } = useForm();
    const handleSubmit = () => { }

    return (
        <section className="formSection">
            <h1 className="title">Cadastrar</h1>
            <div className="formLogin"> 
            <img src={png} alt="usuario" className="userIcon" />
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

export default RegisterUser;


