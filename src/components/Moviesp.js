import React, { useEffect, useState } from "react";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderContainer from "../containers/common/HeaderContainer";
import Responsive from "./common/Responsive";
import Movie1 from "./movie1";
import Moviep from "./Moviep";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

// Moviedb API 변수에 담기
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=5ac98f6f7b17843411c28fee7fc3b003&language=ko-KR";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=5ac98f6f7b17843411c28fee7fc3b003&language=ko-KR&query=";

function Moviesp(user, onLogout) {
  // movies Array 생성
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  // 영화정보 API호출
  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // 검색 API호출
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //상단 배너 홈아이콘
  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            <h1 className="/home">
              Movie<span className="view">View</span>
            </h1>
          </Link>
          <ul>
            <li>
              <Link className="page1" to="/upcoming">
                <MdLocalMovies />
                개봉예정작
              </Link>
            </li>
            <Movie1 />
          </ul>
        </div>
        {/* 검색창 */}
        <form onSubmit={handleOnSubmit}>
          <div className="msearch">
            <input
              className="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
            <HeaderContainer />
          </div>
        </form>
      </header>
      {/* 영화정보 */}
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Moviep key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default Moviesp;
