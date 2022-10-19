

let cards = document.querySelector('.cards')
let card = document.querySelector('.card')
let input = document.querySelector('.input-box')
let select = document.querySelector('select')
let mode = document.querySelector('.mode')
let loader = document.querySelector('.loader')
let loaderI = document.querySelector('.limage')

let link = document.querySelector('.link')

let current;
window.onload = () => {
    setTimeout(() => {
        loader.style.display = "none"
    },6000)
    
    if(sessionStorage.getItem('mode') == 'light')
    {
        document.documentElement.classList.add('light-mode')
        mode.innerHTML = '<i class="darkmode material-symbols-outlined">light_mode</i> Light Mode'
        console.log(1);
        loaderI.setAttribute('src','./loader.gif')
        loader.style.background = 'white'

    }
    else if(sessionStorage.getItem('mode') == 'dark')
    {
        document.documentElement.classList.remove('light-mode')
        mode.innerHTML = '<i class="lightmode material-symbols-outlined">dark_mode</i> Dark Mode'
        console.log(2);
        loaderI.setAttribute('src','./loader.gif')
         loader.style.background = 'black'

    }
    
}

update()
mode.onclick = () => {
    document.documentElement.classList.toggle('light-mode');
    if(document.documentElement.classList.contains('light-mode'))
    {
        m = 'light'
        mode.innerHTML = '<i class="darkmode material-symbols-outlined">light_mode</i> Light Mode'
        
 
 
    }
    else
    {
 
        m = 'dark'
        
        mode.innerHTML = '<i class="lightmode material-symbols-outlined">dark_mode</i> Dark Mode'
        
    }
    sessionStorage.setItem('mode',m)
    console.log(sessionStorage.getItem('mode'));
    
 
    
 
 }
;
async function getData()
{
    let response = await fetch('https://restcountries.com/v3.1/all')
    let json = await response.json()
    console.log(json);
    return json
}

function update_card(response)
{
    cards.innerHTML = ""
    
    console.log(response);
    for(let data of response)
    {
        let name = data.name.official;
        let population = data.population;
        let capital = data.capital[0];
        let region = data.region;
        let flag = data.flags.png;

        // language = data.language.keys[0];

        
        let html = `
        <img src="${flag}" alt="">
        <div class="card-text-container">
            <h2 class="card-head">${name}</h2>
            <p class="card-text"><span class="bold">Population: </span>${population}</p>
            <p class="card-text"><span class="bold">Region: </span>${region}</p>
            <p class="card-text"><span class="bold">Capital: </span>${capital}</p>
        </div>
    `

    let ele = document.createElement('div')
    ele.classList.add('card')
    ele.innerHTML = html;
    let a = document.createElement('a')
    a.setAttribute('href',`page2.html?name=${name}`)
    a.innerHTML = ele.outerHTML;
    console.log(a);
    cards.appendChild(a)

    
    
    }
}
async function update()
{
    console.log('jj');
    let json = await getData()
    update_card(json)
    
}




async function searchByName()
{
    console.log(4);
    let value = input.value.trim();
    cards.innerHTML = ""
    if(value !='')
    {
    let url = `https://restcountries.com/v3.1/name/${value}`
    let response = await fetch(url)
    let json = await response.json()
    console.log(json);
    update_card(json)
    }
    else if(value == "")
    {
        update()
    }
}

async function searchByRegion()
{
    console.log(select.value);
    let value = select.value
    cards.innerHTML = ""
    if(value == 'Search by region')
    {
        update();
    }
    else
    {
        
        let response = await fetch(`https://restcountries.com/v3.1/region/${value}`)
        let json =await response.json()
        update_card(json)
    }
}




