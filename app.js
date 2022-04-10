const dynMsg = document.getElementById("dynamic-error-msg");
const dynBtn = document.getElementById("dynamic-back-btn");

const getErrorMsgFromUrl = () => {
  const url = new URL(window.location.href);
  const errorMsg = url.searchParams.get("errorMsg");
  return errorMsg;
};

const getCallbackUrl = () => {
  const url = new URL(window.location.href);
  const callbackUrl = url.searchParams.get("callbackUrl");
  // check if the callback url is a valid url
  if (callbackUrl.match(/^(http|https):\/\/[^ "]+$/)) {
    return callbackUrl;
  }
  // if not, add http:// to the url
  else {
    return "https://" + callbackUrl;
  }
};

const getPreviousUrl = () => {
  // get the previous url from the browser history

  // get the previous url from the browser history
  const previousUrl = window.history;
  return previousUrl;
};

const showErrorMsg = () => {
  const errorMsg = getErrorMsgFromUrl()
    ? getErrorMsgFromUrl()
    : "Default error message";
  dynMsg.innerHTML = errorMsg;

  dynBtn.addEventListener("click", () => {
    if (getCallbackUrl()) {
      window.location.href = getCallbackUrl();
    } else {
      window.history.back();
    }
  });
};

window.onload = showErrorMsg;
