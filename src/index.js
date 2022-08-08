let addToy = false;
let form = document.querySelector('.add-toy-form')
let toyCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    let cards = toys.map(toy => {
      return `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    </div>`
    })
    toyCollection.innerHTML += cards;
  })
  
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    toyName = e.target.nameInput.value
    toyImage = e.target.linkInput.value
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(newToy => {
      let newtoy2 = `<div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes</p>
      <button class="like-btn" id="${newToy.id}">Like ❤️</button>
    </div>`
    toyCollection.innerHTML += newtoy2
    e.target.reset()
    })
    })
  toyCollection.addEventListener('click', (e) => {
    if (e.target.className === 'like-btn'){
      let likes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = likes + 1
      e.target.previousElementSibling.innerText = `${newLikes} Likes`

      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })

    }
  })
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



/*form.addEventListener('submit', (e) => {
e.preventDefault();
div = document.createElement('div')
h2 = document.createElement('h2')
img = document.createElement('img')
p = document.createElement('p')
btn = document.createElement('button')
div.classList.add('card')
img.classList.add('toy-avatar')
btn.classList.add('like-btn')
btn.id = 
h2.innerText = e.target.nameInput.value
img.src = e.target.linkInput.value
btn.innerText = 'Like'
div.appendChild(h2)
div.appendChild(img)
div.appendChild(p)
div.appendChild(btn)
toyCollection.appendChild(div)

})*/