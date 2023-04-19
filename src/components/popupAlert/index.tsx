import Alert from "react-popup-alert";
import './popupAlert.scss';

interface PopUpProps {
    text: string;
    type: string;
    show: boolean;
    onClosePress: Function;
}

function PopupAlert({ text, type, show, onClosePress }: PopUpProps) {

    return (
        <div style={{ 
            display:'flex',
            justifyContent:'center',
            alignItems: 'center',

            }}>
            <Alert
                header={'Não foi possível realizar o cadastro'}
                btnText={'fechar'}
                text={text}
                type={type}
                show={show}
                onClosePress={onClosePress}
                pressCloseOnOutsideClick={true}
                showBorderBottom={false}
                alertStyles={{
                    background: '#141414',
                    borderRadius: '5px',
                    padding: '40px',  
                    width:'500px',
                    textAlign: 'center',
                }}
                headerStyles={{
                    fontSize: '25px',
                }}
                textStyles={{
                    fontSize: '20px',
                }}
                buttonStyles={{
                    fontSize: '20px',
                    backgroundColor: 'transparent',
                    borderRadius: '3px',
                    border: 'solid 1px', 
                    padding: '8px', 
                    textDecoration: 'none',
                }}
            />
        </div>
    )

}

export default PopupAlert;