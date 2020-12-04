(() => {
  const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('retype password');

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const smallTag = formControl.querySelector('small');
  smallTag.innerText = message;
}

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const smallTag = formControl.querySelector('small');
  smallTag.innerText = '';
}

const checkEmail = (input) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
   showError(input, 'Email is not valid');
  }
  
  return regex.test(String(input).toLowerCase());
}

const checkRequired = (inputArr) => {
  inputArr.forEach((input)=>{
    if (input.value.trim() === ''){
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

const checkInputLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max){
    showError(input, `${getFieldName(input)} must be at less than ${max} characters`)
  } else {
    showSuccess(input);
  }
};

const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value){
    showError(input2, 'Passwords do not match');
  }
}

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();

  checkRequired([username, password, email, password2]);
  checkInputLength(username, 3, 15);
  checkInputLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
})

  
})();
