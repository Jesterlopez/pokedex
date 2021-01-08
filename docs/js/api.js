document.addEventListener('DOMContentLoaded', () => {
    const idRamdom = randomNumber(1, 300);
    fetchData(idRamdom);
})


const deleteCaracter = (str) => {
    return str.replace(/-/, " ");

}


const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}



const typeImgData = [{
        name: 'normal',
        url: '..docs/img/type/normal.svg'
    },
    {
        name: 'dark',
        url: '..docs/img/type/dark.svg'
    },
    {
        name: 'dragon',
        url: '..docs/img/type/dragon.svg'
    },
    {
        name: 'bug',
        url: '..docs/img/type/bug.svg'
    },
    {
        name: 'electric',
        url: '..docs/img/type/electric.svg'
    },
    {
        name: 'fairy',
        url: '..docs/img/type/fairy.svg'
    },
    {
        name: 'fighting',
        url: '..docs/img/type/fighting.svg'
    },
    {
        name: 'fire',
        url: '..docs/img/type/fire.svg'
    },
    {
        name: 'flying',
        url: '..docs/img/type/flying.svg'
    },
    {
        name: 'ghost',
        url: '..docs/img/type/ghost.svg'
    },
    {
        name: 'ground',
        url: '..docs/img/type/ground.svg'
    },
    {
        name: 'grass',
        url: '..docs/img/type/grass.svg'
    },
    {
        name: 'ice',
        url: '..docs/img/type/ice.svg'
    },
    {
        name: 'normal',
        url: '..docs/img/type/normal.svg'
    },
    {
        name: 'poison',
        url: '..docs/img/type/poison.svg'
    },
    {
        name: 'psychic',
        url: '..docs/img/type/psychic.svg'
    },
    {
        name: 'rock',
        url: '..docs/img/type/rock.svg'
    },
    {
        name: 'steel',
        url: '..docs/img/type/steel.svg'
    },
    {
        name: 'water',
        url: '..docs/img/type/water.svg'
    }
]


const fetchData = async(idPokemon) => {
    try {

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        const data = await res.json();

        //creo un objeto con los datos necesarios.

        const pokemonData = {
            id: data.order,
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            height: data.height,
            weight: data.weight,
            exp: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
            ability: data.abilities[0].ability.name,
            move1: data.moves[0].move.name,
            move2: data.moves[1].move.name,
            move3: data.moves[2].move.name,
            types: data.types[0]

        }

        // console.log(typeImgData)


        function value(img) {
            return img.name === pokemonData.types.type.name;
        }

        console.log(pokemonData.types.type.name)
        const typeName = typeImgData.find(value)
        const urlImg = typeName.url;

        // console.log(urlImg)

        let statPokemonData = [
            pokemonData.hp,
            pokemonData.attack,
            pokemonData.defense,
            pokemonData.speed,
            pokemonData.specialAttack,
            pokemonData.specialDefense
        ]


        showPokemon(pokemonData, statPokemonData, urlImg)
        console.log(data)


        //obtener tipo de pokemon de la Api

        for (let i = 0; i < pokemonData.types.length; i++) {
            const type = pokemonData.types[i].type.name;
            console.log(type)
        }

    } catch (error) {
        console.log('Error')
        console.log(error)
    }
}


const showPokemon = (pokemon, stat, urlImg) => {
    // console.log(pokemon)

    const content = document.getElementById('template-content').content;
    const containerContent = document.getElementById('home');

    const clone = content.cloneNode(true)
    const fragment = document.createDocumentFragment();

    clone.querySelector('.pokemon-img').setAttribute('src', pokemon.img);
    clone.querySelector('#height').textContent = pokemon.height + 'm';
    clone.querySelector('#weight').textContent = pokemon.weight + 'kg';
    clone.querySelector('.info__pokemon-exp').textContent = pokemon.exp + 'exp';
    clone.querySelector('.info__pokemon-name').textContent = pokemon.name;
    clone.querySelector('.card-pokemon-number').textContent = 'N°' + pokemon.id;
    clone.querySelector('.pokemon-moves__ability').innerHTML = `
                <div class="pokemon-special-move ability">${deleteCaracter(pokemon.ability)}
                </div>
    `;

    clone.querySelector('.pokemon-moves__moves').innerHTML = `
                <div class="pokemon-special-move move">
                ${deleteCaracter(pokemon.move1)}
                </div>
                <div  class="pokemon-special-move move">
                ${deleteCaracter(pokemon.move2)}
                </div>
                <div  class="pokemon-special-move move">
                ${deleteCaracter(pokemon.move3)}
                </div>`;
    clone.querySelector('.info__pokemon-type').innerHTML = `
    <img src="${urlImg}" alt="">
    `;

    const buttonGenerate = clone.querySelector('#button-generate');



    fragment.appendChild(clone);
    containerContent.appendChild(fragment);


    buttonGenerate.addEventListener('click', () => {
        location.reload();
    })

    // console.log(stat)

    const barStat = document.querySelectorAll('.progress-bar');
    const barNumber = document.querySelectorAll('#progress-bar-number');


    //styles css carg
    setTimeout(() => {
        const values = stat.map((x) => {
            return x + '%'
        });


        barNumber.forEach((number, index) => {
            number.textContent = stat[index]

        });


        barStat.forEach((progress, index) => {
            progress.style.width = values[index];
        });
    }, 500);
}