import { useScoreContext } from '../contexts/ScoreContext.jsx';
import { useParams } from 'react-router-dom';

function AddScoreLog(){
    const { score, loading, unCamelCase } = useScoreContext();
    const {subject, multiplier, index} = useParams()


    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (<>
                    <h1>{score[subject][multiplier][index]}</h1>
                    <p>{multiplier} {index}</p>
                </>)}
        </>
    );
}

export default AddScoreLog