// settings

const musicAudio = document.querySelector('.music-audio')
const generateAudio = document.querySelector('.generate-audio')
const fightAudio = document.querySelector('.fight-audio')
const resultsAudio = document.querySelector('.results-audio')
const musicBtn = document.querySelector('.music-btn')
const musicStopBtn = document.querySelector('.stop-music-btn')
const losePopup = document.querySelector('.lose-popup')
const shadowAfterLose = document.querySelector('.shadow-after-lose')
const restartBtn = document.querySelector('.restart-btn')

const startMusic = () => {
	musicAudio.volume = 0.8
	musicAudio.play()
	musicBtn.classList.add('active-btn')
	musicStopBtn.classList.remove('active-btn')
}

const stopMusic = () => {
	musicAudio.pause()
	musicBtn.classList.remove('active-btn')
	musicStopBtn.classList.add('active-btn')
}

const reloadPage = () => {
	location.reload()
}

musicBtn.addEventListener('click', startMusic)
musicStopBtn.addEventListener('click', stopMusic)
restartBtn.addEventListener('click', reloadPage)

// choose player

let currentPlayers = players
const welcomePopup = document.querySelector('.welcome-popup')
const shadow = document.querySelector('.shadow')
const charactersArea = document.querySelector('.characters-area')
const choosenPlayerArea = document.querySelector('.choosen-player-area')

const closePopup = () => {
	welcomePopup.style.display = 'none'
	shadow.style.display = 'none'
}

const choosePlayer = e => {
	setTimeout(closePopup, 3000)
	const selectedId = e.target.parentElement.attributes[0]
	const selectedName = e.target.parentElement.previousElementSibling.outerText
	const selectedImg =
		e.target.parentElement.previousElementSibling.previousElementSibling.firstChild.attributes[0].value
	const selectedCardPlayer = e.target.parentElement.parentElement.children[0]
	const selectedNamePlayer = e.target.parentElement.parentElement.children[1]

	const newAvatar = document.createElement('div')
	newAvatar.innerHTML = `
	<img src="${selectedImg}" alt="player-avatar" class="choosen-player-img">
            <p class="choosen-player-name" data-id="${selectedId}">${selectedName}</p>
	`
	choosenPlayerArea.append(newAvatar)

	selectedCardPlayer.style.transform = 'scale(1.1)'
	selectedCardPlayer.classList.add('character-area-animation')
	selectedCardPlayer.classList.add('active-player')
	selectedNamePlayer.classList.add('player-name-animation')
	selectedNamePlayer.style.transform = 'scale(1.1)'

	if (selectedCardPlayer.classList.contains('active-player')) {
		e.target.parentElement.disabled = true
		generateAudio.play()
		chooseBtns.forEach(btn => {
			btn.disabled = true
		})
	}
}

const generateCharacter = player => {
	player = currentPlayers
	for (let i = 0; i < player.length; i++) {
		const newCharacter = document.createElement('div')
		newCharacter.classList.add('character-area')
		newCharacter.innerHTML = `
	<div><img src="${player[i].image}" alt="player-image"></div>
                <p class="player-name">${player[i].name}</p>
                <button data-id="${player[i].id}" class="choose-character-btn"><img src="./img/pokeball.webp" alt="pokeball-button" class="pokeball"></button>
	`
		charactersArea.append(newCharacter)
	}
}

document.onload = generateCharacter()

const chooseBtns = document.querySelectorAll('.choose-character-btn')

chooseBtns.forEach(btn => {
	btn.addEventListener('click', choosePlayer)
})

// your pokemon variabels

const yourCard = document.querySelector('.your-card')
const opponentCard = document.querySelector('.opponent-card')
const experiencesCard = document.querySelector('.experiences')
const typeCard = document.querySelector('.type')
const pokemonImg = document.querySelector('.pokemon-img')
const pokemonName = document.querySelector('.pokemon-name')
const firstAbilities = document.querySelector('.first-abilities')
const secondAbilities = document.querySelector('.second-abilities')
const attackCard = document.querySelector('.attack-stats')
const defenseCard = document.querySelector('.defense-stats')
const hpCard = document.querySelector('.hp-stats')

