document.getElementById('openAbout').addEventListener('click',()=>{
    document.querySelector('#about').style.display='block';
})

document.getElementById('closeAbout').addEventListener('click',()=>{
    document.querySelector('#about').style.display='none';
})

document.getElementById('closeContact').addEventListener('click',()=>{
    document.querySelector('#contact').style.display='none';
})

document.getElementById('openContact').addEventListener('click',()=>{
    document.querySelector('#contact').style.display='block';
})

document.getElementById('openLogin').addEventListener('click',()=>{
    document.querySelector('#login').style.display='block';
})

document.getElementById('closeLogin').addEventListener('click',()=>{
    document.querySelector('#login').style.display='none';
})

document.getElementById('openRegister').addEventListener('click',()=>{
    document.querySelector('#register').style.display='block';
})

document.getElementById('closeRegister').addEventListener('click',()=>{
    document.querySelector('#register').style.display='none';
})

document.querySelector('.registerForm').onsubmit=(e)=>{
        e.preventDefault();
    addUser();
}
function addUser(){
    var p=document.getElementById('rpassword').value;
    var cp=document.getElementById('rcpassword').value;
    if(p.length<6){
        alert('Password should be contain minimum 6 characters');
        return;
    }
    if(p!==cp){
        alert('Password and conform Password should be same');
        return;
    }
    var result={
        email:document.getElementById('remail').value,
        password:document.getElementById('rpassword').value
    }
    // console.log(result)
    fetch('/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(result)
    }).then(res=>res.json())
    .then(()=>{
        alert('User added successfully');
    }).catch(err=>{
        console.error('Error while updating data',err)
    })
    document.querySelector('#register').style.display='none';
}

document.querySelector('.loginUser').onsubmit = (e) => {
    const email = document.getElementById('lemail').value.trim(); 
    const password = document.getElementById('lpassword').value;
    e.preventDefault();
    fetch('/users', {
        method: 'GET'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log('Fetched user data:', data); 
        const user = data.find(user => user.email.trim().toLowerCase() === email.toLowerCase());
        if (user) {
            if (user.password === password) {
                localStorage.setItem('email',email);
                localStorage.setItem('password',password);
                window.location.href = 'main.html'; 
            } else {
                alert('Password was incorrect. Please try again.');
            }
        } else {
            alert('Email not found. Please try again.');
        }
    })
    .catch(err => {
        console.error('Error while logging in the user:', err);
    });
    document.querySelector('#login').style.display='none';
};


