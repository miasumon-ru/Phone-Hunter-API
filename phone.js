

//  load  data
const loadPhone = async (searchText) => {
    const res = await fetch(`

    https://openapi.programming-hero.com/api/phones?search=${searchText}

    `)
    const data = await res.json()

    const phones = data.data;

    console.log(phones)

    displayPhones(phones)
}

// display data

const displayPhones = (phones) => {

    // show all container

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12){

        showAllContainer.classList.remove('hidden');

    }
    else{

        showAllContainer.classList.add('hidden');

    }

    // show 5 data only

    phones = phones.slice (0,12)

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ''

    // phonesContainer

    phonesContainer.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'

    phones.forEach(phone => {


        const phoneCard = document.createElement('div');   

        phoneCard.classList = 'card bg-base-100 shadow-xl';



        phoneCard.innerHTML = `

        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p> ${phone.slug}</p>

          <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
           
       
        `
        phonesContainer.appendChild(phoneCard);

    })


}

// handleSearch

const handleSearch =() =>{
 
    const inputField = document.getElementById('search-field');

    const searchText = inputField.value;

    console.log(searchText)

    loadPhone(searchText);

    inputField.value = ''


}

// loadPhone()