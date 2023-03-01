import React, { useEffect, useState, setData } from 'react';
import { json, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import userEvent from "@testing-library/user-event";
 
const ToApprove = () => {
    const location = useLocation();
    const mID = new URLSearchParams(location.search).get("mID");
    const data = {
        messageID: mID
      };
    const [responseData, setResponseData] = useState(null);
    const [showText, setShowText] = useState(false);
    const [Text, setText] = useState('');

    useEffect(() => {
        async function fetchData() {
           const response = await postData();
        }
        fetchData();
    }, []);

    const postData = async () => {
        try {
          const response = await axios.post('https://localhost:7051/api/Message/GetMessage', { messageID: mID }, {
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json'
            }
          });
          console.log(response.data[0]);
          setResponseData(response.data[0]);
        } catch (error) {
          console.error(error);
        }
    };
    if(responseData === null || responseData === undefined) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }else if (responseData.status > 0) {
        return (
            <div>
                <p>Message not found</p>
            </div>
        )
    }

    const handleClick = async (value) => {
        if(value === 1) {
            setText("You Approved this element");
        }else {
            setText("You Disapproved this element");
        }
        const data = {
            "id": responseData.id,
            "senderID": responseData.senderID,
            "receiverID": responseData.receiverID,
            "content": responseData.content,
            "sendDateTime": responseData.sendDateTime,
            "status": value
        }
        //axios put on this url https://localhost:7051/api/Message/UpdateMessageStatus
        const response = await axios.put('https://localhost:7051/api/Message/UpdateMessageStatus', data, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        setShowText(true);

    };

    return (
        <div>
            <p>Message Approval Page</p>
            <p>Message content {responseData.content}</p>
            <div>
                {showText ? (
                    <p>{Text}</p>
                ) : (
                    //<button onClick={handleClick}>Click me</button>
                    <div>
                        <button onClick={() => handleClick(1)}>Sim</button>
                        <button onClick={() => handleClick(2)}>Não</button>
                    </div>
                )}
            </div>
        </div>
    )
};


 
export default ToApprove;