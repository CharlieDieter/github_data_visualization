## Background

Space Invaders, one of the first shooting video games, is a classic arcade game in which users shoot waves of enemy ships that become progressively harder to eliminate.

There are more modern implementations of the same game logic that incorporate moving backgrounds and level-up drops from ships, which will be outlined in the **Functionality & MVP** and **Bonus** sections.

## Functionality & MVP

With this version of Space Invaders, users will be able to:

* Start and reset game
* Shoot enemies and move laterally
* Toggle audio on and off
* Input name on high score

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
