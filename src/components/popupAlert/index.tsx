import React from "react";
import Alert from "react-popup-alert";

interface PopUpProps {
    title: string;
    text: string;
    type: string;
    show: boolean;
    onClosePress: Function;
}

function PopupAlert({ text, type, show, onClosePress, title }: PopUpProps) {

    return ( 
        <React.Fragment>  
        {show && <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'  
            }}>
                <Alert
                    header={title}
                    btnText={'fechar'}
                    text={text}
                    type={type}
                    show={show}
                    onClosePress={onClosePress}
                    pressCloseOnOutsideClick={true}
                    showBorderBottom={false}
                    alertStyles={{
                        background: '#141414',
                        borderRadius: '15px',
                        padding: '40px',
                        width: '500px',
                        textAlign: 'center',
                        border: 'solid 1px #9e9e9e', 
                    }}
                    headerStyles={{
                        fontSize: '27px',
                        letterSpacing: '1px',
                    }}
                    textStyles={{
                        fontSize: '20px',
                    }}
                    buttonStyles={{
                        fontSize: '20px',
                        backgroundColor: '#141414',
                        borderRadius: '9px',
                        border: 'solid 1px #9e9e',
                        padding: '8px',
                        textDecoration: 'none',
                        letterSpacing: '1px',
                    }}
                />
            </div > 
        }
        </React.Fragment>  
    )

}

export default PopupAlert;