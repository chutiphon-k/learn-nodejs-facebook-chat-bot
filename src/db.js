import fs from 'fs'
import path from 'path'

let databaseDir = path.resolve(__dirname, '../database')

function getResponseMap () {
	let data = fs.readFileSync(`${databaseDir}/respond.json`, 'utf8')
	try {
		let responseMap = JSON.parse(data)
		return responseMap
	} catch (err) {
		console.log(err)
	}
}

function getQuestionArr () {
	let data = fs.readFileSync(`${databaseDir}/question.json`, 'utf8')
	try {
		let json = JSON.parse(data)
		return json
	} catch (err) {
		console.log(err)
	}
}

export {
	getResponseMap,
	getQuestionArr
}
