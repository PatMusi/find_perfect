var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));

for (var i = 0; i < obj.pokemons.length; i++) {
	if (obj.pokemons[i].individual_attack + obj.pokemons[i].individual_defense + obj.pokemons[i].individual_stamina >= 41) {
		console.log(Math.round(((obj.pokemons[i].individual_attack + obj.pokemons[i].individual_defense + obj.pokemons[i].individual_stamina)/45)*100) + '% ' + obj.pokemons[i].pokemon_name + ' at ' + obj.pokemons[i].latitude + ',' + obj.pokemons[i].longitude);
	}
}