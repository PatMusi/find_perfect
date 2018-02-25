var fs = require('fs'),
	createHTML = require('create-html'),
	open = require('open'),
	sortBy = require('sort-by');

var domain = require('./config.js').mapDomain;

var obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));

var eliteList = [],
	ivList = [],
	levelList = [];

var eliteHtml = '',
	ivHtml = '',
	levelHtml = '';

for (var i = 0; i < obj.pokemons.length; i++) {
	var level = getPokemonLevel(obj.pokemons[i].cp_multiplier);
	var iv = obj.pokemons[i].individual_attack + obj.pokemons[i].individual_defense + obj.pokemons[i].individual_stamina;
	if (iv >= 41 && level >= 30) {
		eliteList.push({
			iv: Math.round((iv/45)*100),
			level: level,
			name: obj.pokemons[i].pokemon_name,
			latitude: obj.pokemons[i].latitude,
			longitude: obj.pokemons[i].longitude
		});
	}
	else if (iv >= 41) {
		ivList.push({
			iv: Math.round((iv/45)*100),
			level: level,
			name: obj.pokemons[i].pokemon_name,
			latitude: obj.pokemons[i].latitude,
			longitude: obj.pokemons[i].longitude
		});
	}
	else if (level >= 30) {
		levelList.push({
			iv: Math.round((iv/45)*100),
			level: level,
			name: obj.pokemons[i].pokemon_name,
			latitude: obj.pokemons[i].latitude,
			longitude: obj.pokemons[i].longitude
		});
	}
	else {}
}

eliteList.sort(sortBy('-iv', '-level'));
ivList.sort(sortBy('-iv', '-level'));
levelList.sort(sortBy('-iv','-level'));

for (var i = 0; i < eliteList.length; i++) {
	eliteHtml = eliteHtml + '<div>' + eliteList[i].iv + '%, level ' + eliteList[i].level + ' ' + eliteList[i].name + ' at <a href="' + domain + '/#' + eliteList[i].latitude + ',' + eliteList[i].longitude + ',18z" target="_blank">' + domain + '/#' + eliteList[i].latitude + ',' + eliteList[i].longitude + ',18z</a></div>';
}

for (var i = 0; i < ivList.length; i++) {
	ivHtml = ivHtml + '<div>' + ivList[i].iv + '%, level ' + ivList[i].level + ' ' + ivList[i].name + ' at <a href="' + domain + '/#' + ivList[i].latitude + ',' + ivList[i].longitude + ',18z" target="_blank">' + domain + '/#' + ivList[i].latitude + ',' + ivList[i].longitude + ',18z</a></div>';
}

for (var i = 0; i < levelList.length; i++) {
	levelHtml = levelHtml + '<div>' + levelList[i].iv + '%, level ' + levelList[i].level + ' ' + levelList[i].name + ' at <a href="' + domain + '/#' + levelList[i].latitude + ',' + levelList[i].longitude + ',18z" target="_blank">' + domain + '/#' + levelList[i].latitude + ',' + levelList[i].longitude + ',18z</a></div>';
}

var html = createHTML({
	title: 'Notable Pokemon',
	body: '<h1>Elite List</h1>' + eliteHtml + '<h2>High IV List</h2>' + ivHtml + '<h2>High Level List</h2>' + levelHtml
});

fs.writeFile('index.html', html, function(err) {
	if (err) {
		console.log(err);
	}
});

open('./index.html');

function getPokemonLevel(cpMultiplier) {
    if (cpMultiplier < 0.734) {
        var pokemonLevel = (58.35178527 * cpMultiplier * cpMultiplier -
        2.838007664 * cpMultiplier + 0.8539209906)
    } else {
        pokemonLevel = 171.0112688 * cpMultiplier - 95.20425243
    }
    pokemonLevel = (Math.round(pokemonLevel) * 2) / 2

    return pokemonLevel
}