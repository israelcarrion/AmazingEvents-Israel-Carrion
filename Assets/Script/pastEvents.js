function tarjetero(listaTarjetas) {
  let tarjetero = "";
  listaTarjetas.forEach( tarjeta => tarjetero += `
    <div class="card mb-3">
      <img src="${tarjeta.image}" class="card-img-top" alt="food">
      <div class="card-body d-flex flex-column ">
        <h5 class="tituloTarjetas">${tarjeta.name}</h5>
        <p class="card-text">${tarjeta.description}</p>
      </div>
      <div class="card-body d-flex justify-content-between align-items-center">
        <p class="precio"> $ ${tarjeta.price}</p>
        <a href="../Pages/details.html?parameter=${tarjeta._id}" class="botonDetalles">Details</a>
      </div>
    </div>`);
  return tarjetero;
};

function filtroFecha(tarjetasSinFiltro, fecha) {
  let aux = tarjetasSinFiltro.filter( tarjeta => tarjeta.date < fecha);
  return aux;
};

function insertarHtml(totalInfo, id) {
  document.getElementById(id).innerHTML = totalInfo;
};

let tarjetasFiltroFecha = filtroFecha(data.events, data.currentDate);

insertarHtml( tarjetero( tarjetasFiltroFecha ), "cajaTresPast" );

/*-------------------------------CHECKBOXES--------------------------------*/
let listaCategorias = new Set(data.events.map(tarjeta => tarjeta.category));

function estructuraCat(lista) {
  let categoriaHtml = "";
  lista.forEach(categoria => categoriaHtml += `
    <div class="d-inline-flex px-1">
      <input class="form-check-input mx-2" type="checkbox" id="${categoria.replace(" ", "-")}" value="${categoria}">
      <label class="form-check-label" for="${categoria.replace(" ", "-")}">${categoria}</label>
    </div>`);
  return categoriaHtml;
}

insertarHtml( estructuraCat( listaCategorias ), "checkBoxes" );

/*-------------------------FILTRO-CHECKBOXES-------------------------------*/
let $checkbox = document.getElementById("checkBoxes");

$checkbox.addEventListener( "change", filtrosCruzados );

function filtroCheck(array){
    let checkList = document.querySelectorAll("input[type='checkbox']:checked");
    let arrayCheck = Array.from(checkList);
    let valoresCheck = arrayCheck.map( input => input.value)
    let filtradosCheck = [];
    valoresCheck.forEach( e => {
        array.forEach(tarjeta => {
            if(tarjeta.category.includes(e)){
                filtradosCheck.push(tarjeta);
            };
        });
    });
    if(filtradosCheck.length == 0){
        filtradosCheck =  tarjetasFiltroFecha ;
    };
    return filtradosCheck;
}; 

/*-------------------------FILTRO-SEARCH-------------------------------*/
let $search = document.getElementById("busquedaIndex");
let $lupa = document.getElementById("lupa");

$lupa.addEventListener("click", (e) => {
    e.preventDefault();
    filtrosCruzados()
    $search.value = "";
});

function filtroSearch(array, input){
    let tarjetaFiltrada = array.filter(tarjeta => tarjeta.name.toLowerCase().includes(input.toLowerCase()))
    return tarjetaFiltrada;
};

/*-------------------------FILTROS-CRUZADOS-------------------------------*/
function filtrosCruzados(){
    let filtroTotal = filtroSearch( filtroCheck(tarjetasFiltroFecha), $search.value );
    insertarHtml( tarjetero(filtroTotal), "cajaTresPast");
};