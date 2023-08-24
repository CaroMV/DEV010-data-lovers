/* 
  ! DESCRIPCIÓN
  * Main.js contiene la información asociada a los botones, uso del DOM y display de tarjetas
 */

// ! IMPORTACIONES
import { obtenerPeliculas,obtenerPeliculaPorId,obtenerDirectores, obtenerProductores, aplicarFiltros, buscarTermino, ordenarPeliculasPorAñoAscendente, ordenarPeliculasPorAñoDescendente, ordenarPeliculasAZ, ordenarPeliculasZA,calcularPromedioScore } from "./data.js";
import data from "./data/ghibli/ghibli.js"
// ! REFERENCIAS AL DOM
// * Sección buscar
const btnBuscar = document.querySelector("#buscar");
const inputBuscar = document.querySelector("#input-buscar");

// * Super contenedor tarjeta
const contenedorDelContenedorDeTarjetas = document.querySelector("#contenedor-del-contenedor-tarjetas")

// * Música
const botonReproducir = document.querySelector("#reproducir");
const botonPausar = document.querySelector("#pausar");
const audio = document.querySelector("#audio");

// * Filtros
const peliculasEncontradas = document.querySelector("#peliculas-encontradas");
const inputMinimo = document.querySelector("#valor-minimo");
const inputMaximo = document.querySelector("#valor-maximo");
const selectDirector = document.querySelector("#filtro-director");
const selectProductor = document.querySelector("#filtro-productor");
const botonFiltrar = document.querySelector("#btn-filtrar");
const botonLimpiarFiltros = document.querySelector("#btn-limpiar-filtros");

// * Ordenar
const ordenarPorAño = document.querySelector("#ordenar-fecha");
const ordenarPorAlfabeto = document.querySelector("#ordenar-alfabeticamente");
const botonPromedio = document.querySelector("#calculo-promedio");

// * Sección personajes
const tarjetaPelicula = document.querySelector(".tarjeta-pelicula");
const contenedorTarjeta = document.querySelector(".contenedor-tarjeta");


// ! FUNCIONES
// * Función total de películas
const peliculas = obtenerPeliculas(data);

// * Resultados 
let resultados = [...obtenerPeliculas(data)]

//* Función total directores
const directores = obtenerDirectores(data);

// * Función total productores
const productores = obtenerProductores(data);

// * Función reproducir música
botonReproducir.addEventListener("click", () => {
  audio.play();
  window.scrollTo(0, 1000);
})

// * Función pausar música
botonPausar.addEventListener("click", () => {
  audio.pause();
});

// * Función modular el volumen del audio
audio.volume = 0.5;

