import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChatMessage({ chat }) {
    return (
        <>
            {chat.role === 'model' ? (
                <div className="flex flex-row justify-baseline">
                    <FontAwesomeIcon
                        icon={faRobot}
                        className="text-black text-[1.2vw] self-end mr-2 bg-amber-100 rounded-[100%] px-2 py-2.5"
                    />
                    <p className=" text-[1vw] p-4 bg-gray-200 max-w-[75%] rounded-t-xl rounded-br-xl rounded-bl-0 break-words whitespace-pre-line">
                       {chat.text.data}
                    </p>
                </div>
            ) : (
                <div className="flex flex-row justify-end">
                    <p className="text-[1vw] p-4 bg-amber-100 max-w-[75%] rounded-t-xl rounded-bl-xl rounded-br-0 break-words whitespace-pre-line">
                        {chat.text}
                    </p>
                </div>
            )}
        </>
    );
}

export default ChatMessage;
