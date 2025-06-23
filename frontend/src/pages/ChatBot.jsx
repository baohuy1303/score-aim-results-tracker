import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChatBot() {
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <div className="flex flex-row gap-5 items-center justify-center">
                <FontAwesomeIcon
                    icon={faRobot}
                    className="text-black text-[1.5vw] mb-[1vh]"
                />
                <h1 className="text-[2vw]">YOUR VIRTUAL ACADEMIC ADVISOR</h1>
            </div>
            <p>Ask me anything related to your grades</p>

            <div className="flex flex-col bg-white w-[50vw] h-[65vh] rounded-2xl p-5 overflow-auto gap-5 relative mt-5">
                <div className="flex flex-row justify-baseline">
                    <FontAwesomeIcon
                    icon={faRobot}
                    className="text-black text-[1.2vw] self-end mr-2 bg-amber-100 rounded-[100%] px-2 py-2.5"/>
                <p className="p-4 bg-gray-200 max-w-[75%] rounded-t-xl rounded-br-xl rounded-bl-0 break-words whitespace-pre-line">Hey there how can I help</p>
                </div>

                <div className="flex flex-row justify-end">
                <p className="p-4 bg-amber-100 max-w-[75%] rounded-t-xl rounded-bl-xl rounded-br-0 break-words whitespace-pre-line">I'm the user lol</p>
                </div>

                <div className="absolute bottom-0 bg-white mb-4">
                    <form action="" className="flex flex-row items-center justify-center gap-5">
                        <input type="text" placeholder="Message me" required className="w-[43vw]
                        bg-white py-2 px-4 outline-amber-100 rounded-lg outline-1
                            focus:outline-3 focus:outline-amber-200 shadow-md/30 focus:shadow-lg/30 shadow-orange-400 
                            hover:bg-amber-100 hover:shadow-lg/35  transition duration-200 ease-in-out"/>
                        <button className="cursor-pointer bg-orange px-5 py-3 border-amber-50 rounded-lg shadow-lg/30 shadow-orange-400 
                        hover:bg-sidebar hover:shadow-lg/35 hover:scale-110 transition duration-200 ease-in-out"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