// * Función mostrar tarjetas
const mostrarPeliculas = (peliculas) => {
  if (peliculas.length === 0){
    peliculasEncontradas.textContent = "0 movies found";
    contenedorDelContenedorDeTarjetas.innerHTML = ""
    // Article no se encontraron películas
    const noSeEncontraronPeliculas = document.createElement("article");
    noSeEncontraronPeliculas.classList.add("no-se-encontraron-peliculas");

    // Imagen del indicativo
    const imagenSonrisaTotoro = document.createElement("img");
    imagenSonrisaTotoro.src = "img/no-movies-found-totoro.gif";

    // Texto del indicativo
    const textoNoSeEncontraronPeliculas = document.createElement("h2");
    textoNoSeEncontraronPeliculas.textContent = "No Movies Found"

    // Añadir hijos al Article
    noSeEncontraronPeliculas.appendChild(imagenSonrisaTotoro);
    noSeEncontraronPeliculas.appendChild(textoNoSeEncontraronPeliculas);

    // Añadiendo el Article a la sección
    contenedorDelContenedorDeTarjetas.appendChild(noSeEncontraronPeliculas);

  } else {
    contenedorDelContenedorDeTarjetas.innerHTML = "";
    peliculas.forEach(pelicula => {
      // Mostrar la cantidad de películas encontradas
      peliculasEncontradas.textContent = peliculas.length + " movies found"

      // Crear el Div contenedor donde estará la tarjeta
      const contenedorTarjeta = document.createElement("div");
      contenedorTarjeta.classList.add("contenedor-tarjeta");
  
      // Article de la tarjeta
      const tarjetaPelicula = document.createElement("article");
      tarjetaPelicula.classList.add("tarjeta-pelicula");
  
      // Div contenedor imagen
      const contenedorImagen = document.createElement("div");
      contenedorImagen.classList.add("contenedor-img");
      // Añadiendo el Div contenedor imagen a la tarjeta
      tarjetaPelicula.appendChild(contenedorImagen)
  
      // Imagen portada
      const imagen = document.createElement("img");
      imagen.src = pelicula.poster;
      imagen.alt = "portada-película";
      imagen.id = "portada";
      contenedorImagen.appendChild(imagen);
  
      // ! Div contenedor información
      const contenedorInfo = document.createElement("div");
      contenedorInfo.classList.add("contenedor-info");
      tarjetaPelicula.appendChild(contenedorInfo);
  
      // * Elementos dentro del contenedorInfo
      // Título película
      const titulo = document.createElement("h3");
      titulo.id = "titulo";
      titulo.textContent = pelicula.title;
      contenedorInfo.appendChild(titulo);
      // Descripción span y p
      const descripcionSpan = document.createElement("span");
      descripcionSpan.id = "descripcion";
      descripcionSpan.textContent = "Description";
      contenedorInfo.appendChild(descripcionSpan);
  
      const descripcion = document.createElement("p");
      descripcion.id = "descripcion";
      descripcion.textContent = pelicula.description;
      contenedorInfo.appendChild(descripcion);
  
      // ! Div director, productor, fecha y score
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("director-productor-fecha-puntuacion");
  
      // * Elementos dentro del div director, productor, fecha y score
      // Div director
      const directorDiv = document.createElement("div");
      directorDiv.classList.add("info");
      const directorSpan = document.createElement("span");
      directorSpan.textContent = "Director:";
      const directorP = document.createElement("p");
      directorP.id = "director";
      directorP.textContent = pelicula.director;
      directorDiv.appendChild(directorSpan);
      directorDiv.appendChild(directorP);
      infoDiv.appendChild(directorDiv);
  
      // Div Productor
      const producerDiv = document.createElement("div");
      producerDiv.classList.add("info");
      const producerSpan = document.createElement("span");
      producerSpan.textContent = "Producer:";
      const producerP = document.createElement("p");
      producerP.id = "productor";
      producerP.textContent = pelicula.producer;
      producerDiv.appendChild(producerSpan);
      producerDiv.appendChild(producerP);
      infoDiv.appendChild(producerDiv);
  
      // Div Fecha
      const dateDiv = document.createElement("div");
      dateDiv.classList.add("info");
      const dateSpan = document.createElement("span");
      dateSpan.textContent = "Release Date:";
      const dateP = document.createElement("p");
      dateP.id = "fecha";
      dateP.textContent = pelicula.release_date;
      dateDiv.appendChild(dateSpan);
      dateDiv.appendChild(dateP);
      infoDiv.appendChild(dateDiv);
  
      //Div Score
      const scoreDiv = document.createElement("div");
      scoreDiv.classList.add("info");
      const scoreSpan = document.createElement("span");
      scoreSpan.textContent = "Score:";
      const scoreP = document.createElement("p");
      scoreP.id = "puntuacion";
      scoreP.textContent = pelicula.rt_score;
      scoreDiv.appendChild(scoreSpan);
      scoreDiv.appendChild(scoreP);
      infoDiv.appendChild(scoreDiv);
  
      contenedorInfo.appendChild(infoDiv);
  
      //Div botones
      const botonContenedor = document.createElement("div");
      botonContenedor.classList.add("contenedor-btn");
  
      // Boton personajes
      const botonPersonajes = document.createElement("button");
      botonPersonajes.classList.add("btn");
      botonPersonajes.classList.add("btn-personajes");
      botonPersonajes.textContent = "Characters";
      botonPersonajes.id="btn-personajes";
      botonPersonajes.setAttribute("data-id", pelicula.id) // para tener contexto y poder generar los personajes
      botonContenedor.appendChild(botonPersonajes);
  
      // Boton Lugares
      const botonLugares = document.createElement("button");
      botonLugares.classList.add("btn");
      botonLugares.textContent = "Locations";
      botonLugares.id="btn-lugares";
      botonLugares.setAttribute("data-id", pelicula.id) // para tener contexto y poder generar los personajes
      botonContenedor.appendChild(botonLugares);
  
      contenedorInfo.appendChild(botonContenedor);
  
      // Agregar contenedorinfo dentro de tarjetaPelicula
      tarjetaPelicula.appendChild(contenedorInfo);
  
      // Agregar tarjetaPelicula dentro de contenedorTarjetas
      contenedorTarjeta.appendChild(tarjetaPelicula);
  
      // Agregar contenedorTarjetas dentro de seccionTarjetas
      contenedorDelContenedorDeTarjetas.appendChild(contenedorTarjeta);

    });
  }
  obtenerBotonesPersonajes()
}