// opponent pokemon variabels

const experiencesCardOpponent = document.querySelector('.experiences-opponent')
const typeCardOpponent = document.querySelector('.type-opponent')
const pokemonImgOpponent = document.querySelector('.pokemon-img-opponent')
const pokemonNameOpponent = document.querySelector('.pokemon-name-opponent')
const firstAbilitiesOpponent = document.querySelector('.first-abilities-opponent')
const secondAbilitiesOpponent = document.querySelector('.second-abilities-opponent')
const attackCardOpponent = document.querySelector('.attack-stats-opponent')
const defenseCardOpponent = document.querySelector('.defense-stats-opponent')
const hpCardOpponent = document.querySelector('.hp-stats-opponent')

// comparision card variabels

let $nameYourPokemon = document.querySelector('.name-your-pokemon')
let $nameOpponentPokemon = document.querySelector('.name-opponent-pokemon')
const quantityYourAttack = document.querySelector('.quantity-your-attack')
const quantityOpponentAttack = document.querySelector('.quantity-opponent-attack')
const quantityYourDefense = document.querySelector('.quantity-your-defense')
const quantityOpponentDefense = document.querySelector('.quantity-opponent-defense')
const quantityYourHealth = document.querySelector('.quantity-your-health')
const quantityOpponentHealth = document.querySelector('.quantity-opponent-health')
let $yourSummary = document.querySelector('.your-summary')
let $opponentSummary = document.querySelector('.opponent-summary')
const winner = document.querySelector('.winner')

// buttons variabels

const generateOpponentBtn = document.querySelector('.generate-opponent-btn')
const generateBtn = document.querySelector('.generate-btn')
const fightBtn = document.querySelector('.fight-btn')

// amount battles & exp & buttons disabled
const numberOfBattles = document.querySelector('.number-of-battles')
const numberOfExp = document.querySelector('.number-of-exp')
let $amountBattles = []
let amountExp = []

let $buttonCount = 0
let $buttonCountValue = []

let $buttonCountOpponent = 0
let $buttonCountValueOpponent = []

let $buttonCountFight = 0
let $buttonCountFightValue = []

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const generateYourCardAuto = () => {
	let id = Math.floor(Math.random() * 150 + 1)
	APIURL = URL + id

	axios.get(APIURL).then(res => {
		experiencesCard.textContent = res.data.base_experience + ' xp'
		typeCard.textContent = res.data.types[0].type.name
		imgSrc = res.data.sprites.other.dream_world.front_default
		pokemonImg.setAttribute('src', imgSrc)
		pokemonName.textContent = res.data.name
		firstAbilities.textContent = res.data.abilities[0].ability.name
		if (res.data.abilities.length == 1) {
			secondAbilities.textContent = 'Secret-Power'
		} else if (res.data.abilities.length !== 1) {
			secondAbilities.textContent = res.data.abilities[1].ability.name
		}
		attackCard.textContent = res.data.stats[1].base_stat
		defenseCard.textContent = res.data.stats[2].base_stat
		hpCard.textContent = res.data.stats[0].base_stat
		$nameYourPokemon.textContent = res.data.name
		quantityYourAttack.textContent = res.data.stats[1].base_stat
		quantityYourDefense.textContent = res.data.stats[2].base_stat
		quantityYourHealth.textContent = res.data.stats[0].base_stat
		$yourSummary.textContent =
			parseInt(quantityYourAttack.textContent) +
			parseInt(quantityYourDefense.textContent) +
			parseInt(quantityYourHealth.textContent)

		// add animation

		pokemonImg.classList.add('animated-img')
		attackCard.classList.add('animated-stats')
		defenseCard.classList.add('animated-stats')
		hpCard.classList.add('animated-stats')
		quantityYourAttack.classList.add('animated-stats-comparison')
		quantityYourDefense.classList.add('animated-stats-comparison')
		quantityYourHealth.classList.add('animated-stats-comparison')
		$yourSummary.classList.add('animated-stats-comparison')

		return setTimeout(turnOffAnimation, 4000)
	})
}

