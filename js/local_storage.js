// we set the default values
if (!localStorage.getItem(USER_KEY)) {
  localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_VALUES));
}

user = JSON.parse(localStorage.getItem(USER_KEY));

// if we use local storage raw to modify the user we basically fuck up the entire data so
// use this ALWAYS unless you update user afterwarths.
function saveUser()
{
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  user = JSON.parse(localStorage.getItem(USER_KEY));
}
