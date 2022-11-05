const axios = require('axios')
const process = require('process')

const buscaJogos = async () => {
  let url = 'https://webws.365scores.com/web/games/current/?timezoneName=America/Sao_Paulo&competitors=1215'
  let jogos = []

  await axios
    .get(url)
    .then(({ data }) => {
      let { games } = data
      let input     = process.argv[2] || games.length
      let qtdJogos  = input > games.length ? games.length : input

      for(let i = 0; i < qtdJogos; i++){
        let game           = games[i]
        let competicao     = game.competitionDisplayName
        let startTime      = game.startTime
        let mandante       = game.homeCompetitor.name
        let visitante      = game.awayCompetitor.name
        let scoreMandante  = game.homeCompetitor.score == "-1" ? "0" : game.homeCompetitor.score
        let scoreVisitante = game.awayCompetitor.score == "-1" ? "0" : game.awayCompetitor.score

        let temp    = startTime.split('T')
        let dia     = temp[0].split('-').reverse().join('/')
        let horario = temp[1].split('-')[0] // remove fuso horário

        let jogo = {
          competicao,
          dia,
          horario,
          mandante: `${mandante} ${scoreMandante}`,
          visitante: `${visitante} ${scoreVisitante}`
        }
        jogos.push(jogo)
      }
      console.log(JSON.stringify(jogos, null, 2))
    })
    .catch(error => {
      console.log(error)
    })
}

buscaJogos()