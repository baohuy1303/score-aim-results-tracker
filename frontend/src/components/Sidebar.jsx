import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useScoreContext } from '../contexts/ScoreContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    fa1,
    fa2,
    faPeace,
    faPen,
    faRobot,
} from '@fortawesome/free-solid-svg-icons';

function SideBar() {
    const { term, setTerm } = useScoreContext();

    const handleChange = (e) => {
        setTerm(e.target.value);
    };

    return (
        <>
            <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-[6vw] bg-orange text-white p-6 shadow-lg/30 shadow-orange-400 rounded-r-xl space-y-6 border-4 border-l-0 border-amber-50 hover:scale-105 hover:shadow-xl/25 transition duration-100 ease-in-out">
                <div className="flex flex-col justify-center items-center gap-5 ">
                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            value="termOne"
                            checked={term === 'termOne'}
                            onChange={handleChange}
                            className="peer hidden"
                        />
                        <div
                            className=" flex items-center justify-center size-[3vw] rounded-full border-4 border-black peer-checked-bg-greenSelect bg-bgColor shadow-orange-800 shadow-xl/30
                            hover:bg-sidebar hover:border-sidebar hover:scale-110 transition duration-200 ease-in-out "
                        >
                            <FontAwesomeIcon
                                icon={fa1}
                                className="text-black text-2xl"
                            />
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            value="termTwo"
                            checked={term === 'termTwo'}
                            onChange={handleChange}
                            className="peer hidden"
                        />
                        <div
                            className=" flex items-center justify-center size-[3vw] rounded-full border-4 border-black peer-checked-bg-greenSelect bg-bgColor shadow-orange-800 shadow-xl/30
                            hover:bg-sidebar hover:border-sidebar hover:scale-110 transition duration-200 ease-in-out "
                        >
                            <FontAwesomeIcon
                                icon={fa2}
                                className="text-black text-2xl"
                            />
                        </div>
                    </label>

                    <div className=" flex items-center justify-center size-[3vw] rounded-full border-4 border-black bg-bgColor shadow-orange-800 shadow-xl/30 hover:bg-sidebar hover:border-sidebar hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
                        <FontAwesomeIcon
                            icon={faPen}
                            className="text-black text-2xl"
                        />
                    </div>

                    <div className=" flex items-center justify-center size-[3vw] rounded-full border-4 border-black bg-bgColor shadow-orange-800 shadow-xl/30 hover:bg-sidebar hover:border-sidebar hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
                        <FontAwesomeIcon
                            icon={faRobot}
                            className="text-black text-2xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
