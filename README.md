﻿ドカポンの後継者
===============

## Succeeded by Kadopon Village...
Fundamental implementation issues mean this repository is now obsolete;
check out the Redux/React implementation [here](https://github.com/parkt2/kadopon-village). Keeping this around for legacy (and as a fond reminder of my freshman days).

## Concept

A JRPG / Monopoly inspired browser-based board game. Essentially a cleaner, better, balanced and more feature-rich Dokapon Kingdom. Our inspirations come from the aforementioned Monopoly and Dokapon Kingdom as well as the popular Nintendo series Mario Party. Essentially, this game strives to reward better playing choices and management over luck, without removing the gambling-esque RNG element of all board games. This game also hopes to solve the problems of balance and relative power levels generally present in these board games; for example, in Monopoly, generally the strongest players get stronger faster while the weakest players struggle to remain relevant. Dokapon Kingdom is fairly similar - though there are elements in play where a weaker player can still gain traction, as well as a unique “board reset” mechanic that is arguably extremely frustrating and toxic. Finally, Mario Party has multiple ways for players to “steal” from each other as well as strange and sometimes frustrating random mechanics that can completely change the game. (...)
Graphically, this game is in 2.5d at an angled, elevated view of the board. (...)

## Installation

```
$ npm install -g bower grunt-cli nodemon
$ git clone https://github.com/chocolatemelt/dokapon-no-koukei
$ cd dokapon-no-koukei && npm install && bower install
```

## Running the server

```
$ nodemon [--debug] bin/www [port]
```
Port defaults to 3000 when unspecified.

### Note

In production it is advised to call `db.sessions.ensureIndex( { "lastAccess": 1 }, { expireAfterSeconds: 3600 } )` from the mongo command line. This makes sure that all sessions are flushed after an hour of inactivity. This results is much smaller database sizes and more reliability.
```
$ mongo
> use dokapon
> db.sessions.ensureIndex( { "lastAccess": 1 }, { expireAfterSeconds: 3600 } )
> CTRL-C
```

### Note again

Upon switching from express-session-mongo to mongo-connect, it is now unclear whether we need to even call the above statment from mongodb. More research needs to be done in order to fully understand.

## Implementation

1. node.js and express.js
2. socket.io
3. paper.js and other WebGL Libraries
4. MongoDB and mongoose

## Mechanics, game information, and other stuff

See [/docs](../../tree/master/docs).

## Ideas / Brainstorming
 
 - 10 items to a bag?
 - Players can login and play whenever - turns are taken when possible and then a changelog is prepared for events between log-ins (for example, 4 players with different timezones can play nonsynchronously by taking their turn when it's available and viewing a recent changelog of events)
 - Find a way to progress games should a player not be available
