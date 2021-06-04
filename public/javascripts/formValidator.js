const form = document.querySelector('form.new')
const submitButton = document.querySelector('button.submit')

if (submitButton) {
  submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
    form.classList.add('was-validated')
  })
}