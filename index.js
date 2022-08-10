const axios = require('axios')
const process = require('process')

const buscaJogos = async () => {
  let url = 'https://webws.365scores.com/web/games/current/?appTypeId=5&langId=31&timezoneName=America/Sao_Paulo&userCountryId=21&competitors=1215&lastUpdateId=3837248352'
  let jogos = []

  await axios
    .get(url)
    .then(({ data }) => {
      let { games } = data
      let qtdJogos  = process.argv[2] || games.length

      for(let i = 0; i < qtdJogos; i++){
        let game           = games[i]
        let competicao     = game.competitionDisplayName
        let data           = game.startTime
        let mandante       = game.homeCompetitor.name
        let visitante      = game.awayCompetitor.name
        let scoreMandante  = game.homeCompetitor.score
        let scoreVisitante = game.awayCompetitor.score

        let temp = data.split('T')
        temp[0]  = temp[0].split('-').reverse().join('-')
        temp[1]  = temp[1].split('-')[0]
        data     = temp.join(' ')

        let jogo = {
          competicao,
          data,
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