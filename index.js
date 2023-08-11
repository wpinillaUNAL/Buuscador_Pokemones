const cardsSection = document.querySelector('.main-Cards');
const input = document.querySelector('input');
const buscar = document.querySelector('.buscador');
const portafolio = document.querySelector('.website');

portafolio.addEventListener('click',()=>{
  window.alert('Se enceuntra en construcción :(. Revisa en un futuro')
});

const closeCard = (childNode)=>{
  childNode.parentNode.removeChild(childNode);
}
const createPokeCard = (nombre, desc, altura, icon)=>{
  const divContenedor = document.createElement('div')
  divContenedor.classList.add("divContenedor")
  const divNombre = document.createElement('h2')
  divNombre.innerText = nombre;
  divNombre.classList.add('tituloPoke');
  const divDescripcion = document.createElement('h3')
  divDescripcion.innerText = desc;
  divDescripcion.classList.add('descripcionPoke');
  const iconPoke = document.createElement('img');
  iconPoke.src = `${icon}`;
  iconPoke.classList.add('imagenPoke');
  const divAltura = document.createElement('h2')
  divAltura.innerText = `${altura} m`;
  const botonBorrar = document.createElement('span');
  botonBorrar.classList.add('botonBorrar');
  divContenedor.append(divNombre, divDescripcion,iconPoke, divAltura, botonBorrar);
  cardsSection.append(divContenedor);
  botonBorrar.addEventListener('click',()=>{
    divContenedor.remove();
  })
}

const funcionAgregar = async (Pokemon)=>{
  debugger;
  try{
    const fet = await window.fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.toLowerCase()}`);
    const salida = await fet.json();
    createPokeCard(salida?.name, `id:${salida?.id}`, `Altura:${salida.height}`,salida.sprites.front_default);
  }
  catch{
    window.alert('Lo sentimos, no pudimos encontrar este Pokemon :(');
  }
}
const retornoPokemon = ()=>{
  funcionAgregar(input.value);
  input.value = '';
}
buscar.addEventListener('click', retornoPokemon);


