const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(649)
  .fill()
  .map((_, index) => fetch(getPokemonUrl(index + 1))
    .then(response => response.json()))

const generateHTML = pokemons => pokemons
  .reduce((acumulator, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)
    const URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
    acumulator += `
        <li class="card ${types[0]}">
        <img class="card-image" alt="${pokemon.name}" src="${URL}${pokemon.id}.png"/> 
          <h2 classa="card-title">${pokemon.id}. ${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(' | ')}</p>
        </li>
      `
    return acumulator
  }, '')


const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromises()
Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)

