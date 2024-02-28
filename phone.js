

//  load  data
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`

    https://openapi.programming-hero.com/api/phones?search=${searchText}

    `)
    const data = await res.json()

    const phones = data.data;

    console.log(phones)

    displayPhones(phones, isShowAll)
}

// display data

const displayPhones = (phones, isShowAll) => {

    // show all container

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12 && !isShowAll ){

        showAllContainer.classList.remove('hidden');

    }
    else{

        showAllContainer.classList.add('hidden');

    }
    console.log('is show all', isShowAll)

       // show 5 data only

       console.log(phones)

       if(!isShowAll){
        console.log('hi')
         phones = phones.slice(0,5);
     }

     console.log(phones)



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
            <button onclick ="showAllDetails('${phone.slug}') " class="btn btn-primary">Show All</button>
          </div>
        </div>
           
       
        `
        phonesContainer.appendChild(phoneCard);

    })

    toggleLoadingSpinner(false);


}
// loading spinner

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading");

    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// handle show All

const handleShowAll = () =>{

   
    handleSearch(true);
}


// handleSearch

const handleSearch =(isShowAll) =>{
 
    const inputField = document.getElementById('search-field');

    const searchText = inputField.value;

    console.log(searchText)

    // toggle spinner
    toggleLoadingSpinner(true);

    loadPhone(searchText, isShowAll);

    // inputField.value = ''


}

// show All Details

const showAllDetails = async (id) => {
    // console.log('hi')

    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data)

    const phone = data.data
    // console.log(data.data.name)
    // console.log(data.data.mainFeatures.storage)

    showPhoneDetails(phone)

}

// showPhoneDetails

const showPhoneDetails = (phone) =>{

    // show Modals

    my_details_modal.showModal()

    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name

    const showModalContainer = document.getElementById('show-modal-container');

    showModalContainer.innerHTML = `
    
    <img src="${phone.image}" alt="">
    <p><span>storage : </span> ${phone.mainFeatures?.storage} </p>
    <p><span>displaySize : </span> ${phone.mainFeatures?.displaySize  || 'no display size found'} </p>
    <p><span>chipSet : </span> ${phone.mainFeatures?.chipSet} </p>
    <p><span>memory : </span> ${phone.mainFeatres?.memory ? phone.mainFeatures.memory : 'no memory found'} </p>
    
    `

}

loadPhone('iphone')