const countries = document.querySelector('.countries')
const dropDown = document.querySelector('.drop-down')
const dropElem = document.querySelector('.drop')
const region = document.querySelectorAll('.region')
const searchCountry = document.querySelector('.country-search')
const regionName = document.getElementsByClassName('regionName')
const countryName = document.getElementsByClassName('countryName')
const darkMode = document.querySelector('.toggle')
const moon = document.querySelector('.moon')



async function getCountry() {
  try{
    let countries = await getData(`https://restcountries.com/v3.1/all`)    
    console.log(countries); 
    countries.map((data) => {
      countries.innerHTML += showCountry(data)
    })
  }catch(err){
    console.log(err);
  }
}
getCountry()

function showCountry(data){
  const country = document.createElement('div')
  country.classList.add('country')
  country.innerHTML = `
  <div  class="country-img">
    <img src="${data.flags.svg}" alt="">
  </div>
  <div class="country-info">
    <h5 class='countryName'>${data.name.common}</h5>
    <p><strong>Population: </strong>${data.population}</p>
    <p class="regionName"><strong>Region: </strong>${data.region}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
  </div>
  `
  countries.appendChild(country)
  country.addEventListener('click', () => {
    showCountryDetail(data)
  })
}

dropDown.addEventListener('click', () =>{
  dropElem.classList.toggle('show-drop-down')
})




region.forEach(element => {
  element.addEventListener('click', () => {
    console.log(element);
  Array.from(regionName).forEach(elem => {
    console.log(elem.innerText);
    if(elem.innerText.includes(element.innerText) || element.innerText == 'All'){
      elem.parentElement.parentElement.style.display='grid'
    }else{
      elem.parentElement.parentElement.style.display='none'
    }
    })
  })
});

searchCountry.addEventListener('input', () => {
  Array.from(countryName).forEach(elem => {
    console.log(elem.innerText);
    if(elem.innerText.toLowerCase().includes(searchCountry.value.toLowerCase())){
      elem.parentElement.parentElement.style.display='grid'
    }else{
      elem.parentElement.parentElement.style.display='none'
    }
  })
})

darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  moon.classList.toggle('fas')
})


const countryModal = document.querySelector('.country-modal')

function showCountryDetail(data){
  countryModal.classList.toggle('show')
  countryModal.innerHTML = `
  <butto class="back">Back</butto>
  <div class="modal">
    <div class="left-modal">
      <img src="${data.flags.svg}" alt="">
    </div>
    <div class="right-modal">
      <h1>${data.name.common}</h1>
      <div class="modal-info">
        <div class="inner-left inner">
          <p><strong>Population: </strong>${data.population}</p>
          <p><strong>Region: </strong>${data.region}</p>
          <p><strong>Sub Region: </strong>${data.subregion}</p>
        </div>
        <div class="inner-right inner">
          <p><strong>Capital: </strong>${data.capital}</p>
          <p><strong>Top level domain: </strong>${data.region}</p>
          <p><strong>Currencies: </strong>${data.capital}</p>
        </div>
      </div>
    </div>
  </div>
  `
  const back = countryModal.querySelector('.back')
  back.addEventListener('click', () => {
    countryModal.classList.toggle('show')
  })
}

