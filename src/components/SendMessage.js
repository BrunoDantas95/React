import "../css/SendMessage.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SendMessage = () => {
    
    const BOT_TOKEN = "6172099644:AAEKJl6zYJ4oOiK7EMdgU00Wmy5KcEmEqdc" // TODO: Replace with your bot token
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

   

    const [chatID, setChatID] = useState('6113332204');
    const [message, setMessage] = useState('');
    const [responseData, setResponseData] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        //const chatId = '1234567890'; // TODO: Replace with your chat ID
        const formData = {
            chatID,
            message
          };
    
        try {
            if(formData.chatID === '' || formData.message === '') {
                throw new Error('Please fill in all fields');
            }
            console.log("Form data: " + JSON.stringify(formData))
            const data = {
                receiverID: formData.chatID,
                content: formData.message
            }
            const response = await axios.post('https://localhost:7051/api/Message/SaveMessage', 
                { 
                    receiverID: formData.chatID,
                    content: formData.message 
                }, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setResponseData(response.data);
            
            await axios.post(TELEGRAM_API_URL, {
                chat_id: formData.chatID,
                text: formData.message
            });
            //Reset form
            try {
                console.log(responseData);
                const url = `https://brilliant-eclair-6a1b6d.netlify.app/ToApprove/?mID=${responseData.id}`
                const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                  chat_id: formData.chatID,
                  text: formData.message,
                  reply_markup: {
                    inline_keyboard: [
                        [{text: 'Open App', web_app: {url: url}}]
                    ],
                  },
                });
                console.log(response);
              } catch (error) {
                console.error(error);
              }
            setChatID("6113332204");
            setMessage("");
        } catch (error) {
          console.error(error);
        }
      };

    
    
    return (
        <div className="sendMessage">
            <h1>Send Message</h1>
            <form onSubmit={handleSubmit}>
                <select value={chatID} onChange={(e) => setChatID(e.target.value)} >
                    <option value="6113332204">Joshua jones</option>
                    <option value="2070528179">Bruno Dantas</option>
                </select>
                <input value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

export default SendMessage