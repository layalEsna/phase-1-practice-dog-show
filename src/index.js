

const tableBody = document.querySelector('#table-body')
const nameInput = document.querySelector('#dog-form [name="name"]')
const breedInput = document.querySelector('#dog-form [name="breed"]')
const sexInput = document.querySelector('#dog-form [name="sex"]')




fetch('http://localhost:3000/dogs')
    .then(res => {
        if (!res.ok) {
            throw new Error('Error!')
        } return res.json()
    })
    .then(data => {
        //renderDog(dogs)
        data.forEach(dog => {
            const tr = document.createElement('tr')

            tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        `
            const btn = document.createElement('button')
            btn.dataset.id = dog.id
            btn.textContent = 'Edit'
            tr.appendChild(btn)
            tableBody.appendChild(tr)
            //})
            btn.addEventListener('click', () => {
                nameInput.value = dog.name
                breedInput.value = dog.breed
                sexInput.value = dog.sex

                const dogId = dog.id
                /////
                const updateDogInfo = () => {
                    fetch(`http://localhost:3000/dogs/${dogId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'name': nameInput.value,
                            'breed': breedInput.value,
                            'sex': sexInput.value
                        })
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error('Failed to update dog information')
                            } return res.json()
                        })
                        .catch((e) => {
                            console.log(e)
                        })

                }
                document.querySelector('#update-btn').addEventListener('click', updateDogInfo)


            }
            )
        })

    })
