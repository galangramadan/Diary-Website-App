////// --- TOC --- /////
// -------------------//
// PAGES DISPLAY
//// date
//// pages popup
// HOME
//// diary mood
//// random quote
// REGISTER, LOGIN, LOGOUT, and POST
//// register
//// login
//// logout
//// post

// PAGES DISPLAY
const navHome = document.getElementById("nav-home");
const navTimeMachine = document.getElementById("nav-time-machine");
const pageHome = document.getElementById("page-home");
const pageTimeMachine = document.getElementById("page-time-machine");

const goHome = () => {
  goResetPages();
  pageHome.style.display = "block";
  navHome.style.borderBottom = "1px solid";
};

const goTimeMachine = () => {
  goResetPages();
  let postsList = document.getElementById("posts-list");
  const userIsLoginPosts = JSON.parse(localStorage.getItem("posts"));
  if (userIsLoginPosts !== null) {
    if (userIsLoginPosts.length != 0) {
      let postsListContent = "";
      for (let i = userIsLoginPosts.length - 1; i >= 0; i--) {
        postsListContent += `
            <div style="border-bottom: 1px dotted grey; padding: 10px 0px;">
            <p style="text-align:right;">
              ${userIsLoginPosts[i].date}
            </p>
            <p>
              <b>${userIsLoginPosts[i].mood}</b>
            </p>
            <p>
              ${userIsLoginPosts[i].text}
            </p>
            </div>
            `;
      }

      postsList.innerHTML = postsListContent;
    } else {
      postsList.innerHTML = `<p style="padding-top: 12px;">You don't have any post yet.</p>`;
    }
  }
  navTimeMachine.style.borderBottom = "1px solid";
  pageTimeMachine.style.display = "block";
};

goResetPages = () => {
  pageHome.style.display = "none";
  pageTimeMachine.style.display = "none";
  navHome.style.borderBottom = "0px";
  navTimeMachine.style.borderBottom = "0px";
};

//// date
const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "Mei",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dates = new Date();
const year = dates.getFullYear();
const indexMonth = dates.getMonth();
const month = monthsList[indexMonth];
const date = dates.getDate();
const indexDay = dates.getDay();
const day = daysList[indexDay];
const valueDate = `${day}, ${date} ${month} ${year}`;
let displayDate = document.getElementById("display-date");
displayDate.textContent = valueDate;
//// date end

//// pages popup
const loginRegisterPopUp = document.getElementById("login-register-popup");
const loginPopUp = document.getElementById("login-popup");
const registerPopUp = document.getElementById("register-popup");
const registerSuccessPopUp = document.getElementById("register-success-popup");

const goPopUpLogin = () => {
  loginRegisterPopUp.style.display = "block";
  goResetPopUp();
  loginPopUp.style.display = "block";
};

const goPopUpRegister = () => {
  goResetPopUp();
  registerPopUp.style.display = "block";
};

const goResetPopUp = () => {
  loginPopUp.style.display = "none";
  registerPopUp.style.display = "none";
  registerSuccessPopUp.style.display = "none";
};

const goClosePopUp = () => {
  loginRegisterPopUp.style.display = "none";
};
//// pages popup end

//// btn login & logout, display name
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
let displayName = document.getElementById("display-name");
const userIsLogin = localStorage.getItem("nickname");
if (userIsLogin != null) {
  btnLogin.style.display = "none";
  btnLogout.style.display = "block";
  displayName.textContent = userIsLogin;
}
//// btn login & logout, display name end

// PAGES DISPLAY END

///// ------------------------------------------------------------------------------------------------------------------////

// HOME

//// diary mood
const emojiFantastic = document.getElementById("emoji-fantastic");
const emojiGreat = document.getElementById("emoji-great");
const emojiGood = document.getElementById("emoji-good");
const emojiFine = document.getElementById("emoji-fine");
const emojiSad = document.getElementById("emoji-sad");
const emojiSoSad = document.getElementById("emoji-so-sad");
let moodText = document.getElementById("post-mood");

const changeEmojiFantastic = () => {
  moodText.value = `Fantastic! 😎`;
  resetChangeEmoji();
  emojiFantastic.style.backgroundColor = "Orange";
};
const changeEmojiGreat = () => {
  moodText.value = `Great! 😊`;
  resetChangeEmoji();
  emojiGreat.style.backgroundColor = "Gold";
};
const changeEmojiGood = () => {
  moodText.value = "Good 🙂";
  resetChangeEmoji();
  emojiGood.style.backgroundColor = "GreenYellow";
};
const changeEmojiFine = () => {
  moodText.value = "Fine 😐";
  resetChangeEmoji();
  emojiFine.style.backgroundColor = "LimeGreen";
};
const changeEmojiSad = () => {
  moodText.value = "Not so good 🙁";
  resetChangeEmoji();
  emojiSad.style.backgroundColor = "DarkTurquoise";
};
const changeEmojiSoSad = () => {
  moodText.value = "Not okay at all 😥";
  resetChangeEmoji();
  emojiSoSad.style.backgroundColor = "Gray";
};

