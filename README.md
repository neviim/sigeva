# Seminário CCSA
![GPL](https://img.shields.io/badge/license-GPL-blue.svg)

Plataforma para gestão de eventos acadêmicos que suporta o Seminário de Pesquisa do Centro de Ciências Sociais Aplicadas ([CCSA](https://ccsa.ufrn.br)) da UFRN.

Para obter informações sobre instalação, configuração e casos de uso, acesse a [Wiki do Seminário](https://github.com/ccsa-ufrn/seminario/wiki).

## [seminario/core](https://github.com/ccsa-ufrn/seminario/tree/master/core)
Aplicação Node.JS de back-end da plataforma, contruída a partir do framework Express v4.14.0.

## [seminario/docs](https://github.com/ccsa-ufrn/seminario/tree/master/docs) :books:
Documentação geral do projeto.

## Como contribuir :checkered_flag:
Para enviar contribuições no código-fonte você deve:
- Abrir um issue, caso a sua submissão resolva um bug, ou necessite de alguma discussão.
- Seguir a GitHub workflow, detalhada abaixo.
- Seguir os padrões de desenvolvimento, detalhados mais a seguir.

### GitHub workflow
1. 'Clone' o repositório do projeto
- Crie uma 'branch' para o seu bug/release (deve possuir o ID da issue aberta):
~~~
git checkout -b new-issue-88888
~~~
- Codifique dentro do 'branch' criado
- 'Commit' as mudanças feitas no código:
~~~
git add .
git commit -m 'fix bug 88888 - mensagem do commit'
~~~
- Submeta seu 'branch' para o GitHub:
~~~
git push origin new-issue-88888
~~~
- Envie um 'pull request' no GitHub.

### Padrões de desenvolvimento

O padrão de desenvolvimento do 'seminário' está sendo feito com a utilização da ferramenta [EditorConfig](http://editorconfig.org/), acesse o site e veja como instalar o plugin do EditorConfig no seu editor de código preferido. Além disso, veja o arquivo .editorconfig para saber quais os padrões de codificação configurados no 'seminario'.

## Estrutura de serviços
Os serviços de back-end e front-end são executados em processos idependentes.

<img src="http://i.imgur.com/3OLBNcc.png" width="600px">