const genereteOpponentCardAuto = () => {
	let id2 = Math.floor(Math.random() * 150 + 1)
	APIURL2 = URL + id2

	axios.get(APIURL2).then(res => {
		experiencesCardOpponent.textContent = res.data.base_experience + ' xp'
		typeCardOpponent.textContent = res.data.types[0].type.name
		imgSrc = res.data.sprites.other.dream_world.front_default
		pokemonImgOpponent.setAttribute('src', imgSrc)
		pokemonNameOpponent.textContent = res.data.name
		firstAbilitiesOpponent.textContent = res.data.abilities[0].ability.name
		if (res.data.abilities.length == 1) {
			secondAbilitiesOpponent.textContent = 'Secret-Power'
		} else if (res.data.abilities.length !== 1) {
			secondAbilitiesOpponent.textContent = res.data.abilities[1].ability.name
		}
		attackCardOpponent.textContent = res.data.stats[1].base_stat
		defenseCardOpponent.textContent = res.data.stats[2].base_stat
		hpCardOpponent.textContent = res.data.stats[0].base_stat
		$nameOpponentPokemon.textContent = res.data.name
		quantityOpponentAttack.textContent = res.data.stats[1].base_stat
		quantityOpponentDefense.textContent = res.data.stats[2].base_stat
		quantityOpponentHealth.textContent = res.data.stats[0].base_stat
		$opponentSummary.textContent =
			parseInt(quantityOpponentAttack.textContent) +
			parseInt(quantityOpponentDefense.textContent) +
			parseInt(quantityOpponentHealth.textContent)

		// add animation

		pokemonImgOpponent.classList.add('animated-img')
		attackCardOpponent.classList.add('animated-stats')
		defenseCardOpponent.classList.add('animated-stats')
		hpCardOpponent.classList.add('animated-stats')
		quantityOpponentAttack.classList.add('animated-stats-comparison')
		quantityOpponentDefense.classList.add('animated-stats-comparison')
		quantityOpponentHealth.classList.add('animated-stats-comparison')
		$opponentSummary.classList.add('animated-stats-comparison')

		return setTimeout(turnOffOpponentAnimation, 4000)
	})
}

const generateYourCard = e => {
	let id3 = Math.floor(Math.random() * 150) + 1
	APIURL3 = URL + id3

	e.target = $buttonCount

	if (e.target) {
		$buttonCount++
		$buttonCountValue.push($buttonCount)
		$buttonCountFightValue = []
		generateAudio.volume = 0.3
		generateAudio.play()

		if ($buttonCountValue.length == 3) {
			generateBtn.disabled = true
			generateBtn.classList.add('btn-disabled')
		}
	}

	axios.get(APIURL3).then(res => {
		experiencesCard.textContent = res.data.base_experience + ' xp'
		typeCard.textContent = res.data.types[0].type.name
		imgSrc = res.data.sprites.other.dream_world.front_default
		pokemonImg.setAttribute('src', imgSrc)
		pokemonName.textContent = res.data.name
		firstAbilities.textContent = res.data.abilities[0].ability.name
		if (res.data.abilities.length == 1) {
			secondAbilities.textContent = 'Secret-Power'
		} else if (res.data.abilities.length !== 1) {
			secondAbilities.textContent = res.data.abilities[1].ability.name
		}
		attackCard.textContent = res.data.stats[1].base_stat
		defenseCard.textContent = res.data.stats[2].base_stat
		hpCard.textContent = res.data.stats[0].base_stat
		$nameYourPokemon.textContent = res.data.name
		quantityYourAttack.textContent = res.data.stats[1].base_stat
		quantityYourDefense.textContent = res.data.stats[2].base_stat
		quantityYourHealth.textContent = res.data.stats[0].base_stat
		$yourSummary.textContent =
			parseInt(quantityYourAttack.textContent) +
			parseInt(quantityYourDefense.textContent) +
			parseInt(quantityYourHealth.textContent)

		pokemonImg.classList.add('animated-img')
		attackCard.classList.add('animated-stats')
		defenseCard.classList.add('animated-stats')
		hpCard.classList.add('animated-stats')
		quantityYourAttack.classList.add('animated-stats-comparison')
		quantityYourDefense.classList.add('animated-stats-comparison')
		quantityYourHealth.classList.add('animated-stats-comparison')
		$yourSummary.classList.add('animated-stats-comparison')

		return setTimeout(turnOffAnimation, 4000)
	})
}

