// when page first loads show first 50 monsters with name, age, description.
// ABOVE monsters list, have form to create new monster. FIELDS: name, age, description and Create Monster Button.
// ^^ on button click monster should be added and saved to API
// At end of monsters list show a button, on click next 50 monsters loaded and shown.

document.addEventListener("DOMContentLoaded", () => {
	const mainUrl = "http://localhost:3000/monsters/?_limit=50&_page="

  let pageNumber = 1

  let url = mainUrl + pageNumber

		const getMonsters = () => {
			fetch(url)
			.then(response => response.json())
			.then(monsters => {
        renderMonst(monsters)
			})
		}

    getMonsters()
    createForm()
  })
  
  
const renderMonst = (monsters) => {
	const monstListDiv = document.getElementById('monster-container')
		monsters.forEach(monster => {
			let name = monster.name
			let age = monster.age
			let description = monster.description	

			let monstDiv = document.createElement('div')
			monstDiv.innerHTML = `
				<h2> Name: ${name} </h2>
				<h3> Age: ${age} </h3>
				<p> Description: ${description} </p>
			`
			monstListDiv.append(monstDiv)
		});
}

const createForm = () => {
  let form = document.createElement('form')
  form.innerHTML = `
    <label type='text' for='name'>Name</label>
    <input for=name placeholde="name"></input>
    <label  for=age></label>
    <input type='text' for></input>
    <label></label>
    <input></input>
    <input type="submit">Submit</input>
  `
  
}  
  
