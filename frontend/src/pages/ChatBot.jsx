import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { chatBot } from "../api";
import { useScoreContext } from "../contexts/ScoreContext";
import Navbar from "../components/navbar";

function ChatBot() {
    const inputRef = useRef()
    const chatRef = useRef()
    const [chatHistory, setChatHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const {allScores, subject, term} = useScoreContext()


    useEffect(() => {
        setChatHistory([])
    }, [term])

        async function getBotRes(question) {
            setLoading(true);
            setChatHistory((history) => [...history, {role: 'model', text: {data: 'Thinking...'}}]);
            try {
                let data = await chatBot(question, allScores, chatHistory);
                if (data) {
                    setChatHistory((history) => {
                        const prevChats = [...history]
                        prevChats[prevChats.length-1] = {role: 'model', text: data}
                        return prevChats
                    });
                }
            } catch (error) {
                console.error('Failed to fetch scores:', error);
                setChatHistory((history) => [...history, { role: 'model', text: 'Sorry, something went wrong.' }]);
            } finally {
                setLoading(false);
            }
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userMessage = inputRef.current.value.trim()
        if(!userMessage) return;
        inputRef.current.value = '';

        setChatHistory((history) => [...history, {role: 'user', text: userMessage}])

        
        getBotRes(userMessage)
    }

    useEffect(() => {
        chatRef.current.scrollTo({top: chatRef.current.scrollHeight, behavior: 'smooth'})
    }, [chatHistory])

    console.log(chatHistory)

    return (<>
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="flex flex-row gap-5 items-center justify-center">
                <FontAwesomeIcon
                    icon={faRobot}
                    className="text-black text-[1.5vw] mb-[1vh]"
                />
                <h1 className="text-[2vw]">YOUR VIRTUAL ACADEMIC ADVISOR</h1>
            </div>
            <p>Ask me anything related to your grades</p>

            <div ref={chatRef} className=" flex flex-col bg-white w-[70vw] h-[60vh] rounded-xl p-5 overflow-auto gap-5 mt-5
            shadow-md/20 shadow-orange-400 border-3 border-amber-100">
                <div className="flex flex-row justify-baseline">
                    <FontAwesomeIcon
                        icon={faRobot}
                        className="text-black text-[1.2vw] self-end mr-2 bg-amber-100 rounded-[100%] px-2 py-2.5 
                        shadow-md/20 border-3 border-bgColor"
                    />
                    <p className="text-[0.9vw] p-4 bg-gray-200 max-w-[75%] rounded-t-xl rounded-br-xl rounded-bl-0 break-words whitespace-pre-line
                    shadow-md/20 border-3 border-gray-200">
                        Hey there how can I help
                    </p>
                </div>

                {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} chat={chat} />
                ))}

                
            </div>
            <div className="my-5">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-row items-center justify-center gap-5"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Message me"
                            required
                            className="w-[45vw] overflow-auto text-[0.9vw]
                        bg-white py-3 px-4 outline-amber-100 rounded-lg outline-1
                            focus:outline-3 focus:outline-amber-200 shadow-md/30 focus:shadow-lg/30 shadow-orange-400 
                            hover:bg-amber-100 hover:shadow-lg/35  transition duration-200 ease-in-out"
                        />
                        <button disabled={loading}
                            className={loading ? 'bg-gray-500 px-5 py-3 rounded-lg shadow-lg/30 shadow-orange-400' : `cursor-pointer bg-orange px-5 py-3 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 
                        hover:bg-sidebar hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out`}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>
        </div>
        </>);
}

export default ChatBot;
