
const API_URL = "https://randomuser.me/api/?results=100";
const KEY_LISTA = "identificaciones_lista";    
const KEY_FAVORITOS = "identificaciones_favoritos"; 



async function obtenerListaNueva() {
  const respuesta = await axios.get(API_URL);
  const lista = respuesta.data.results;
  localStorage.setItem(KEY_LISTA, JSON.stringify(lista));
  return lista;
}


function obtenerListaGuardada() {
  const datos = localStorage.getItem(KEY_LISTA);
  return datos ? JSON.parse(datos) : null;
}


function obtenerUsuarioPorId(id) {
  const lista = obtenerListaGuardada();
  if (!lista) return null;
  return lista[id] || null;
}


function obtenerUsuarioPorUuid(uuid) {
  const lista = obtenerListaGuardada();
  if (lista) {
    const encontrado = lista.find(u => u.login.uuid === uuid);
    if (encontrado) return encontrado;
  }
  const favoritos = obtenerFavoritosObjeto();
  return favoritos[uuid] || null;
}


function obtenerFavoritosObjeto() {
  const datos = localStorage.getItem(KEY_FAVORITOS);
  return datos ? JSON.parse(datos) : {};
}


function guardarFavoritosObjeto(favoritos) {
  localStorage.setItem(KEY_FAVORITOS, JSON.stringify(favoritos));
}


function esFavorito(uuid) {
  const favoritos = obtenerFavoritosObjeto();
  return Boolean(favoritos[uuid]);
}


function alternarFavorito(user) {
  const favoritos = obtenerFavoritosObjeto();
  const uuid = user.login.uuid;

  if (favoritos[uuid]) {
    delete favoritos[uuid];
    guardarFavoritosObjeto(favoritos);
    return false;
  } else {
    favoritos[uuid] = user;
    guardarFavoritosObjeto(favoritos);
    return true;
  }
}

function obtenerListaFavoritos() {
  const favoritos = obtenerFavoritosObjeto();
  return Object.values(favoritos);
}