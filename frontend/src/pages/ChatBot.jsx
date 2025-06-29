import { faArrowDown, faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";
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
    const [input, setInput] = useState('')


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
        setInput('')

        setChatHistory((history) => [...history, {role: 'user', text: userMessage}])

        
        getBotRes(userMessage)
    }

    useEffect(() => {
        chatRef.current.scrollTo({top: chatRef.current.scrollHeight, behavior: 'smooth'})
    }, [chatHistory])

    console.log(chatHistory)

    const handleQuickText = (text) => {
        setInput(text)
    }

    return (<>
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="flex flex-row gap-5 items-center justify-center">
                <FontAwesomeIcon
                    icon={faRobot}
                    className="text-black text-[1.5vw] mb-[1vh]"
                />
                <h1 className="text-[2.1vw]">YOUR VIRTUAL ACADEMIC ADVISOR</h1>
            </div>
            <p className="text-[0.9vw]">Ask me anything related to your grades. Specific question gives the best result!</p>

            <div ref={chatRef} className=" flex flex-col bg-white w-[70vw] h-[55vh] rounded-xl p-5 overflow-auto gap-5 mt-5
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
                            value={input}
                            ref={inputRef}
                            type="text"
                            placeholder="Message me"
                            required
                            className="w-[45vw] overflow-auto text-[0.9vw]
                        bg-white py-3 px-4 outline-amber-100 rounded-lg outline-1
                            focus:outline-3 focus:outline-amber-200 shadow-md/30 focus:shadow-lg/30 shadow-orange-400 
                            hover:bg-amber-100 hover:shadow-lg/35  transition duration-200 ease-in-out"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button disabled={loading}
                            className={loading ? 'bg-gray-500 px-5 py-3 rounded-lg shadow-lg/30 shadow-orange-400' : `cursor-pointer bg-orange px-5 py-3 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 
                        hover:bg-sidebar hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out`}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>

                <h1 className='text-[2vw] font-bold leading-18 p-1 mb-[5vh]
                border-4 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 bg-amber-100 mt-[2vh]'><FontAwesomeIcon className="mx-5" icon={faArrowDown} />COMMON QUESTIONS<FontAwesomeIcon className="mx-5" icon={faArrowDown} /></h1>
                <div className="flex flex-wrap justify-center gap-10 max-w-[80vw] mb-[10vh]">
                    {
                        [
                            'What grades do I need next to reach a [desiredGPA] in [subject] [term]?',
                            'What is affecting my [term] GPA the most?',
                            'List all subjects and their weighted scores',
                            'If I get a [score] weighted [x1/x2/x3] in [subject], how will it affect my GPA for [term]?',
                            'Did I improve in [subject] from term one to term two?'

                        ].map((text, key) => (
                                <button key={key}
                                className="text-[0.9vw] font-bold bg-orange p-5 rounded-lg w-[20vw]
                                cursor-pointer shadow-lg/30 shadow-orange-400 border-4 border-amber-50  
                                hover:bg-subject hover:scale-105 hover:shadow-xl/25 transition duration-100 ease-in-out"
                                onClick={() => handleQuickText(text)}>{text}</button>
                        ))
                    }
                    
                </div>
        </div>
        </>);
}

export default ChatBot;
