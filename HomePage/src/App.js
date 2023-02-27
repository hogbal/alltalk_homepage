import "./App.css";

import Main from "pages/Main/Main";

import Layout from "components/Layout/Layout";
import StoryList from "pages/StoryList/StoryList";
import WriteArticle from "pages/WriteArticle/WriteArticle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";
import SignUpInput from "components/SignUpInput/SignUpInput";
import StoryDetail from "pages/StoryDetail/StoryDetail";
import Mypage from "pages/Mypage/Mypage";
import ProfileSetting from "pages/ProfileSetting/ProfileSetting";

import Introduction from "pages/Introduction/Introduction";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/WriteArticle" element={<WriteArticle />}></Route>
            <Route path="/Introduction" element={<Introduction />}></Route>
            <Route path="/story" element={<StoryList />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/SignUpInput" element={<SignUpInput />}></Route>
            <Route path="/Mypage" element={<Mypage />}></Route>
            <Route path="/ProfileSetting" element={<ProfileSetting />}></Route>
            <Route path="/StoryDetail" element={<StoryDetail />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
