const axios = require('axios')


url = 'https://webws.365scores.com/web/games/current/?appTypeId=5&langId=31&timezoneName=America/Sao_Paulo&userCountryId=21&competitors=1215&lastUpdateId=3837248352'


async function getJogos(){
    let jogos = []

    await axios
            .get(url)
            .then(response => {
                // console.log(response.data.games)
                let games = response.data.games
                for(let game of games){
                    let competicao = game.competitionDisplayName
                    let data = game.startTime
                    // let status = game.statusText == "Programação" ? "Agendado" : game.statusText
                    let mandante = game.homeCompetitor.name
                    let visitante = game.awayCompetitor.name
                    let scoreMandante = game.homeCompetitor.score
                    let scoreVisitante = game.awayCompetitor.score


                    let temp = data.split('T')
                    temp[0] = temp[0].split('-').reverse().join('-')
                    temp[1] = temp[1].split('-')[0]
                    data = temp.join(' ')


                    let jogo = {
                        competicao,
                        data,
                        // status,
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

getJogos()