// * Función para obtener botón de personajes
function obtenerBotonesPersonajes (){
  const btnPersonajes = document.querySelectorAll(".btn-personajes"); // para poder utilizar todos los botones personaje...
  console.log(btnPersonajes)
}

mostrarPeliculas(peliculas);

//! probando otras cosas de botones:
document.addEventListener('click', function(event) {
  const elementoClickeado = event.target;
  console.log("Clickeaste en:", elementoClickeado);

  // Verificar si el elemento clicado es un botón con clase 'btn-personajes'
  if (event.target.classList.contains('btn-personajes')) {
 
    // cambiaPagina(arrayTarjetas);
    // Obtener el valor del atributo data-id del botón clicado
    const dataIdValue = event.target.getAttribute('data-id');
    const tarjetaPelicula = event.target.closest('.tarjeta-pelicula');
    tarjetaPelicula.classList.toggle("active");
    // inicializarCarrusel()
    mostrarPersonajes(dataIdValue, tarjetaPelicula);
  }
  // }
});

// * Función de Calcular Promedio
botonPromedio.addEventListener("click", () => {
  const promedioPeliculas = calcularPromedioScore(resultados);
  const dialogPromedio = document.createElement("dialog");
  const tituloPromedio = document.createElement("h2");
  tituloPromedio.textContent = "Average Movie Rating"
  dialogPromedio.appendChild(tituloPromedio)

  const parrafoPromedio = document.createElement("p");
  parrafoPromedio.textContent = "The average rating per film is " + promedioPeliculas;
  dialogPromedio.appendChild(parrafoPromedio);
  const botonContenedor = document.createElement("div");
  botonContenedor.classList.add("contenedor-btn");

  const botonPromedio = document.createElement("button");
  botonPromedio.classList.add("btn");
  botonPromedio.textContent = "Close";

  botonContenedor.appendChild(botonPromedio);
  dialogPromedio.appendChild(botonContenedor);

  contenedorDelContenedorDeTarjetas.appendChild(dialogPromedio);
  dialogPromedio.showModal();

  botonPromedio.addEventListener("click", () => {
    dialogPromedio.close();
  })
})

// * Funciones Ordenar:
// Por Año
//  eventListener para un select. <More recent> y <Oldest>
ordenarPorAño.addEventListener("change", () => {
  // const peliculas = obtenerPeliculas();
  // Necesitamos que use una función para una opción y la otra para la otra
  if (ordenarPorAño.value === "orden-descendente") {
    const peliculasOrdenadas= ordenarPeliculasPorAñoDescendente(resultados);
    mostrarPeliculas(peliculasOrdenadas);
  
  } else if (ordenarPorAño.value === "orden-ascendente") {
    const peliculasOrdenadas= ordenarPeliculasPorAñoAscendente(resultados);
    mostrarPeliculas(peliculasOrdenadas);
  } 
});

// Por Letra
//  eventListener para un select. <More recent> y <Oldest>
ordenarPorAlfabeto.addEventListener("change", () => {
  // const peliculas = obtenerPeliculas();
  // Necesitamos que use una función para una opción y la otra para la otra
  if (ordenarPorAlfabeto.value === "ordenar-a-z") {
    const peliculasOrdenadas= ordenarPeliculasAZ(resultados);
    mostrarPeliculas(peliculasOrdenadas);
  
  } else if (ordenarPorAlfabeto.value === "ordenar-z-a") {
    const peliculasOrdenadas= ordenarPeliculasZA(resultados);
    mostrarPeliculas(peliculasOrdenadas);
  } 
});

