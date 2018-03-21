## Synopsis

Github has been used by 12 million people since its creation in 2008, storing some 31 million open-source projects. Using github's public data found [here](https://cloud.google.com/bigquery/public-data/github), I want to track the popularity of languages, libraries, and frameworks throughout the last ten years, filtering by age, sex, region, and other qualities. Additionally, it might be interesting to compare it to [Stack Overflow survey data](https://insights.stackoverflow.com/survey/2018/).

## Functionality & MVP

With this data visualization, users will be able to:

* Filter results by creator statistics
* View transitioning bubble view of languages, each circle packed with related frameworks and libraries over time
* On click of a represented language view a dynamic chord chart that details language relationship with framworks and libraries over time
* On click of a represented language view a dynamic chord chart that show languages relation to one another over time

In addition, the project will include a production README

## Architecture and Technologies

* `Javascript`
* Google BigQuery API with `Node.js`
* D3.js

## Timeline

**Day 1:**

* Data fetching/queries using `Node.js`
* UI framework (title, links, etc.)

**Day 2:**

* Create circle packed bubble view of languages w/ related libs, starting in 2008.
* Have this transition over time, to present time

**Day 3:**

* Implement user interaction that on click transitions to page with two chord charts
* Create chord chart that details language/framework relationships
* Create chord chart that details langauge/language relationships

**Day 4:**

* Transitions, animation, formatting, user interaction in selecting parameters for year, skipping intros, etc.
