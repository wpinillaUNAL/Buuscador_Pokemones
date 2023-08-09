const apiKey = "07fd0794b848eb5d10d388c9aa4d360a";
const weatherSection = document.querySelector('.main-weathers');
const input = document.querySelector('input');
const buscar = document.querySelector('.buscador');

const closeCard = (childNode)=>{
  childNode.parentNode.removeChild(childNode);
}
const createWeatherCard = (city, desc, temp, icon)=>{
  const divContenedor = document.createElement('div')
  divContenedor.classList.add("divContenedor")
  const divCiudad = document.createElement('h2')
  divCiudad.innerText = city;
  const divDescripcion = document.createElement('h3')
  divDescripcion.innerText = desc;
  const iconWeather = document.createElement('img');
  iconWeather.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const divTemperatura = document.createElement('h2')
  divTemperatura.innerText = `${temp}°`;
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
  const lat = salida[0].lat, lon=salida[0].lon;
  const clima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=sp`);
  const climaSalida = await clima.json();
  createWeatherCard(salida[0]?.name, climaSalida.weather[0].description, climaSalida.main.temp,climaSalida.weather[0].icon);
}
const retornoCiudad = ()=>{
  funcionAgregar(input.value);
  input.value = '';
}
buscar.addEventListener('click', retornoCiudad);