// * Función para buscar películas
btnBuscar.addEventListener("click", () => {
  const peliculasEncontradas = buscarTermino(inputBuscar.value);
  resultados = [...peliculasEncontradas];
  mostrarPeliculas(resultados);
  // Vaciar el input para buscar nuevamente
  inputBuscar.value = "";
  window.scrollTo(0, 1000);
})

// * Función mostrar directores
directores.forEach(director => {
  // Option director
  const opcionDirector = document.createElement('option')
  opcionDirector.textContent = director;

  // Añadiendo optionDirector al select
  selectDirector.appendChild(opcionDirector);
})

// * Función mostrar productores
productores.forEach(productor => {
  // Option productor
  const opcionProductor = document.createElement('option');
  opcionProductor.textContent = productor;

  // Añadiendo optionProductor al select
  selectProductor.appendChild(opcionProductor);
})

// * Función filtros
// Agregar el desplazamiento por scroll
botonFiltrar.addEventListener("click", () => {
  const resultadoFiltro = aplicarFiltros(inputMinimo.value,inputMaximo.value, selectDirector.value, selectProductor.value, resultados);
  
  resultados = [...resultadoFiltro];
  mostrarPeliculas(resultados);
})

// * Función para limpiar filtros
botonLimpiarFiltros.addEventListener("click", () => {
  inputMinimo.value = "";
  inputMaximo.value = "";
  selectDirector.selectedIndex = 0;
  selectProductor.selectedIndex = 0;
  mostrarPeliculas(peliculas);
})

// * Función mostrar Overlay usando boton
// btnPersonajes.addEventListener("click", (event) => {
//   const peliculaId = event.currentTarget.getAttribute("data-id"); // Obtener el ID de la película
//   mostrarPersonajes(peliculaId); // mostrar por ID
// });

// * Función cerrar el overlay si se hace clic fuera del contenedor
contenedorTarjeta.addEventListener("click", (event) => {
  if (event.target === contenedorTarjeta) {
    tarjetaPelicula.classList.remove("active");
  }
});



// ! Sección POPout!
// * Función mostrar personajes

