const API_URL='https://api.github.com/users/'

const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')

async function getUser(username){
try{
const {data}=await axios(API_URL + username)
//console.log(data)


createUser(data)
getRepos(username)

}catch(
   error
){
    createErrorCard('Ardığınız kullanıcı bulunamadı :(')
}

}

let medata;

form.addEventListener('submit',(e)=>{
e.preventDefault()
const user=search.value
if(user){
    getUser(user)
    search.value=''
    
}
})



function createUser(user){
    
const userName=user.name||user.login
const userBio=user.bio ? `  <p>
${user.bio}
</p>`: ''
    
    const cardHTML=`
    <div class="card">
    <img
      class="user-image"
      src="${user.avatar_url}"
      alt="User Image"
    />

    <div class="user-info">
      <div class="user-name">
        <h2>${userName}</h2>
        <small>@${user.login}</small>
      </div>
    </div>

    <p>
    ${userBio}
    </p>

    <ul>
      <li>
        <i class="fa-solid fa-user-group"></i> ${user.followers}
        <strong>Followers</strong>
      </li>
      <li>${user.following}<strong>Following</strong></li>
      <li>
        <i class="fa-solid fa-bookmark"></i> ${user.public_repos}<strong>Repository</strong>
      </li>
    </ul>

    <div class="repos" id="repos">
     
    </div>
  </div> 
    
    
    
    
    
    
    
    `

    main.innerHTML=cardHTML
}

function createErrorCard(msg) {
    const cardErrorHTML = `
    
    <div class="card">
    <h2> ${msg} </h2>
    </div>
  
    `
  
    main.innerHTML = cardErrorHTML
  }

  async function getRepos(user){
    const reposEl=document.getElementById('repos')
const repoData=await axios(API_URL+user+'/repos')

const repoInfo=repoData.data
for(let i = 0;i< 4;i++){
   
   const reposLink=document.createElement('a')
   reposLink.href=`${repoInfo[i].html_url}`
    reposLink.target='_blank'
    reposLink.innerHTML=`<i class='fa-solid fa-book-bookmark'></i> ${repoInfo[i].name}`

   reposEl.appendChild(reposLink)
    
}



//console.log(repoInfo[0])
  }