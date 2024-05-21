import './App.css';
import TodoTemplate from './components/todo/TodoTemplate';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Join from './components/user/Join';
import Login from './components/user/Login';
import { AuthContextProvider } from './utils/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <div className="wrapper">
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<TodoTemplate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
