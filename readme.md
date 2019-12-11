# Art Valley


![alt text](https://imgur.com/VrMHztL.png)

Created by

[Visit Us!](https://art-valley.herokuapp.com)

[Christopher Fong](https://github.com/cfo8473)

[Gabriel Barrios](https://github.com/gbarrios212)

[Abby Xu](https://github.com/AbbyTunes)

## Technologies
 * Database: MongoDB
 * Backend: Express, Node.js, GraphQL
 * Frontend: React-Apollo, GraphQL

## Background and Overview

Despite powerful associations with tech, the Bay Area remains rooted in art, and it has so much more to to be discovered. Art Valley seeks to makes finding talent in art, film, and local criticism easy.

Through Art Valley, users can create accounts to follow their favorite artists.  Users may create a profile sections, wherein they may present themselves and their art to a community of art enthusiasts.  Users may additionally publish essays on the Bay Area art scene.  Artworks, videos and thoughts all contain likes and comments.  Navigation is made easy on ArtValley, and users are never more than a click away from a new cultural experience. 



## Design


![alt text](https://imgur.com/Mo5Gc4L.png)
Clean style and respectful presentation are key values at ArtValley.  On navigating to any particular work on the site, users are able to view their work in full resolution against a neutral  background on hover.  The title, artist info, and descriptions, as well as an option to like or unlike a work are directly beneath. 

A comment section can be found on the opposite side of a dividing line, where users may freely add opinions about the select artwork.  Should a user lament a post, they can quickly delete their comment right from the page.   


![alt text](https://imgur.com/Dgw6qD2.png)

Furthermore, users are presented with other popular artworks by the same artist. 

![alt text](https://imgur.com/iJRWrJU.png)

Special care is given to all aspects of the site, including those centered on text.  ArtValley's index pages provide an organized display of resources against a minimalist backdrop to ensure no design outshines the work being presented.  

## Sample Code

user profile 
art upload 


## Challenges 

Given the complicated cross-model relationships inherent to social media sites paired with the expectations for rapid interactions on behalf of users, special care had to be given to the way in which we chose to access our backend.  To account for the many resources any one user could "own" and to provide quick navigation through the site, we used GraphQL to leverage its rich querying tools in conjunction with MongoDB's document based collections.  

Challenges working with this technology included ways to maintain session related user information across various pages.  A workaround to accessing a global state involved injecting auth tokens, usernames, and the like directly into localStorage.  

## Upcoming Features
* A rich text editor for further artilce customization. 
* An algorithm that sorts the homepage according to site-wide user interactivity. 
* A search function to facilitate artistic discovery. 
