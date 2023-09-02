
function translateErrorMessages(errorCode: string): string {
    console.log(errorCode);
    switch (errorCode) {
      case 'auth/expired-action-code':
        return 'O código da ação ou o link expirou.';
      case 'auth/invalid-action-code':
        return 'O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.';
      case 'auth/user-disabled':
        return 'O usuário correspondente à credencial fornecida foi desativado.';
      case 'auth/user-not-found':
        return 'O usuário não correponde à nenhuma credencial.';
      case 'auth/weak-password':
        return 'A senha é muito fraca.';
      case 'auth/email-already-in-use':
        return 'Já existe uma conta com o endereço de email fornecido.'; 
      case 'auth/invalid-email':
        return 'O endereço de e-mail não é válido.';
      case 'auth/operation-not-allowed':
        return 'O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.';
      case 'auth/account-exists-with-different-credential':
        return 'E-mail já associado a outra conta.';
      case 'auth/credential-already-in-use':
        return 'Já existe uma conta para esta credencial.';
      case 'auth/invalid-credential':
        return 'A credencial expirou ou está mal formada.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/invalid-custom-token':
        return 'O token fornecido não é válido.';
      case 'auth/captcha-check-failed':
        return 'O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.';
      case 'auth/invalid-email-verified':
        return 'O e-mail é inválido.';
      case 'auth/invalid-password':
        return 'A senha é inválida, precisa ter pelo menos 6 caracteres.';
      case 'auth/email-already-exists':
        return 'O e-mail que você tentou cadastrar já está em uso.';
      default:
        return 'Ocorreu um erro, por favor tente novamente';
    }
  }


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


export {maxText, checkIfSinopse, errorMessages, translateErrorMessages}