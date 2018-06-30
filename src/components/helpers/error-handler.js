export const UnathorizedError = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const HandleErrors = (response)=> {
  if(response.ok){
    return response;
  } else {
    switch(response.status) {
    case 401:
      UnathorizedError();
      break;
    }
    throw {
      code: response.status,
      message: response.statusText
    };
  }
};

export default HandleErrors;
