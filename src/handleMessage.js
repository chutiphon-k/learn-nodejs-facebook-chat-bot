import { getResponseMap, getQuestionArr } from 'db'

let responseMap = getResponseMap()
let questionArr = getQuestionArr()

function getQuestionList () {
	let res = `สวัสดีครับ ตอนนี้เจมส์ไม่อยู่สามารถคุยกับ Bot ของผมได้`
	questionArr.map((question, index) => {
		res += `\n ${index + 1}. ${question}`
	})
	return res
}

function getRes (req) {
	let keys = Object.keys(responseMap)
	let regex = new RegExp(req)
	return (keys.find(key => req.match(regex))) ? responseMap[req] : null
}

function handleMessage (req, id, sendMessage) {
	let response = getRes(req)
	if (!response) response = getQuestionList()

	sendMessage(response, id).then(() => {
		console.log(`respond to "${req}" success`)
		console.log(response)
	}).catch(err => {
		if (err) {
			console.log(err)
		}
	})
}

export {
	handleMessage
}
