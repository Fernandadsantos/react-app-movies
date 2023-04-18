import React from "react";
import Alert from "react-popup-alert";
import { translateErrorMessages } from "../../utils/format";



function PopupAlert(errorMessage: string) {

    const [alert, setAlert] = React.useState({
        type: 'error',
        text: '',
        show: false
    })

    function onCloseAlert() {
        setAlert({
            type: '',
            text: '',
            show: false,
        })
    }
    function onShowAlert(type: string, message: string) {
        setAlert({
            type: type,
            text: message,
            show: true
        })
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                <button onClick={() => {onShowAlert('erro', errorMessage)}}> 
                </button>
            </div>
            <Alert
                header={'Header'}
                btnText={'Close'}
                text={alert.text}
                type={alert.type}
                show={alert.show}
                onClosePress={onCloseAlert}
                pressCloseOnOutsideClick={true}
                showBorderBottom={true}
                alertStyles={{}}
                headerStyles={{}}
                textStyles={{}}
                buttonStyles={{}}
            />
        </div>
    )

}

export default PopupAlert;