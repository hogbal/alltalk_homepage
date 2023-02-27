import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Save from "pages/WriteArticle/Save";
import ProfileCard from "components/ProfileCard/ProfileCard";

const Header = (props) => {
  const { landing, page, onTop } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const [headerCss, setHeaderCss] = useState(true);

  useEffect(() => {
    if (page === 0 || page === 2) setHeaderCss(true);
    else setHeaderCss(false);
  }, [page]);

  const onTopBtn = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header
      className="Header"
      style={{
        position: landing ? "fixed" : "relative",
        backgroundColor: headerCss && "transparent",
        transition: "all 0.5s",
        borderBottom: "0.1px solid #EEF1F4",
        display: landing ? "" : "flex",
      }}
      onClick={onTopBtn}
    >
      <div
        className="title"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", color: headerCss && "#ffffff" }}
      >
        ALL TALK
      </div>

      <div className="header-left">
        {pathname !== "/WriteArticle" && (
          <nav>
            <ul>
              <Link to="/" style={{ textDecoration: "none" }}>
                <li
                  style={
                    pathname === "/"
                      ? { color: "#00cb8e" }
                      : { color: headerCss ? "#ffffff" : "#191919" }
                  }
                >
                  콘텐츠
                </li>
              </Link>
              <Link to="/story" style={{ textDecoration: "none" }}>
                <li
                  style={
                    pathname === "/story"
                      ? { color: "#00cb8e" }
                      : { color: headerCss ? "#ffffff" : "#191919" }
                  }
                >
                  스토리
                </li>
              </Link>
              {pathname === "/Introduction" ? (
                <li
                  onClick={onTop}
                  style={
                    pathname === "/Introduction"
                      ? { color: "#00cb8e" }
                      : { color: headerCss ? "#ffffff" : "#191919" }
                  }
                >
                  기업소개
                </li>
              ) : (
                <Link to="/Introduction" style={{ textDecoration: "none" }}>
                  <li
                    style={
                      pathname === "/Introduction"
                        ? { color: "#00cb8e" }
                        : { color: headerCss ? "#ffffff" : "#191919" }
                    }
                  >
                    기업소개
                  </li>
                </Link>
              )}
            </ul>
          </nav>
        )}
        <span className="login-container">
          {pathname === "/WriteArticle" ? (
            <>
              <button className="loadBtn">불러오기</button>
              <button
                className="loginBtn"
                style={{
                  backgroundColor: headerCss && "transparent",
                  color: headerCss ? "#ffffff" : "#616269",
                }}
                onClick={() => navigate("/SignIn")}
              >
                임시저장
              </button>
              <button
                className="signUpBtn"
                style={{
                  backgroundColor: headerCss && "transparent",
                }}
                onClick={() => navigate("/SignUp")}
              >
                업로드
              </button>
            </>
          ) : (
            <>
              {localStorage.getItem("login") ? (
                <>
                  <button
                    className="loginBtn"
                    style={{
                      backgroundColor: headerCss && "transparent",
                      color: headerCss ? "#ffffff" : "#616269",
                    }}
                    onClick={() => navigate("/WriteArticle")}
                  >
                    새 스토리 작성
                  </button>
                  <button
                    className="profileBtn"
                    style={{
                      backgroundColor: headerCss && "transparent",
                    }}
                    // onClick={() => navigate("/Mypage")}
                  ></button>
                  <ProfileCard />
                </>
              ) : (
                <>
                  <button
                    className="loginBtn"
                    style={{
                      backgroundColor: headerCss && "transparent",
                      color: headerCss ? "#ffffff" : "#616269",
                    }}
                    onClick={() => navigate("/SignIn")}
                  >
                    로그인
                  </button>
                  <button
                    className="signUpBtn"
                    style={{
                      backgroundColor: headerCss && "transparent",
                    }}
                    onClick={() => navigate("/SignUp")}
                  >
                    회원가입
                  </button>
                </>
              )}
            </>
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
