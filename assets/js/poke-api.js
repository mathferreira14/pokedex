const pokeApi = {}

function convertPoke(pokemonDetail) {
    const pokemon = new Pokemon()
    let pokeId = pokemonDetail.id
    let idTransform = pokeId.toString().padStart(4, '0')
    pokemon.number = idTransform
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    const stats = pokemonDetail.stats.map((stats => stats.base_stat))
    pokemon.hp = stats [0]
    pokemon.atk = stats [1]
    pokemon.def = stats [2]
    pokemon.satk = stats [3]
    pokemon.sdef = stats [4]
    pokemon.spd = stats [5]
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
    pokemon.weight = pokemonDetail.weight
    pokemon.height = pokemonDetail.height
    const abilities = pokemonDetail.abilities.map((abilities => abilities.ability.name))
    pokemon.ability1 = abilities[0]
    pokemon.ability2 = abilities[1]
    
    pokemon.exp = pokemonDetail.base_experience
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPoke)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
