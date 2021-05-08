---
title : Brazilian Portuguese translation.  
date : 2021-05-08 // YYYY-MM-DD 
description : Translation of the file (EM.JS) in the directory “docs/.vuepress/nav/en.js” into Brazilian Portuguese. The file will be named 
“pt-br.js”  
autor : Nandofmike 
sidebar : true 
tags automáticas : 
    - Thor 
    - Connex
    - Tradução 
    - Português
    - Brasil      	 
prev : docs/.vuepress/nav/ 
próximo : false 
---

module.exports = [
    {
       
        text: 'Thor',
        ariaLabel: 'Thor',
        items: [
            {
                text: 'Aprenda',
                link: '/thor/learn/'
            },
            {
                text: 'Iniciar',
                link: '/thor/get-started/installation.html'
            },
            {
                text: 'Thorest API',
                link: '/thor/get-started/api.html'
            },
        ]
    },
    {
        text: 'Connex',
        ariaLabel: 'Connex',
        items: [
            {
                text: 'Iniciar',
                link: '/connex/index.html'
            },
            {
                text: 'Especificações do API',
                link: '/connex/api.html' 
            }
        ]
    },
    {
        text: 'Sync', 
        ariaLabel: 'Sync',
        items: [
            {text:"Sync2",
            items: [
                {
                    text : 'Obter Sync2',
                    link : '/sync2/get-started.html'
                },
                {
                    text: 'Guia do usuário',
                    link: '/sync2/user-guide/' 
                },{
                    text: 'FAQ',
                    link: '/sync2/faq/' 
                }
            ]
            },
            {text:"Sync",
            items: [
                {
                    text: 'Baixar arquivo',
                    link: '/sync/download-and-install.html' 
                },
                {
                    text: 'Guia do usuário',
                    link: '/sync/user-guide/' 
                },
                {
                    text: 'FAQ',
                    link: '/sync/faq' 
                }
                ]
            }
        ]
    },
    {
        text:'Tutoriais',
        link: '/tutorials/'
    },
    {
        text: 'Recursos',
        items: [
            {
                text: 'Explorer Vechain',
                link: 'https://explore.vechain.org'
            },
            {
                text: 'App-hub',
                link: 'https://apps.vechain.org/'
            },
            {
                text: 'Outros assuntos',
                link: '/others/miscellaneous.html'
            },
            {
                text: 'Demonstrações & Serviços',
                link: '/others/demos-and-services.html'
            }
        ]
    },
    {
        text: 'Suporte Online', 
        ariaLabel: 'Online Support',
        items: [
            {
                text: 'Grupo Vechain no Telegram',
                link: 'https://t.me/vechain_official_english' 
            },
            {
                text: 'Desenvolvedores Telegram',
                link: 'https://t.me/VeChainDevCommunity' 
            }
            
        ]
    }
]  
