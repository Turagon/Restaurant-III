function emailVerify(email) {
  const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  return emailRule.test(email) ? true : false
}

function passwordVerify(password) {
  const number = '0123456789'
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const checkBase = (number + lowerCase + upperCase).split("")
  const checkResult = password.split("").filter(item => checkBase.includes(item))
  if (checkResult.length === password.length && password.length >= 6 && password.length <= 12) {
    return true
  } else {
    return false
  }
}

module.exports = { emailVerify, passwordVerify }