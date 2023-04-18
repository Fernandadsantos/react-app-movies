import React from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultInput from "../../../components/input";
import "./newPassword.scss";
import Footer from "../../../components/footer";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    newPassword: yup.string()
        .min(6, 'A senha deve conter no mínimo 6 caracteres.')
        .max(12, 'A senha deve conter no máximo 12 caracteres.')
        .required('Informe sua nova senha.'),
}).required();
type FormData = yup.InferType<typeof schema>;

const NewPassword = () => {
    const { control, handleSubmit: onSubmit, setValue } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
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
                            name="newPassword"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, name, onChange } }) =>
                                <DefaultInput
                                    type={"password"}
                                    inputName={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Nova senha"
                                />
                            }
                        />
                        <Controller
                            name="newPassword"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, name, onChange } }) =>
                                <DefaultInput
                                    type={"password"}
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