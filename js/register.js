let url = "https://todoo.5xcamp.us";

const inputEmail = document.querySelector("#inputEmail");
const inputNickname = document.getElementById('inputNickname');
const inputPasswordMain = document.getElementById('inputPasswordMain');
const inputPasswordCheck = document.getElementById('inputPasswordCheck');

const registerSubmit = document.querySelector('#registerSubmit');












registerSubmit.addEventListener("click", function (e) {


    // 獨立成變數
    // --------------------------
    document.querySelector('#registerResult').textContent = ''
    document.querySelector('.checkemail').textContent = ''
    document.querySelector('.checkpassword').textContent = ''
    document.querySelector('#registerResult').textContent = ''
    // --------------------------



    if (
        inputEmail.value == "" ||
        inputNickname.value == "" ||
        inputPasswordMain.value == "" ||
        inputPasswordCheck.value == ""
    ) {
        // alert("請勿留空 請填寫完整資訊");
        document.querySelector('#registerResult').textContent = "請勿留空 請填寫完整資訊";
        return;
    }

    if (validateEmail(inputEmail.value) == false) {
        // alert("請填寫正確的Email格式");
        document.querySelector('.checkemail').textContent = '請填寫正確的Email格式';
        return;
    }

    if (inputPasswordMain.value !== inputPasswordCheck.value) {
        // alert("需和密碼一致");
        document.querySelector('.checkpassword').textContent = '需和密碼一致';
        return;
    }

    axios.post(`${url}/users/`, {
        user: {
            email: `${inputEmail.value}`,
            nickname: `${inputNickname.value}`,
            password: `${inputPasswordMain.value}`
        }
    }
    ).then((response) => {
        // console.log(response)
        alert(response.data.message)


        // 將資料和訪問牌紀錄起來 放在localstorage
        let authorization = response.headers.authorization;
        let nickname = response.data.nickname;

        // 設置在localstorage
        localStorage.setItem('authorization', authorization);
        localStorage.setItem('nickname', nickname);

        location.href = 'todo.html';

    }).catch(function (error) {
        console.log(error.response.data.message)
        // console.log(error.response.data.error[0])
        // alert(error.response.data?.error[0])
        document.querySelector('#registerResult').textContent = error.response.data?.error[0];
    })

    //     .then(function () {
    //     location.href = 'index.html';
    // })

})