var fs = require('fs'),
	createHTML = require('create-html'),
	open = require('open');

var domain = require('./config.js').mapDomain;

var obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));

var pokeListHtml = '';

for (var i = 0; i < obj.pokemons.length; i++) {
	if (obj.pokemons[i].individual_attack + obj.pokemons[i].individual_defense + obj.pokemons[i].individual_stamina >= 41) {
		pokeListHtml = pokeListHtml + '<div>' + Math.round(((obj.pokemons[i].individual_attack + obj.pokemons[i].individual_defense + obj.pokemons[i].individual_stamina)/45)*100) + '% ' + obj.pokemons[i].pokemon_name + ' at <a href="' + domain + '/#' + obj.pokemons[i].latitude + ',' + obj.pokemons[i].longitude + ',18z" target="_blank">' + domain + '/#' + obj.pokemons[i].latitude + ',' + obj.pokemons[i].longitude + ',18z</a></div>';
	}
}

var html = createHTML({
	title: 'High IV Pokemon Locations',
	body: pokeListHtml
});

fs.writeFile('index.html', html, function(err) {
	if (err) {
		console.log(err);
	}
});


open('./index.html');