import './App.css'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import Layout from './components/Layout.jsx'
import { ScoreProvider } from './contexts/ScoreContext.jsx'

import AddSubjects from './pages/AddSubjects.jsx'
import SubjectInfo from './pages/SubjectInfo.jsx'
import AddScoreLog from './pages/AddScoreLog.jsx'
import Goals from './pages/Goals.jsx'
import ChatBot from './pages/ChatBot.jsx'

function App() {

  const term = "";

  return (
    <ScoreProvider term={term}>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/add-subjects" element={<AddSubjects />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/chatbot" element={<ChatBot />} />
              <Route path='/home/:subjectName' element={<SubjectInfo/>}/>
              <Route path='/home/:subject/:multiplier/:index' element={<AddScoreLog/>}/>
          </Route>
      </Routes>
      </ScoreProvider>
  );
}

export default App