resetChangeEmoji = () => {
  emojiFantastic.style.backgroundColor = "transparent";
  emojiGreat.style.backgroundColor = "transparent";
  emojiGood.style.backgroundColor = "transparent";
  emojiFine.style.backgroundColor = "transparent";
  emojiSad.style.backgroundColor = "transparent";
  emojiSoSad.style.backgroundColor = "transparent";
};
//// diary mood end

//// random quote
const apiUrl = "https://api.quotable.io/quotes/random";

const getQuoteApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const quoteContent = document.getElementById("quote-content");
  const quoteAuthor = document.getElementById("quote-author");

  quoteContent.innerHTML = `<i>"${data[0].content}"</i>`;
  quoteAuthor.textContent = `- ${data[0].author}`;
};

getQuoteApi(apiUrl);
setInterval(() => {
  getQuoteApi(apiUrl);
}, 10000);
//// random quote end
// HOME END

///// --------------------------------------------------------------------------------------------------------

// REGISTER, LOGIN, LOGOUT and POST
//// register
const goRegister = () => {
  let nickname = document.getElementById("user-input-register-nickname").value;
  let username = document.getElementById("user-input-register-username").value;
  let password = document.getElementById("user-input-register-password").value;
  let passwordConfirm = document.getElementById(
    "user-input-register-password-confirm"
  ).value;

  const Checker = () => {
    if (
      username == "" ||
      password == "" ||
      nickname == "" ||
      passwordConfirm == ""
    ) {
      alert("Please fill the form completely!");
    } else if (password !== passwordConfirm) {
      alert(`Passwords do not match`);
    } else {
      let userData = new Array();
      userData = JSON.parse(localStorage.getItem("users"))
        ? JSON.parse(localStorage.getItem("users"))
        : [];
      if (
        userData.some((value) => {
          return value.username == username;
        })
      ) {
        alert("Username is already exist");
      } else {
        userData.push({
          nickname: nickname,
          username: username,
          password: password,
          posts: [],
        });
        localStorage.setItem("users", JSON.stringify(userData));
        goResetPopUp();
        registerSuccessPopUp.style.display = "block";
      }
    }
  };

  Checker();
};
//// register end

//// login
const goLogin = () => {
  let username = document.getElementById("user-input-login-username").value;
  let password = document.getElementById("user-input-login-password").value;

  const Checker = () => {
    if (username.value == "" && password.value == "") {
      alert("Please fill the form!");
    } else {
      let userData = new Array();
      userData = JSON.parse(localStorage.getItem("users"))
        ? JSON.parse(localStorage.getItem("users"))
        : [];
      if (
        userData.some((value) => {
          return value.username == username && value.password == password;
        })
      ) {
        let isLogin = userData.filter((value) => {
          return value.username == username && value.password == password;
        })[0];
        localStorage.setItem("nickname", isLogin.nickname);
        localStorage.setItem("username", isLogin.username);
        localStorage.setItem("posts", JSON.stringify(isLogin.posts));
        localStorage.setItem("password", isLogin.password);
        goClosePopUp();
        displayName.textContent = localStorage.getItem("nickname");
        btnLogout.style.display = "block";
        btnLogin.style.display = "none";
        location.reload();
      } else {
        alert("Incorrect Username or Password!");
      }
    }
  };

  Checker();
};
//// login end

//// logout
const goLogout = () => {
  localStorage.removeItem("nickname");
  localStorage.removeItem("username");
  localStorage.removeItem("posts");
  localStorage.removeItem("password");
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";
  location.reload();
};
//// logout end

//// post
const goPost = () => {
  const userDate = valueDate;
  const userText = document.getElementById("post-text").value;
  const userMood = document.getElementById("post-mood").value;
  const nickname = localStorage.getItem("nickname");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const posts = JSON.parse(localStorage.getItem("posts"));

  let userData = new Array();
  userData = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (
    userData.some((value) => {
      return value.username == username;
    })
  ) {
    const index = userData.map((value) => value.username).indexOf(username);

    if (index != -1) {
      if (userText == "" || userMood == "") {
        alert("please fill all forms!");
      } else {
        userData.splice(index, 1);
        posts.push({
          date: userDate,
          mood: userMood,
          text: userText,
        });
        userData.push({
          nickname: nickname,
          username: username,
          password: password,
          posts: posts,
        });

        localStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("users", JSON.stringify(userData));
        goTimeMachine();
      }
    }
  } else {
    alert("You must login first.");
  }
};
//// post end
// REGISTER, LOGIN, LOGOUT and POST END
