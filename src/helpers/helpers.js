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

const handleBoxCreation = (size) => {
  switch (size) {
    case 'small':
      return { 
        size: 'small',
        price: 5,
        maxQuantity: 2,
        products: []
      }
    default:
    case 'medium':
      return { 
        size: 'medium',
        price: 10,
        maxQuantity: 5,
        products: []
      }
    case 'large':
      return { 
        size: 'large',
        price: 15,
        maxQuantity: 10,
        products: []
      }
  }
}

const getTotalQuantityOfProducts = (box) => {
  return box.products.reduce( (acc, cval) => {
    const sum = acc+cval.quantity;
    return Math.round(sum*100)/100;
  }, 0)
}

// Export
export default {
  handleError,
  handleBoxCreation,
  getTotalQuantityOfProducts
}