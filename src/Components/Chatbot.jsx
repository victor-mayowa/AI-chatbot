import React, { useRef, useEffect} from "react";
import style from "./Chatbot.module.css";
import botImg from "../Assets/bot (1).png";
import { useState } from "react";
import Chats from "./Chats";
import uuid from "react-uuid";
import Api from "../Api/Api";

const Chatbot = () => {
  const [value, setValue] = useState("");
  const [storedChats, setStoredChat] = useState([]);

  const scrollDown = useRef();

  const id = uuid();

  let bid = "169673&";
  let key = "misxqWp65CJVwpri";
  let uid = id;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    const { data } = await Api.get(
      `get?bid=${bid}&key=${key}&uid=${uid}&msg=${value}`
    );
    const res = data.cnt;
    const chat = {
      response: res,
      user: value,
      userId: uid,
    };
    setStoredChat([...storedChats, chat]);
    setValue("");
  };

  useEffect(() => {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  }, [storedChats]);

  return (
    <main>
      <div className={style.header}>
        <div className={style.imgContainer}>
          <img src={botImg} alt="demo" className={style.demo} />
        </div>
        <div className={style.status}></div>
        <h2>AI chatApp</h2>
      </div>

      <section>
        <Chats storedChats={storedChats} setStoredChat={setStoredChat} />
        <span ref={scrollDown}></span>
      </section>

      <form onSubmit={submitHandler} className={style.inputBox}>
        <input
          type="text"
          placeholder="Click here to chat"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Click here to chat")}
          className={style.input}
        />
        <button>Send</button>
      </form>
    </main>
  );
};

export default Chatbot;
