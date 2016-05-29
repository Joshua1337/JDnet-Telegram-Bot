import dude from 'debug-dude'
const { /*debug,*/ log, info /*, warn, error*/ } = dude('bot')

import { version } from '../package.json'
info(`jdnet bot v${version} starting`)

import config from '../config.json'

import { connect, message } from 'coffea'
const networks = connect(config)

import fs from 'fs'
import path from 'path'

networks.on('command', (evt, reply) => {
  log('Received command event: %o', evt)

  switch (evt.cmd) {
    case 'say':
      reply(message(evt.channel, evt.args.join('')))
      break;
  }
})

networks.on('message', (evt, reply) => {
  log('Received message event: %o', evt)

  let hashtags = evt.text.match(/#([a-zA-Z]+)/)
  
  if (hashtags && hashtags.length > 1) {
  reply({
    type: 'sendVoice',
    action: 'record_audio',
    id: evt.channel,
    voice: fs.createReadStream(path.join(__dirname, `voice/${hashtags[1]}.mp3`))
  })}
})
