const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

formEl.addEventListener('input', handleFormInput);

function handleFormInput(e) {
  const { name, value } = e.target;
  formData[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

/* Коли відкривається сторінка:
- ми перевіряємо localStorage
- якщо щось знайдено — перетворюємо з рядка на об’єкт
- підставляємо ці значення в форму */

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';
  inputEl.value = formData.email;
  textareaEl.value = formData.message;
}

/* Коли користувач натискає "Відправити":
Перевірити: чи заповнені обидва поля?

Якщо ні → показати повідомлення: «Fill please all fields».

Якщо так:
показати в console.log актуальні дані
очистити форму, об'єкт formData, і localStorage */

formEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очистити форму, об'єкт і сховище
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
}