const turnOffAnimation = () => {
	pokemonImg.classList.remove('animated-img')
	attackCard.classList.remove('animated-stats')
	defenseCard.classList.remove('animated-stats')
	hpCard.classList.remove('animated-stats')
	quantityYourAttack.classList.remove('animated-stats-comparison')
	quantityYourDefense.classList.remove('animated-stats-comparison')
	quantityYourHealth.classList.remove('animated-stats-comparison')
	$yourSummary.classList.remove('animated-stats-comparison')
}

const turnOffOpponentAnimation = () => {
	pokemonImgOpponent.classList.remove('animated-img')
	attackCardOpponent.classList.remove('animated-stats')
	defenseCardOpponent.classList.remove('animated-stats')
	hpCardOpponent.classList.remove('animated-stats')
	quantityOpponentAttack.classList.remove('animated-stats-comparison')
	quantityOpponentDefense.classList.remove('animated-stats-comparison')
	quantityOpponentHealth.classList.remove('animated-stats-comparison')
	$opponentSummary.classList.remove('animated-stats-comparison')
}

const genereteOpponentCard = e => {
	let id4 = Math.floor(Math.random() * 150) + 1
	APIURL4 = URL + id4

	e.target = $buttonCountOpponent

	if (e.target) {
		$buttonCountOpponent++
		$buttonCountValueOpponent.push($buttonCountOpponent)
		$buttonCountFightValue = []
		generateAudio.volume = 0.3
		generateAudio.play()

		if ($buttonCountValueOpponent.length == 3) {
			generateOpponentBtn.disabled = true
			generateOpponentBtn.classList.add('btn-disabled')
		}

		if ($buttonCountFightValue.length == 0) {
			fightBtn.disabled = false
			fightBtn.classList.remove('btn-disabled')
		}
	}

	axios.get(APIURL4).then(res => {
		experiencesCardOpponent.textContent = res.data.base_experience + ' xp'
		typeCardOpponent.textContent = res.data.types[0].type.name
		imgSrc = res.data.sprites.other.dream_world.front_default
		pokemonImgOpponent.setAttribute('src', imgSrc)
		pokemonNameOpponent.textContent = res.data.name
		firstAbilitiesOpponent.textContent = res.data.abilities[0].ability.name
		if (res.data.abilities.length == 1) {
			secondAbilitiesOpponent.textContent = 'Secret-Power'
		} else if (res.data.abilities.length !== 1) {
			secondAbilitiesOpponent.textContent = res.data.abilities[1].ability.name
		}
		attackCardOpponent.textContent = res.data.stats[1].base_stat
		defenseCardOpponent.textContent = res.data.stats[2].base_stat
		hpCardOpponent.textContent = res.data.stats[0].base_stat
		$nameOpponentPokemon.textContent = res.data.name
		quantityOpponentAttack.textContent = res.data.stats[1].base_stat
		quantityOpponentDefense.textContent = res.data.stats[2].base_stat
		quantityOpponentHealth.textContent = res.data.stats[0].base_stat
		$opponentSummary.textContent =
			parseInt(quantityOpponentAttack.textContent) +
			parseInt(quantityOpponentDefense.textContent) +
			parseInt(quantityOpponentHealth.textContent)

		// add animation

		pokemonImgOpponent.classList.add('animated-img')
		attackCardOpponent.classList.add('animated-stats')
		defenseCardOpponent.classList.add('animated-stats')
		hpCardOpponent.classList.add('animated-stats')
		quantityOpponentAttack.classList.add('animated-stats-comparison')
		quantityOpponentDefense.classList.add('animated-stats-comparison')
		quantityOpponentHealth.classList.add('animated-stats-comparison')
		$opponentSummary.classList.add('animated-stats-comparison')

		return setTimeout(turnOffOpponentAnimation, 4000)
	})
}

