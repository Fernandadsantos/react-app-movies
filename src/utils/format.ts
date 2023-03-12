
function errorMessages(code: number){
    switch(code){
        case 1:
            return "Sinopse não disponível"
        default:
            return "" // um erro genérico
    }
}

function maxText(text: string | undefined | null, max: number) {
    if(!checkIfSinopse(text)){
        return errorMessages(1);
     } 
    const textFormatted = text?.slice(0,max)
    return textFormatted;
}

function checkIfSinopse(text: string | undefined | null){
    if(!text){
        return false;
    }
    return true;
}


export {maxText, checkIfSinopse, errorMessages}