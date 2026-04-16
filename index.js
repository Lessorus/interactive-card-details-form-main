const form = document.querySelector('.card-details-form')

const cardNumberInput = document.querySelector('#card-number')
const cardHolderInput = document.querySelector('#cardholder-name')
const cardExpMonthInput = document.querySelector('#exp-month')
const cardExpYearInput = document.querySelector('#exp-year')
const cardCVCInput = document.querySelector('#cvc')

const InteractiveCardNumber = document.querySelector('#Interactive-Card-Number')
const InteractiveCardHolder = document.querySelector('#Interactive-Card-Name')
const InteractiveCardExpDate = document.querySelector('#Interactive-Card-Exp-Date')
const InteractiveCardCVC = document.querySelector('#Interactive-Card-CVC')

// CVC и ИМЯ
cardHolderInput.addEventListener('input', (e) => {
const value = e.target.value

InteractiveCardHolder.textContent = value || 'Jane Appleseed'
})

cardCVCInput.addEventListener('input', (e) => {
    const value = e.target.value

    InteractiveCardCVC.textContent = value || '000'
})

// за номер карты сначало исправление ошибок потом сам ввод
formattedCardNumber = (value) => {
        return value
        .slice(0, 19)
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    }

    cardNumberInput.addEventListener('input', (e) => {
    const formatted = formattedCardNumber(e.target.value)

    e.target.value = formatted
    InteractiveCardNumber.textContent = formatted || '0000 0000 0000 0000'
});


// за дату
const updateDate = () => {
    
    cardExpYearInput.value = cardExpYearInput.value.replace(/\D/g, '')
    cardExpMonthInput.value = cardExpMonthInput.value.replace(/\D/g, '')

    let inputM = cardExpMonthInput
    
    if (inputM.value.length === 1 && inputM.value > 1) inputM.value = `0${inputM.value}`
    if (inputM.value === '00') inputM.value = '01'
    if (inputM.value > 12) inputM.value = '12'

    const m = cardExpMonthInput.value || '00'
    const y = cardExpYearInput.value || '00'

    InteractiveCardExpDate.textContent = `${m}/${y}`;
};

cardExpMonthInput.addEventListener('input', updateDate);
cardExpYearInput.addEventListener('input', updateDate);

function showError(input, errorElement, message) {
errorElement.textContent = message
input.classList.add('input-error')
input.setAttribute('aria-invalid', 'true')
input.setAttribute('aria-describedby', errorElement.id)
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '')
    document.querySelectorAll('.card-details-form input').forEach(input => {
        input.classList.remove('input-error')
        input.removeAttribute('aria-invalid')
        input.removeAttribute('aria-describedby')
    })
}

form.addEventListener('submit', (e) => {
e.preventDefault();
clearErrors();

let isValid = true

// cardNumberInput 
const errorCardNumberInput = document.getElementById('card-number-error')
const digitsCardNumber = cardNumberInput.value.replace(/\s/g, '')

if (digitsCardNumber.length < 16) {
    showError(cardNumberInput, errorCardNumberInput, 'Wrong format') 
    isValid = false
}

// cardExpYearInput
// cardCVCInput 
const errorExpDateInput = document.getElementById('exp-date-error')

const isMonthInvalid = cardExpMonthInput.value.length < 2
const isYearInvalid = cardExpYearInput.value.length < 2

if (isMonthInvalid || isYearInvalid) {
    errorExpDateInput.textContent = 'Invalid date'


if (isMonthInvalid) {
    cardExpMonthInput.classList.add('input-error')
  }

if (isYearInvalid) {
    cardExpYearInput.classList.add('input-error')
  }
isValid = false
}

const errorCVCInput = document.getElementById('cvc-error')
const digitsCVC = cardCVCInput.value.replace(/\D/g, '')

if (digitsCVC.length < 3) {
  showError(cardCVCInput, errorCVCInput, 'Wrong CVC')
  isValid = false
}

const errorNameInput = document.getElementById('cardholder-name-error')
if (!cardHolderInput.value.trim()) {
  showError(cardHolderInput, errorNameInput, "Can't be blank")
}

if (isValid) {
  form.style.display = 'none'
  document.querySelector('.completed-state').style.display = 'block'

  <form class="card-details-form is-hidden"></form>
<fieldset class="completed-state"></fieldset>
}
})


