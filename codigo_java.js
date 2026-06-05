let imagenes = [
    {
    "url": "imagenes/botones_servicios/boton_servicios_proyectos_fortalecimiento_ordenamiento_territorial_urbano.png",
    "descripcion": "Proyectos para Fortalecimiento del Ordenamiento Territorial y Urbano",
    "link": "Mas informacion",
    "url1": "imagenes/ventana_servicios_1.png",
},

    {
        "url": "imagenes/botones_servicios/boton_servicios_estudios_mercado.png",
        "descripcion": "Estudios de Mercado Basados en Sistemas de Información Geográfica",
        "link": "Mas informacion",
        "url1": "imagenes/ventana_estudios_de_mercado.png"
    },

    {
        "url": "imagenes/botones_servicios/boton_servicios_estudios_transporte_movilidad.png",
        "descripcion": "Estudios de Transporte y Movilidad",
        "link": "Mas informacion",
        "url1": "imagenes/ventana_estudios_de_transporte_y_movilidad.png"
    },

    {
        "url": "imagenes/botones_servicios/boton_servicios_estudios_estadisticos.png",
        "descripcion": "Estudios Estadisticos",
        "link": "Mas informacion",
        "url1": "imagenes/ventana_estudios_estadisticos.png"
    },

    {
    "url": "imagenes/botones_servicios/boton_servicios_cartografia.png",
    "descripcion": "Cartografía",
    "link": "Mas informacion",
    "url1": "imagenes/ventana_cartografia.png"
    },

    {
    "url": "imagenes/botones_servicios/boton_servicios_estudios_sectoriales.png",
    "descripcion": "Estudios Sectoriales",
    "link": "Mas informacion",
    "url1": "imagenes/ventana_estudios_sectoriales.png"
    },

    {
    "url": "imagenes/botones_servicios/boton_servicios_levantamientos.png",
    "descripcion": "Levantamientos",
    "link": "Mas informacion",
    "url1": "imagenes/ventana_levantamientos.png"
    },


    {
    "url": "imagenes/botones_servicios/boton_servicios_merketing_digital_urbano.png",
    "descripcion": "Marketing Digital Urbano",
    "link": "Mas informacion",
    "url1": "imagenes/ventana_marketing_digital_urbano.png"
    },


    {
"url": "imagenes/botones_servicios/boton_servicios_otros_servicios_ordenamiento_territorial_desarrollo_urbano.png",
"descripcion": "Otros Servicios de Ordenamiento Territorial y Desarrollo Urbano",
"link": "Mas informacion",
"url1": "imagenes/ventana_otros_servicios_ordenamiento_territorial_desarrollo_urbano.png"
},


    {
"url": "imagenes/botones_servicios/boton_servicios_proyectos_arquitectonicos_urbanos.png",
"descripcion": "Proyectos Arquitectónicos Urbanos",
"link": "Mas informacion",
"url1": "imagenes/ventana_proyectos_arquitectonicos_urbanos.png"
},

{
"url": "imagenes/botones_servicios/boton_servicios_proyectos_carreteros.png",
"descripcion": "Proyectos Carreteros",
"link": "Mas informacion",
"url1": "imagenes/ventana_proyectos_carreteros.png"
},


{
"url": "imagenes/botones_servicios/boton_servicios_proyectos_fortalecimiento_administracion_gobierno_municipal.png",
"descripcion": "Proyectos de Fortalecimiento a la Adminstración del Gobierno Municipal",
"link": "Mas informacion",
"url1": "imagenes/ventana_proyectos_fortalecimiento_administración_gobierno_municipal.png"
},

{
"url": "imagenes/botones_servicios/boton_servicios_proyectos_eficiencia_presupuestal.png",
"descripcion": "Proyectos para la Eficiencia Presupuestal",
"link": "Mas informacion",
"url1": "imagenes/ventana_proyectos_eficiencia_presupuestal.png"
},

{
"url": "imagenes/botones_servicios/boton_servicios_proyectos_gestion_recursos_extraordinarios.png",
"descripcion": "Proyectos para la Gestión de Recursos Extraordinarios",
"link": "Mas informacion",
"url1": "imagenes/ventana_proyectos_gestión_recursos_extraordinarios.png",
},



]

let atras = document.getElementById('atras');
let adelate = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let link = document.getElementById('link');
let imagen2 = document.getElementById('img2');
let actual = 0
positionCarrusel()

atras.addEventListener('click', function(){
    actual -=1 

    if (actual == -1){
        actual = imagenes.lenght - 1
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="imagen1"></img> `
    texto.innerHTML = `
    <p>${imagenes[actual].descripcion}</p>
    `
    link.innerHTML = `<a>${imagenes[actual].link}</a>`

imagen2.innerHTML = ` <img class="img2" src="${imagenes[actual].url1}"</img>`
positionCarrusel()
})


adelate.addEventListener('click', function(){
    actual +=1 

    if (actual == imagenes.length){
        actual = 0
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="imagen1"></img> `
    texto.innerHTML = `
    <p>${imagenes[actual].descripcion}</p></>
`
link.innerHTML = `<a>${imagenes[actual].link}</a>`

imagen2.innerHTML = ` <img class="img2" src="${imagenes[actual].url1}" alt="imagen1"></img>`

positionCarrusel()

})

function positionCarrusel(){
    puntos.innerHTML = ""
    for (var i = 0; i <imagenes.length; i++){
        if(i == actual){
            puntos.innerHTML += '<p class = "bold">.<p>'
        }
        else {
            puntos.innerHTML += '<p>.<p>'
        }
    }
}

// Sidebar toggle
var hamburger = document.getElementById('header__div__button');
var sidebar = document.querySelector('.div__header__nav');
var overlay = document.getElementById('sidebar-overlay');
var header = document.querySelector('.header__body');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
      // Debug: Verificar el valor del href
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

// Cerrar sidebar al navegar por hash (funciona en movil sin interferir)
window.addEventListener('hashchange', closeSidebar);