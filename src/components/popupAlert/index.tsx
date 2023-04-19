import Alert from "react-popup-alert";

interface PopUpProps {
    text: string;
    type: string;
    show: boolean;
    onClosePress: Function;
}

function PopupAlert({ text, type, show, onClosePress }: PopUpProps) {

    return (
        <div>
            <Alert
                header={'Header'}
                btnText={'Close'}
                text={text}
                type={type}
                show={show}
                onClosePress={onClosePress}
                pressCloseOnOutsideClick={true}
                showBorderBottom={false}
                alertStyles={{
                    backgroundColor: 'rgba(98, 102, 101, 0.71)',
                    borderRadius: '5px',
                    padding: '50px',
                    textAlign: 'center',
                    position: 'static',  
                }}
                headerStyles={{}}
                textStyles={{}}
                buttonStyles={{}}
            />
        </div>
    )

}

export default PopupAlert;