const startFight = e => {
	yourCard.classList.add('animated-card-fight')
	opponentCard.classList.add('animated-card-fight')
	winner.classList.add('winner-animation')
	numberOfExp.classList.add('numbers-animation')
	numberOfBattles.classList.add('numbers-animation')
	setTimeout(turnOffFightAnimation, 4000)
	fightAudio.volume = 0.3
	fightAudio.play()

	// update click count button fight

	if (e.target) {
		$buttonCountFight++
		$buttonCountFightValue.push($buttonCountFight)

		if ($buttonCountFightValue.length == 1) {
			fightBtn.disabled = true
			fightBtn.classList.add('btn-disabled')
		}
	}

	// update number of exp

	if (parseInt($yourSummary.textContent) > parseInt($opponentSummary.textContent)) {
		amountExp.push(parseInt(experiencesCardOpponent.innerHTML))
		let result = amountExp.reduce((a, b) => {
			return a + b
		},)
		numberOfExp.textContent = result + ' XP'
	}

	// update number of won battles

	if (parseInt($yourSummary.textContent) > parseInt($opponentSummary.textContent)) {
		$amountBattles++
		numberOfBattles.textContent = $amountBattles
	}

	// update buttons disabled

	if (parseInt($yourSummary.textContent) > parseInt($opponentSummary.textContent)) {
		$buttonCountValue = []
		$buttonCountValueOpponent = []
		generateBtn.disabled = false
		generateBtn.classList.remove('btn-disabled')
		generateOpponentBtn.disabled = false
		generateOpponentBtn.classList.remove('btn-disabled')
	} else if (parseInt($yourSummary.textContent) == parseInt($opponentSummary.textContent)) {
		$buttonCountValue = []
		$buttonCountValueOpponent = []
		generateBtn.disabled = false
		generateBtn.classList.remove('btn-disabled')
		generateOpponentBtn.disabled = false
		generateOpponentBtn.classList.remove('btn-disabled')
	}

	// add winning animation

	setTimeout(addWinningAnimation, 4000)
	setTimeout(removeWinningAnimation, 8000)

	if (parseInt($yourSummary.textContent) > parseInt($opponentSummary.textContent)) {
		return (winner.textContent = $nameYourPokemon.textContent)
	} else if (parseInt($yourSummary.textContent) < parseInt($opponentSummary.textContent)) {
		return (winner.textContent = $nameOpponentPokemon.textContent) && setTimeout(showGameOverPopup, 4000)
	} else if (parseInt($yourSummary.textContent) == parseInt($opponentSummary.textContent)) {
		return (winner.textContent = 'Draw')
	}
}

const addWinningAnimation = () => {
	if (parseInt($yourSummary.textContent) > parseInt($opponentSummary.textContent)) {
		yourCard.classList.add('winning-card-animation')
		resultsAudio.volume = 0.3
		resultsAudio.play()
	} else if (parseInt($yourSummary.textContent) < parseInt($opponentSummary.textContent)) {
		opponentCard.classList.add('winning-card-animation')
		resultsAudio.volume = 0.3
		resultsAudio.play()
	}
}

const removeWinningAnimation = () => {
	yourCard.classList.remove('winning-card-animation')
	opponentCard.classList.remove('winning-card-animation')
}

const showGameOverPopup = () => {
	if (parseInt($yourSummary.textContent) < parseInt($opponentSummary.textContent)) {
		losePopup.style.display = 'block'
		shadowAfterLose.style.display = 'block'
	}
}

const turnOffFightAnimation = () => {
	yourCard.classList.remove('animated-card-fight')
	opponentCard.classList.remove('animated-card-fight')
	winner.classList.remove('winner-animation')
	numberOfExp.classList.remove('numbers-animation')
	numberOfBattles.classList.remove('numbers-animation')
}

document.onload = setTimeout(generateYourCardAuto, 5000)
document.onload = setTimeout(genereteOpponentCardAuto, 5000)

generateBtn.addEventListener('click', generateYourCard)
generateOpponentBtn.addEventListener('click', genereteOpponentCard)
fightBtn.addEventListener('click', startFight)
