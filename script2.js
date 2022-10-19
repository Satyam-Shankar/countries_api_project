
let loader = document.querySelector('.loader')
let back = document.querySelector('.button')
let native = document.querySelector('.native')
let tld = document.querySelector('.tld')
let population = document.querySelector('.popl')
let currencies = document.querySelector('.currencies')
let region = document.querySelector('.region')
let nativeL = document.querySelector('.nativeL')
let subR = document.querySelector('.sr')
let capital = document.querySelector('.capital')
let border = document.querySelector('.countries')
let img = document.querySelector('.flag-img')
let cname = document.querySelector('.name')
let lang ;
let mode = document.querySelector('.mode')

window.onload = () => {
   setTimeout(() => {
       loader.style.display = "none"
   },2500)
   
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

back.onclick = () => {

let url = window.location.href;
url = url.split('/')
url.pop()
url = url.join('/')



window.location.href = url+'/index.html'
}
async function getJson()
     {
      let url = new URLSearchParams(window.location.search)
      let name = url.get('name')
      lang = url.get('lang')
      let response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
      let json =await response.json();
      console.log(json);
      json = json[0]
      console.log(json);
      return json
     }
async function updateDom()
     {
        let json = await getJson();
      //   native.innerText = json.name.nativeName.eng.official;
        population.innerText = json.population;
        currencies.innerText = Object.entries(json.currencies)[0][1].name
         tld.innerText = json.tld[0]
         region.innerText = json.region;
         subR.innerText = json.subregion
         capital.innerText = json.capital[0]
         
        
      

         //Language
        
         console.log(Object.keys(json.languages));
         l = Object.keys(json.languages);
         console.log(l);
         let arr = [];
         let temp = json.languages;
         for(let i of l)
         {

            arr.push(temp[i])
         }
         console.log(arr);
         let string = arr.join(', ')
         console.log(string);
         nativeL.innerText = string

          //Native Name
          let a = l[0]
          console.log(a);
       let obj = json.name.nativeName[a].official;
       native.innerText = obj
       


         //Border
         try
         {
         let borders = json.borders;
         for(let i of borders)
         {
            let response = await fetch(`https://restcountries.com/v3.1/alpha/${i}`)
            let json = await response.json()
            console.log(json);
            let ele = document.createElement('span')
            ele.classList.add('country')
             
            ele.innerText = json[0].name.common;
            let a = document.createElement('a')
            a.setAttribute('href',`./page2.html?name=${json[0].name.common}`)
            a.appendChild(ele)
            border.appendChild(a)
         }
      }
      catch
      {
         border.innerHTML = "<p>No border countries</p>"
      }

         //flag
         img.setAttribute('src',json.flags.png)

         cname.innerHTML = json.name.official;
        
     }

     updateDom()