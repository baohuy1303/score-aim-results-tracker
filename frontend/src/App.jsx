import './App.css'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import Layout from './components/Layout.jsx'
import { ScoreProvider } from './contexts/ScoreContext.jsx'

import AddSubjects from './pages/AddSubjects.jsx'
import SubjectInfo from './pages/SubjectInfo.jsx'

function App() {

/*
-----PAGES-----
Landing Page (Login)
Homepage:
  -if has score: display all the scores
  -else: page where users add subjects and scores
Individual scores:
  Display all 15min test, midterm, final term, average gpa
  Scores needed button: see what score is needed for a gpa
*/

  const userId = "68431e86529b6b4abc0048ee";
  const term = "";

  return (
    <ScoreProvider userID={userId} term={term}>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/add-subjects" element={<AddSubjects />} />
              <Route path='/home/:subjectName' element={<SubjectInfo/>}/>
          </Route>
      </Routes>
      </ScoreProvider>
  );
}

export default App