const mostrarPersonajes = (peliculaId, tarjetaPelicula) => {

  const pelicula = obtenerPeliculaPorId(data, peliculaId)
  //* Agregar elementos HTML
  // Crear el contenedor de overlay
  const overlayContenedor = document.createElement("article");
  overlayContenedor.classList.add("overlay-contenedor-personajes");

  // Agregar botón de anterior
  const botonAnterior = document.createElement("i");
  botonAnterior.classList.add("fa-solid", "fa-angle-left");
  botonAnterior.id = "boton-anterior";
  overlayContenedor.appendChild(botonAnterior);

  // Crear el carrusel de personajes
  const carruselPersonajes = document.createElement("div");
  carruselPersonajes.classList.add("carrusel-personajes");
  overlayContenedor.appendChild(carruselPersonajes);

  
  pelicula.people.forEach(personaje => {
    // Crear la tarjeta de personaje
    const tarjetaPersonaje = document.createElement("div");
    tarjetaPersonaje.classList.add("tarjeta-personaje");
  
    // Crear el contenedor de la imagen
    const contenedorImg = document.createElement("div");
    contenedorImg.classList.add("contenedor-img-personaje");
  
    // Crear la imagen
    const imgPersonaje = document.createElement("img");
    imgPersonaje.src = personaje.img;
    imgPersonaje.alt = personaje.name;
  
    // Agregar la imagen al contenedor de imagen
    contenedorImg.appendChild(imgPersonaje);
  
    // Crear el contenedor de información del personaje
    const contenedorInfoPersonaje = document.createElement("div");
    contenedorInfoPersonaje.classList.add("contenedor-info-personaje");
  
    // Crear el contenedor del nombre
    const contenedorNombre = document.createElement("div");
    contenedorNombre.classList.add("contenedor-nombre");
  
    // Crear el elemento h3 del nombre
    const nombrePersonaje = document.createElement("h3");
    nombrePersonaje.id = "nombre";
    nombrePersonaje.textContent = personaje.name;
  
    // Agregar el nombre al contenedor del nombre
    contenedorNombre.appendChild(nombrePersonaje);
  
    // Crear el contenedor de información del personaje
    const infoPersonaje = document.createElement("div");
    infoPersonaje.classList.add("info-personaje");
  
    // Crear y configurar los elementos de información
    const infoElements = [
      { label: "Gender", value: personaje.gender },
      { label: "Age", value: personaje.age },
      { label: "Eye color", value: personaje.eye_color },
      { label: "Hair color", value: personaje.hair_color },
      { label: "Species", value: personaje.specie }
    ];
  
    infoElements.forEach(info => {
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info");
  
      const infoSpan = document.createElement("span");
      infoSpan.textContent = info.label;
  
      const infoP = document.createElement("p");
      infoP.textContent = info.value;
  
      infoDiv.appendChild(infoSpan);
      infoDiv.appendChild(infoP);
      infoPersonaje.appendChild(infoDiv);
    });
  
    // Agregar los elementos creados a la tarjeta de personaje
    tarjetaPersonaje.appendChild(contenedorImg);
    tarjetaPersonaje.appendChild(contenedorInfoPersonaje);
    contenedorInfoPersonaje.appendChild(contenedorNombre);
    contenedorInfoPersonaje.appendChild(infoPersonaje);
  
    // Agregar la tarjeta de personaje al carrusel
    carruselPersonajes.appendChild(tarjetaPersonaje);
  });
  
  // Agregar botón de siguiente
  const botonSiguiente = document.createElement("i");
  botonSiguiente.classList.add("fa-solid", "fa-angle-right");
  botonSiguiente.id = "boton-siguiente";
  overlayContenedor.appendChild(botonSiguiente);
  
  // Agregar elementos al contenedor de tarjetas
  tarjetaPelicula.appendChild(overlayContenedor);
};

// para eso debo hacer una función (dataPersonajes())
// que sea capaz de extraer la información de personajes de la película específica
// Luego generar los Divs según la maqueta. 
// Mi duda era sobre cómo ibamos a generar la tarjeta de personajes por película, pero
// si utilizamos la información (ID de película) sería facil!

// * Función generar Lugares:

// * FUnción Generar Vehículos:

// * Función Carrucel 
// CARRUSEL
// function inicializarCarrusel() {
//   const carruselPersonajes = document.querySelector(".carrusel-personajes");
//   console.log(carruselPersonajes)
//   const botonSiguiente = document.getElementById("boton-siguiente");
//   console.log(botonSiguiente)
//   const botonAnterior = document.getElementById("boton-anterior");
//   console.log(botonAnterior)
//   // Agregar listener al botón Siguiente
//   botonSiguiente.addEventListener("click", function () {
//     const tarjetasPersonajes = carruselPersonajes.querySelectorAll(
//       ".tarjeta-personaje"
//     );
//     const arrayTarjetas = [...tarjetasPersonajes];

//     const siguiente = arrayTarjetas.shift();
//     arrayTarjetas.push(siguiente);

//     arrayTarjetas.forEach((x) => {
//       carruselPersonajes.appendChild(x);
//     });

//     cambiaPagina(arrayTarjetas);
//   });

//   botonAnterior.addEventListener("click", function () {
//     const tarjetasPersonajes = carruselPersonajes.querySelectorAll(
//       ".tarjeta-personaje"
//     );
//     const arrayTarjetas = [...tarjetasPersonajes];

//     const atras = arrayTarjetas.pop();
//     arrayTarjetas.unshift(atras);

//     arrayTarjetas.forEach((x) => {
//       carruselPersonajes.appendChild(x);
//     });

//     cambiaPagina(arrayTarjetas);
//   });

//   // Función para cambiar la página del carrusel
//   function cambiaPagina(array) {
//     const posicionActual = 0;
//     const siguientePos = 1;

//     for (let i = 0; i < array.length; i++) {
//       array[i].style.display = "none";
//     }

//     array[posicionActual].style.display = "flex";
//     array[siguientePos].style.display = "flex";
//   }
// }
