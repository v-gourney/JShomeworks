"use strict";
const root = document.getElementById ('root');
const articleList = document.getElementById ('articleList');
const info = document.getElementById ('info');

window.addEventListener ('DOMContentLoaded', ()=> {
        showPage (window.location.hash.substr(1));

        window.onhashchange = function(hash)  {
                showPage (window.location.hash.substr(1));
        }
        function showPage (hash) {
                let url = '';
                switch (hash) {
                        case 'content':
                                url = 'content.html'
                                break
                        case 'articlebam':
                                url = 'articlebam.html'
                                break
                        case 'articlebar':
                                url = 'articlebar.html'
                                break
                        case 'articlebro':
                                url = 'articlebro.html'
                                break
                        case 'articlechi':
                                url = 'articlechi.html'
                                break  
                        case 'articledev':
                                url = 'articledev.html'
                                break
                        case 'articlefla':
                                url = 'articlefla.html'
                                break
                        case 'articlekim':
                                url = 'articlekim.html'
                                break
                        case 'articlepea':
                                url = 'articlepea.html'
                                break 
                        case 'articlered':
                                url = 'articlered.html'
                                break
                        case 'articlespi':
                                url = 'articlespi.html'
                                break
                        case 'articlevar':
                                url = 'articlevar.html'
                                break
                        case 'articlewee':
                                url = 'articlewee.html'
                                break                                                             
                        case 'main':
                        default:
                                url = 'main.html'
                }
                fetch (url,{ method: 'GET' })
                .then(response => response.text())
                .then( html => {
                        root.innerHTML = html;
                        switch (hash) {
                                case 'content':
                                        renderContentList ();
                                        break;
                                case 'articlebam':
                                case 'articlebar':
                                case 'articlebro':
                                case 'articlechi':
                                case 'articledev':
                                case 'articlefla':
                                case 'articlekim':
                                case 'articlepea': 
                                case 'articlered':
                                case 'articlespi':
                                case 'articlevar':
                                case 'articlewee':        
                                        renderArticle (url);
                                        break;
                                case 'main':
                                default:
                                        url = 'main.html'
                        }
                }) 

                .catch( error => console.error('error:', error));
        }
        function renderContentList () {
                fetch ('example.json', {method: 'GET'})
                .then(response => response.json())
                .then( content => {
                        const articleList = document.getElementById ('articleList');
                        content.sort((a, b) => a.localeCompare(b));
                        document.title = 'Encyclo - List of plants';
                        content.forEach(element => {
                                let articleLink = document.createElement ('a');
                                articleLink.innerHTML = element + '<br>';
                                articleLink.id = (element.toLowerCase()).substr(0,3);
                                articleLink.setAttribute ('href', '#article'+ articleLink.id)
                                articleList.appendChild (articleLink);
                        });
                } )
                .catch( error => console.error('error:', error));
        }
        function renderArticle (url) {
                fetch (url, {method: 'GET'})
                .then(response => response.text())
                .then( content => {
                        root.innerHTML = content;
                        
                        document.title = 'Encyclo' + ' ' +  window.location.hash.substr(8,3);

                        fetch ('example.json', {method: 'GET'})
                        .then(response => response.json())
                        .then( content => {
                                let info = document.getElementsByTagName ('aside')[0];
                                content.sort((a, b) => a.localeCompare(b));
                                content.forEach(element => {
                                        let articleLink = document.createElement ('a');
                                        articleLink.innerHTML = element + '<br>';
                                        articleLink.id = (element.toLowerCase()).substr(0,3);
                                        articleLink.setAttribute ('href', '#article'+ articleLink.id)
                                        info.appendChild (articleLink);
                                });
                        })
                } )
                .catch( error => console.error('error:', error));
        }
})


