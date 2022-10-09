import { motion } from "framer-motion";
import botImg from "../Assets/bot (1).png";
import style from "./Chats.module.css"
import { useEffect } from "react";


const Chats = (props) => {
  const storedChats = props.storedChats;
  const setStoredChat = props.setStoredChat

  useEffect(() => {
      const chat = {
        response: "Hello!"
      }
      setStoredChat([...storedChats, chat]);
    }, []);

  return storedChats.map((chat, index) => (
    <div key={index}>
      {chat.user && (
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={style.userInput}
        >
          <div className={style.userInputText}>
            <p>{chat.user}</p>
          </div>
        </motion.div>
      )}

      {chat.response && (
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className={style.response}
        >
          <div className={style.imgContainer}>
            <img src={botImg} alt="bot_pic" />
          </div>
          <div className={style.responseText}>
            <p>{chat.response}</p>
          </div>
        </motion.div>
      )}
    </div>
  ));
};

export default Chats;
