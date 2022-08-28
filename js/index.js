let url = "https://todoo.5xcamp.us";

let authorization = localStorage.getItem('authorization');
let nickname = localStorage.getItem('nickname');

// 登入介面取得 localstorage 判斷是否已取得登入狀態

function init() {

    if (authorization !== null || nickname !== null) { location.href = 'fin.html'; }

    else  { 

        // location.href = 'index.html';
        // return
    }

}
init();

const loginSubmit = document.querySelector('#loginSubmit');


const loginEmail = document.querySelector("#loginEmail");
const loginPasdword = document.getElementById('loginPasdword');



loginSubmit.addEventListener("click", function (e) {

    axios
        .post(`${url}/users/sign_in`, {
            "user": {
                "email": loginEmail.value,
                "password": loginPasdword.value
            }
        })

        .then(function (response) {
            // console.log(response)
            alert(response.data.message);

            let authorization = response.headers.authorization;
            let nickname = response.data.nickname;
            localStorage.setItem('authorization', authorization);
            localStorage.setItem('nickname', nickname);
            location.href = 'todo.html';
        })
        .catch(function (error) {
            // console.log(error)
            // alert(error.response.data.message);
            document.querySelector('#loginResult').textContent = `${error.response.data.message} , 請確認帳號密碼是否正確`;
            return;
        })


})