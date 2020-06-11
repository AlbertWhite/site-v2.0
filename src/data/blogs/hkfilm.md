---
title: "How do I use Cypress as web crawler"
date: "2020-06-11"
category: "blog"
star: 2
---

As a big fan of Hong kong films, I had always wanted to make a website for it, mainly for myself, to list all the Hong kong films from 1979 to 2002 (the golden period of Hong kong film industry). Now the website is available [here](https://hkfilm.netlify.app/). All the data comes from Douban.com, the biggest website for movie/book information in China.

I have used the API from Douban to get movie info, and the most challenging part of this project, is to how to get the list of Douban Id, from the list of movie names. With the list of Douban Id, I can query the Douban API to get movie info.

This step takes most of the time during the project, even if it is done by machine. I have known the idea of web crawler or web scraping. However, as a javascript developer, I am looking for a solution based on javascript.

Cypress comes into my mind. It is a end to end test tool and it works like a human. What if it can extract the information from the website and log it locally ? With `cy.writeFile()`, this task can be easily done.

I have tried to configurer the Cypress to searching from Douban.com but I am banned after +150 searches in 15 minutes, so I turned to search from google in Cypress, it's faster and I am not banned.

Here is the piece of code, it's quite fun to use Cypress in the way of web a crawler.

```
describe('get DoubanId', () => {
    it('get DoubanId', () => {
    cy.visit('https://www.google.com/webhp')
    cy.get('.gLFyf').type(`douban`)
    filmList.forEach((name) => {
      cy.get('.gLFyf').clear().type(`${name} douban 1979{enter}`)
      cy.get('.r')
        .first()
        .find('a')
        .invoke('attr', 'href')
        .then((url) => {
          cy.writeFile(
            'data/nameAndIdByYear/1979.json',
            {
              name,
              DoubanId: url.match(/\d+/g)[0],
            },
            { flag: 'a+' }
          )
       })
    })
  })
})
```
