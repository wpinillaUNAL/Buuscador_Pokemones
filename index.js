const apiKey = "07fd0794b848eb5d10d388c9aa4d360a";
const weatherSection = document.querySelector('.main-weathers');
const input = document.querySelector('input');
const buscar = document.querySelector('.buscador');
const portafolio = document.querySelector('.website');

portafolio.addEventListener('click',()=>{
  window.alert('Se enceuntra en construcción :(. Revisa en un futuro')
});

const closeCard = (childNode)=>{
  childNode.parentNode.removeChild(childNode);
}
const createWeatherCard = (city, desc, temp, icon)=>{
  const divContenedor = document.createElement('div')
  divContenedor.classList.add("divContenedor")
  const divCiudad = document.createElement('h2')
  divCiudad.innerText = city;
  divCiudad.classList.add('tituloCiudad');
  const divDescripcion = document.createElement('h3')
  divDescripcion.innerText = desc;
  divDescripcion.classList.add('descripcionClima');
  const iconWeather = document.createElement('img');
  iconWeather.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconWeather.classList.add('imagenClima');
  const divTemperatura = document.createElement('h2')
  divTemperatura.innerText = `Temperatura: ${temp}°`;
  const botonBorrar = document.createElement('span');
  botonBorrar.classList.add('botonBorrar');
  divContenedor.append(divCiudad, divDescripcion,iconWeather, divTemperatura, botonBorrar);
  weatherSection.append(divContenedor);
  botonBorrar.addEventListener('click',()=>{
    divContenedor.remove();
  })
}

const funcionAgregar = async (ciudad = 'bogota')=>{
  const fet = await window.fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}`);
  const salida = await fet.json();
  try{
    const lat = salida[0].lat, lon=salida[0].lon;
    const clima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=sp`);
    const climaSalida = await clima.json();
    createWeatherCard(salida[0]?.name, climaSalida.weather[0].description, climaSalida.main.temp,climaSalida.weather[0].icon);
  }
  catch{
    window.alert('Lo sentimos, no pudimos encontrar esta ciudad :(');
  }
}
const retornoCiudad = ()=>{
  funcionAgregar(input.value);
  input.value = '';
}
buscar.addEventListener('click', retornoCiudad);


