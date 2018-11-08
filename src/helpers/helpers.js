const handleError = (error) => {
  let isErrorEmail = false;
  let isErrorPassword = false;
  let isAlreadyUser = false;
  switch (error.response.data.error) {
    case 'user-not-found':
      isErrorEmail = true;
      break;
    case 'wrong-password':
      isErrorPassword = true;
      break;
    case 'email-not-unique':
      isAlreadyUser= true;
      break;
    default:
      console.log(error);
  }
  return {isErrorEmail, isErrorPassword, isAlreadyUser};
}

export default {
  handleError
}