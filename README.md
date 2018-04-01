# TrackServer
Server for track.

[![Build Status](https://travis-ci.org/yosami-framework/track-server.svg?branch=master)](https://travis-ci.org/yosami-framework/track-server)

## Installation

### npm

```shell
npm install track-server
```

## Usage

```javascript
const Server = require('track-server');
const Asset  = require('track-server-renderer/lib/asset');

const asset = new Asset(assetsDir, 'mock.js', 'mock.css');
Server.start(new Middleware(), routes, asset);
```
