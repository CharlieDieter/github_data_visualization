## Synopsis

Github has been used by 12 million people since its creation in 2008, storing some 31 million open-source projects. Using github's public data found [here](https://cloud.google.com/bigquery/public-data/github), I want to track the popularity of languages, libraries, and frameworks throughout the last ten years, filtering by age, sex, region, and other qualities. Additionally, it might be interesting to compare it to [Stack Overflow survey data](https://insights.stackoverflow.com/survey/2018/).

## Functionality & MVP

With this data visualization, users will be able to:

* Filter results by creator statistics
* View how programming language popularity has changed over time

In addition, the project will include:

* a production README

## Architecture and Technologies

* `Javascript`
* D3.js

## Timeline

**Day 1:**

* Data fetching
* UI framework (title, links, etc.)

**Day 2:**

* Create static charts

**Day 3:**

* Implement user interaction (scrolling through years, languages, etc)

**Day 4:**

* Transitions, animation, formatting

~~Background~~

~~Space Invaders, one of the first shooting video games, is a classic arcade game in which users shoot waves of enemy ships that become progressively harder to eliminate.~~

~~There are more modern implementations of the same game logic that incorporate moving backgrounds and level-up drops from ships, which will be outlined in the **Functionality & MVP** and **Bonus** sections.~~

~~## Functionality & MVP~~

~~With this version of Space Invaders, users will be able to:~~

~~\* Start and reset game~~
~~\* Shoot enemies and move laterally~~
~~\* Toggle audio on and off~~
~~\* Input name on high score~~

In addition, the project will include:

* a production README

## Architecture and Technologies

* `Javascript`
* HTML5 Canvas

## Timeline

**Day 1:**

* Board, Ship, Bullet, Enemy Creation
* User input to move ship, fire bullet
* UI framework (title, high scores, controls, github link, remaining lives, restart modal)

**Day 2:**

* Increased speed enemy speed, deaths, score count
* Moving on to next phase after phase completion
* Enemy shooting

**Day 3:**

* Create life counter that depletes as shot by enemy
* Game over after death
* Victory screen in between levels
* High score congratulation (cookies)
* Music and sound effects

**Day 4:**

* bonus: create scrolling background
* bonus: make enemies drop rewards randomly which change bullets for limited time
* bonus: allow ship to move in all directions as background scrolls, becoming more like Tyrian or similar space-shooter
