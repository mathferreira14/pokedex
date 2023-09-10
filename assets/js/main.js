const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 4
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     
            </div>
            
           
            <div id="pokeStatsContainer">
            <h1>${pokemon.name} stats</h1>
            <ol class="pokeStatsRef">
            <li>HP:</li>
            <li>ATK:</li>
            <li>DEF:</li>
            <li>SP.ATK:</li>
            <li>SP.DEF:</li>
            <li>SPD:</li>
            <li>TOTAL:</li>
            <li>WEIGHT:</li>
            <li>HEIGHT:</li>
            <li>BASE EXP:</li>
            <li>ABILITIES:</li>
            </ol>
            <ol class="pokeStatsValue">
            <li>${pokemon.hp}</li>
            <li>${pokemon.atk}</li>
            <li>${pokemon.def}</li>
            <li>${pokemon.satk}</li>
            <li>${pokemon.sdef}</li>
            <li>${pokemon.spd}</li>
            <li>${pokemon.hp + pokemon.atk + pokemon.def + pokemon.satk + pokemon.sdef + pokemon.spd}
            <li>${pokemon.weight/10}kg</li>
            <li>${pokemon.height/10}m</li>
            <li>${pokemon.exp}</li>
            <li style="text-transform: capitalize;">${pokemon.ability1}</li>
            <li style="text-transform: capitalize;">${pokemon.ability2}</li>
            </ol>           
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})