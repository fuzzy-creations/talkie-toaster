import axios from 'axios';
const dialogflowURL = "https://us-central1-the-talkie-toaster.cloudfunctions.net/dialogflowGateway"
const dialogflowEventURL = "https://us-central1-the-talkie-toaster.cloudfunctions.net/dialogflowEventGateway"



const eventQuery = async (event, sessionId) => {
    const requestData = {
        sessionId: sessionId,
        queryInput: {
          event: {
            name: event,
            languageCode: 'en-US'
          }
        }
    }

    try {
        const response = await axios.post(dialogflowEventURL, requestData)
        console.log(response)

        const content = response.data.fulfillmentMessages[0];
        var reply = {
            who: "toaster", 
            content: content.text
        }
    } catch (error) { console.log("ERRORERROROOROROROR") }
    return [reply]
    
}

const speakQuery = async (text, sessionId) => {
    let message = {
        who: "user", 
        content: { text: text }
    }
    const requestData = {
        sessionId: sessionId,
        queryInput: {
          text: {
            text,
            languageCode: 'en-US'
          }
        }
    }
    try {
        const response = await axios.post(dialogflowURL, requestData)
        console.log(response)
        const content = response.data.fulfillmentMessages[0];
        var reply = {
            who: "toaster", 
            content: content.text
        }
    } catch (error) { console.log("ERRORERROROOROROROR") }
    return [reply]
}

export { eventQuery, speakQuery}