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
  iconWeather.src = `${icon}`;
  iconWeather.classList.add('imagenClima');
  const divTemperatura = document.createElement('h2')
  divTemperatura.innerText = `${temp} m`;
  const botonBorrar = document.createElement('span');
  botonBorrar.classList.add('botonBorrar');
  divContenedor.append(divCiudad, divDescripcion,iconWeather, divTemperatura, botonBorrar);
  weatherSection.append(divContenedor);
  botonBorrar.addEventListener('click',()=>{
    divContenedor.remove();
  })
}

const funcionAgregar = async (ciudad = 'bogota')=>{
  const fet = await window.fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
  const salida = await fet.json();
  try{
    createWeatherCard(salida?.name, `id:${salida?.id}`, `Altura:${salida.height}`,salida.sprites.front_default);
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


