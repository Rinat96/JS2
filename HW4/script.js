

let replaceText = function(text) {
    const regExp = new RegExp("( '.)|(.' )|(^'.)|(.'$)", 'g');
    const newtext = text.replace(regExp, u => 
      u.replace("'", '"')
    );
    return newtext;
  }

const text = "I said, 'No, I don't.'"

let validationForm = function(){
  let countError = 0;
  const form = document.querySelector('.form-box');
  const name = document.querySelector('.form-name');
  const regExpName = new RegExp("^[a-zа-яё]+$", "i");
  const phone = document.querySelector('.form-phone');
  const regExpPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
  const email = document.querySelector('.form-email');
  const regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@mail\.ru$/;
  form.addEventListener('submit', function () {
    countError = 0;
    if (!regExpName.test(name.value)) {
      name.style.borderColor = "red";  
      countError++;    
    };

    if (!regExpPhone.test(phone.value)) {
      phone.style.borderColor = "red"; 
      countError++;
    };

    if (!regExpEmail.test(email.value)) {
      email.style.borderColor = "red"; 
      countError++; 
    };

    if (!countError==0) alert("Укажите верные значения в полях формы!");

  })

  form.addEventListener('reset', function () {
    name.style.borderColor = "black";
    phone.style.borderColor = "black";
    email.style.borderColor = "black";          
  });

}

const init = () => {
  document.querySelector('.text').innerHTML = `${text}`;
  
  const searchButton = document.querySelector('.search-button')
  // const searchInput = document.querySelector('.goods-search')

  searchButton.addEventListener('click', () => {
    document.querySelector('.newtext').innerHTML = `${replaceText(text)}`;
    
  });

  validationForm();

};

window.onload = init;
