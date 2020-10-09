// when page first loads show first 50 monsters with name, age, description.
// ABOVE monsters list, have form to create new monster. FIELDS: name, age, description and Create Monster Button.
// ^^ on button click monster should be added and saved to API
// At end of monsters list show a button, on click next 50 monsters loaded and shown.

document.addEventListener("DOMContentLoaded", () => {
	const mainUrl = "http://localhost:3000/monsters/?_limit=50&_page="

  let pageNumber = 1
  
  
  const getMonsters = (pageNumber) => {
    let url = mainUrl + pageNumber
			fetch(url)
			.then(response => response.json())
			.then(monsters => {
        renderMonsters(monsters)
			})
		}


  const forward = document.querySelector('#forward')
  const back = document.querySelector('#back')
  const monstListDiv = document.getElementById('monster-container')

  forward.addEventListener('click', function(e){
    pageNumber++
    monstListDiv.innerHTML = ''
    getMonsters(pageNumber)
  
  })
  back.addEventListener('click', function(e){
    pageNumber--
    monstListDiv.innerHTML = ''
    getMonsters(pageNumber)
  })

		clickHandler()
    getMonsters()
    createForm()
  })
  
  const renderMonsters = (monsters) => {
  monsters.forEach(monster => {
    renderMonst(monster)
  })

}
  

const renderMonst = (monster) => {
	const monstListDiv = document.getElementById('monster-container')
    let name = monster.name
    let age = monster.age
    let description = monster.description	

    let monstDiv = document.createElement('div')
    monstDiv.innerHTML = `
      <h2> Name: ${name} </h2>
      <h3> Age: ${age} </h3>
      <p> Description: ${description} </p>
    `
    monstListDiv.prepend(monstDiv)
}

const createForm = () => {
	const grabCreateMonstDiv = document.getElementById('create-monster')
  let form = document.createElement('form')
  form.innerHTML = `
    <label type='text' for='name'>Name</label>
    <input id='name' placeholder="name"></input>
    <br>
    <label for='age'>Age</label>
    <input id='age' type='text' for='age'></input>
    <br>
    <label for='description'>Description</label>
    <input id='description' ></input>
    <br>
    <input id='submit' type="submit"></input>
  `
  grabCreateMonstDiv.append(form)
  
}  

  
const clickHandler = () => {
	document.addEventListener('submit', e => {
		e.preventDefault()
      const form = e.target

			const name = form.name.value
			const age = form.age.value
      const description = form.description.value
			
		const newMonstObj = {name: name, age: age, description: description}
		
		form.reset()

		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			body: JSON.stringify(newMonstObj)
		}

		fetch("http://localhost:3000/monsters", options)
		.then(response => response.json())
		.then(monster => {
			renderMonst(monster)
    })
  })

}
