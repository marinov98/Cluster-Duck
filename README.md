# ClusterDuck

- A website aimed at improving the Computer Science Community at Hunter College (and potential many more communities in the future)
- [Check it out!](https://cluster-duck.herokuapp.com)

## Problem

- Hunter College has honors computer science programs but majority of students are not enrolled in them and
combined with the fact that Hunter College is a commuter school, having a community can be difficult to come around

## Description

- We wanted to make something that will allow computer science majors to seemlessly communicate with another.
- We wanted this app to be the better version of piazza, stack overflow, and facebook all combined
- This app allows users to make an account and post questions/advice to other computer science majors
- the more a user contributes, the more points they earn for helping out the community

## Tech Stack

### Front-end

- React.js
- bootstrap

### Backend-end

- Node.js
- Express.js
- DBMS: MongoDB

### Cloud Platform and Docker

- This application is hosted on **Heroku**  
- We are using **Docker** but we are planning to improve the configurations

### Authentication & Authorization

- This app allows users to either register and make their own accounts or use google-login and login with their google emails and credentials.
- If they decide to make an account through the app, we use json web tokens (and have implemented refresh token logic) to authorize users.

## Team Info

### Team name: HunterScript++

### Team members (format: GitHub username, last name, first name)

- `marinov98`, Marinov, Marin
- `AjaniStewart`, Stewart, Ajani
- `beeliu`, Liu, Belinda
- `sjku1`, Ku, Stephen
- `BrandonFoster`, Foster, Brandon
- `joshcwinton`, Winton, Josh
