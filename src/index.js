import FacebookChatApi from 'facebook-chat-api'
import config from 'config'

import handleMessage from 'handleMessage'

let userinfo = config.Facebook

let timeout
let inTimeout = {}

FacebookChatApi(userinfo, (err, api) => {
	if (err) return console.log(err)

	function sendMessage (str, id) {
		return new Promise((resolve, reject) => {
			api.sendMessage(str, id, () => {
				if (err) {
					reject(err)
				}
				resolve('send str success')
			})
		})
	}

	api.listen((err, message) => {
		if (err) {
			console.log(err)
		}
		console.log(message)

		let req = message.body ? message.body.toLowerCase() : ''
		let id = message.threadID
		if (req && !inTimeout[id]) {
			handleMessage(req, id, sendMessage)
			if (timeout) {
				inTimeout[id] = true
				setTimeout(() => {
					inTimeout[id] = false
				}, timeout)
			}
		}
	})
})
