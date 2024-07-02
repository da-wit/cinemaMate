export function disAbleHoverEffect(element) {
  element.classList.add("disable-hover");
}

export function enableHoverEffect(element) {
  element.classList.remove("disable-hover");
}

export function clearInputValue({
  clearUserName,
  clearCinemaName,
  clearEmail,
  clearPassword,
  clearConfirmPassword,
  clearCinemaDescription,
}) {
  clearUserName.value = "";
  clearCinemaName.value = "";
  clearEmail.value = "";
  clearPassword.value = "";
  clearConfirmPassword.value = "";
  clearCinemaDescription.value = "";
}

module.exprots = { clearInputValue, disAbleHoverEffect, enableHoverEffect };
