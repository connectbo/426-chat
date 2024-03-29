import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client";
import {IP_ADDR} from "../config/Constants";


function ChatDisplay(props) {
  const [chats, setChats] = useState([]);
  let ref = useRef(chats);

  useEffect(() => {
    ref.current = chats;
  });

  useEffect(() => {
    // connect to the socket. Need to change IP_ADDR in the PostChat file
    const socket = io(IP_ADDR);

    socket.on('new-chat', (data) => {
      // make a copy of the array
      let [...tempChats] = ref.current;

      // get rid of older messages
      if (tempChats.length > 10) tempChats.pop();
      tempChats.push(data);

      // newest chats first
      tempChats.sort(((a, b) => b.date - a.date));

      // update chats state
      setChats(tempChats);
    });
  }, []);


  return (
    <div>
      we have {chats.length}. You should add a component to render them.
    </div>
  );
}

export default ChatDisplay;
