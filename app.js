const dynTitle = document.getElementById("dynamic-error-title");
const dynMsg = document.getElementById("dynamic-error-msg");
const dynBtn = document.getElementById("dynamic-back-btn");

const DEFAULT_ERROR_TITLE = "Something isn't right...";
const DEFAULT_ERROR_MSG = "It's not you, it's us. <br> Please try again later!";

const getErrorMsgFromUrl = () => {
  const url = new URL(window.location.href);
  const errorMsg = url.searchParams.get("errorMsg");
  return errorMsg;
};

const getErrorTitleFromUrl = () => {
  const url = new URL(window.location.href);
  const errorTitle = url.searchParams.get("errorTitle");
  return errorTitle;
};

const getMode = () => {
  const modes = ["dark", "light"];
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  if (mode && modes.includes(mode.trim().toLowerCase())) {
    return mode;
  } else {
    return "invalid";
  }
};

const getCallbackUrl = () => {
  const url = new URL(window.location.href);
  const callbackUrl = url.searchParams.get("callbackUrl");
  if (!callbackUrl) {
    return null;
  }
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
  return previousUrl.length;
};

const showErrorMsg = () => {
  const errorMsg = getErrorMsgFromUrl()
    ? getErrorMsgFromUrl()
    : DEFAULT_ERROR_MSG;
  dynMsg.innerHTML = errorMsg + " / mode: " + getMode();

  const errorTitle = getErrorTitleFromUrl()
    ? getErrorTitleFromUrl()
    : DEFAULT_ERROR_TITLE;

  dynTitle.innerHTML = errorTitle;

  dynBtn.addEventListener("click", () => {
    if (getCallbackUrl()) {
      window.location.href = getCallbackUrl();
    } else {
      // check if there is a previous url
      if (getPreviousUrl() > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }
  });
};

window.onload = showErrorMsg;

// color mode setting
const setColorMode = (mode) => {
  if (mode === "dark") {
    const allLightBgs = document.getElementsByClassName("bg-light");
    const allBlackClrs = document.getElementsByClassName("clr-black");
    for (let i = 0; i < allLightBgs.length; i++) {
      allLightBgs[i].classList.remove("bg-light");
      allLightBgs[i].classList.add("bg-dark");
    }
    for (let i = 0; i < allBlackClrs.length; i++) {
      allBlackClrs[i].classList.remove("clr-black");
      allBlackClrs[i].classList.add("clr-light");
    }
  } else if (mode === "light") {
    const allDarkBgs = document.getElementsByClassName("bg-dark");
    const allLightClrs = document.getElementsByClassName("clr-light");
    for (let i = 0; i < allDarkBgs.length; i++) {
      allDarkBgs[i].classList.remove("bg-dark");
      allDarkBgs[i].classList.add("bg-light");
    }
    for (let i = 0; i < allLightClrs.length; i++) {
      allLightClrs[i].classList.remove("clr-light");
      allLightClrs[i].classList.add("clr-black");
    }
  }
};

setColorMode(getMode());
