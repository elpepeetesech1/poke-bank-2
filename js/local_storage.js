// we set the default values
if (!localStorage.getItem(USER_KEY)) {
  localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_VALUES));
}
