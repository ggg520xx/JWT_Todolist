let nickname = localStorage.getItem('nickname');
let authorization = localStorage.getItem('authorization');


document.querySelector('.username').textContent = nickname;
const logoutbtn = document.querySelector('.logoutbtn');


let url = "https://todoo.5xcamp.us";




function check() {
    axios
        .get(`${url}/check`, { headers: { authorization } })

        .catch(function (error) {
            // console.log(error)
            if (error.response.status == 401) {
                localStorage.clear();
                alert('請重新登入');
                location.href = 'index.html';
            }
        })
        .then(function (response) {

            if (response.status == 200) {

                console.log('ok')
                console.log(response)
            }

        });
}
setInterval(check, 100000)









function logout() {
    axios
        .delete(`${url}/users/sign_out`, { headers: { authorization } })
        .then(function (response) {

            localStorage.removeItem('nickname');
            localStorage.removeItem('authorization');

            alert(response.data.message)
            location.href = 'index.html';
        });
}


logoutbtn.addEventListener('click', function (e) {
    logout();
})
