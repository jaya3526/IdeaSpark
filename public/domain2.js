document.getElementById('logout').addEventListener('click',()=>{
    window.location.href='index.html'
})
document.getElementById('close').addEventListener('click',()=>{
    document.querySelector('#addProjects').style.display='none';
    fetchIdeas();})
document.getElementById('closee').addEventListener('click',()=>{
    document.querySelector('#editProjects').style.display='none';
    fetchIdeas();})

document.addEventListener('DOMContentLoaded',()=>{
    fetchIdeas();
})

function fetchIdeas(){
    document.querySelector('#addProjects').style.display = 'none';
    document.querySelector('.name').style.display='flex';
    fetch('/idea',{
        method:'GET'
    }).then(res=>res.json())
    .then(data=>{
        var div=document.querySelector('.name');
        div.innerHTML='';
        if(data.length===0){
            div.innerHTML='<h3>No data found</h3>';
            return;
        }
        for(let i=0;i<data.length;i++){
            var row=document.createElement('div');
            row.className='users';
            var img=document.createElement('img');
            img.id='photo';
            row.innerHTML=`<a href="${data[i].image_url}" target="_blank">
    <img src="${data[i].image_url}" alt="Project image" ></a>
            <h3>${data[i].name}</h3>
            <p><b>Email:</b>${data[i].email}</p>
            <p><b>Domain:</b>${data[i].domain}</p>
            <p><b>Problem Statement:</b>${data[i].problemstatement}</p>
            <button onclick="editIdeas(${data[i].id})" id="edit">Edit</button>
        <button onclick="deleteIdeas(${data[i].id})" id="delete">delete</button><br>`;
            div.appendChild(row);
        }
    }).catch(err=>console.error({error:err}));
}
function add(){
    document.querySelector('#addProjects').style.display='block';
    document.querySelector('.name').style.display='none';
    document.querySelector('.addProj').onsubmit=(e)=>{
       e.preventDefault();
       addIdeas();
}
}
function addIdeas(){
    const formData = new FormData();
    formData.append('email', localStorage.getItem('email'));
    formData.append('password', localStorage.getItem('password'));
    formData.append('domain',document.getElementById('domain').value);
    formData.append('name', document.getElementById('names').value);
    formData.append('problemstatement', document.getElementById('textarea').value);
    const fileInput = document.getElementById('files'); 
    if (fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
    }
    console.log(formData);
    fetch('/idea',{
        method:'POST',
        body:formData
    }).then(res=>res.json())
    .then(()=>{
            document.querySelector('.addProj').reset();
            fetchIdeas();
    }).catch(err=>console.error('Error',err)) 
}


function deleteIdeas(id){
    fetch('/idea',{
        method:'GET'
    }).then(res=>res.json())
    .then(data=>{
        var f=1;
        for(let i=0;i<data.length;i++){
           if(id==data[i].id){
            if(data[i].email==localStorage.getItem('email')
            && data[i].password==localStorage.getItem('password')){
        f=0;
        }
           }
        }
        if(f===0){
            deleteUser(id);
        }
        else{
            alert('you cant delete others data');
        }
    }).catch(err=>console.error({error:err}))
}

function deleteUser(id){
    fetch(`/idea/${id}`,{
        method:'DELETE'
    }).then(res=>res.json())
    .then(()=>{
        alert('user deleted successfully')
    }).catch(err=>console.error('Error while deleting data'));
    fetchIdeas();
}

function editIdeas(id){
    fetch('/idea',{
        method:'GET'
    }).then(res=>res.json())
    .then(data=>{
       var idea=data.find(idea=>idea.id===id &&
        idea.email===localStorage.getItem('email')&&
        idea.password===localStorage.getItem('password')
       )
        if(idea){
            document.querySelector('#editProjects').style.display = 'block';
            document.querySelector('.name').style.display='none';
            document.getElementById('namee').value=idea.name;
            document.getElementById('domaine').value=idea.domain;
            document.getElementById('textareae').value=idea.problemstatement;
            document.querySelector('.editProj').onsubmit=(e)=>{
                e.preventDefault();
                editUser(id);
            }}
        else{
            alert('you cant update others data');
            return;
        }
    }).catch(err=>console.error({error:err}))
}

function editUser(id){
    var p= document.getElementById('textareae').value;
    if(p.length>255){
        alert('problemstatement length should be less than 225 characters');
        return;
    }
    const formData = new FormData();
    formData.append('domain',document.getElementById('domaine').value);
    formData.append('name', document.getElementById('namee').value);
    formData.append('problemstatement', document.getElementById('textareae').value);
    const fileInput = document.getElementById('filese'); 
    if (fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
    }
    // console.log(formData);
    fetch(`/idea/${id}`,{
        method:'PUT',
        body:formData
    }).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();})
    .then(()=>{
            console.log('Data updated successfully');
            document.querySelector('.editProj').reset();
            fetchIdeas();
    }).catch(err=>console.error({error:err}))
    document.querySelector('#editProjects').style.display = 'none';
    
}

function getDomainData(){
    var domain=document.getElementById('searchbar').value;
    if(domain){
        fetch('/idea',{
            method:'GET'
        }).then(res=>res.json())
        .then(data=>{
            var div=document.querySelector('.name');
            div.innerHTML='';
            if(data.length===0){
                div.innerHTML='<h3>No data found</h3>';
                return;
            }
            for(let i=0;i<data.length;i++){
                if(data[i].domain==domain){
                var row=document.createElement('div');
                row.className='users';
                var img=document.createElement('img');
                img.id='photo';
                row.innerHTML=`<a href="${data[i].image_url}" target="_blank">
        <img src="${data[i].image_url}" alt="Project image" ></a>
                <h3>${data[i].name}</h3>
                <p><b>Email:</b>${data[i].email}</p>
                <p><b>Domain:</b>${data[i].domain}</p>
                <p><b>Problem Statement:</b>${data[i].problemstatement}</p>
                <button onclick="editIdeas(${data[i].id})" id="edit">Edit</button>
            <button onclick="deleteIdeas(${data[i].id})" id="delete">delete</button><br>`;
                div.appendChild(row);
            }
    }}).catch(err=>console.error({error:err}));
    }
    else{
        fetchIdeas();
    }
}