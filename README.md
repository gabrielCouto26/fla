# Fla

Projeto com intuito único de buscar os próximos jogos do Flamengo, de qualquer competição, de maneira fácil e rápida pelo terminal, a partir do endpoint da [365 Scores](https://www.365scores.com/pt-br).

## Como usar
1. Primeiro instale as depedências com `npm install`.
2. Instale o `jq`. **(Recomendado)**
3. Adicione o atalho de nome `fla` com o caminho para o comando `node ~/path/to/fla/index.js $1 | jq '.[]'`.
<br/>Caso não tenha instalado o `jq`, o comando será `node ~/path/to/fla/index.js $1`.
4. Escreva `fla` no terminal e receberá uma lista de 6 jogos do Flamengo. O primeiro jogo é o último realizado, os próximos 5 são jogos que ainda não foram realizados.
5. É possível definir quantos jogos deseja receber na lista. Basta passar um número depois do comando.
<br/> Ex: `fla 3` retorna 3 jogos, o último realizado e dois que estão por vir. O número limite é 6, qualquer valor acima disso será limitado para 6.
