require 'httparty'

retorno = []

url = 'https://webws.365scores.com/web/games/current/?appTypeId=5&langId=31&timezoneName=America/Sao_Paulo&userCountryId=21&competitors=1215&lastUpdateId=3837248352'

response = HTTParty.get(url)

games = response.parsed_response["games"]

games.each { |game|
  competicao = game["competitionDisplayName"]
  data = game["startTime"]
  mandante = game["homeCompetitor"]["name"]
  visitante = game["awayCompetitor"]["name"]
  score_mandante = game["homeCompetitor"]["score"]
  score_visitante = game["awayCompetitor"]["score"]
  
  retorno.push({
    "competicao" => competicao,
    "data" => data,
    "mandante" => "#{mandante} #{score_mandante}",
    "visitante" => "#{visitante} #{score_visitante}"
  })
} 

retorno