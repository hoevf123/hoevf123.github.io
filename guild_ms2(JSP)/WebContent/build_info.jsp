<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.sql.*" %>
<% //request.setEncoding("utf-8"); %>
<% 
	//현재 페이지의 정보를 저장하는 코드
	String current_url = request.getRequestURI();
	session.setAttribute("_current_uri", current_url);
%>
<%
	
%>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>메이플2</title>
    <link rel="icon" href="메2 길드마크.png" type="image/png">
    <link rel="stylesheet" href="common.css">
</head>
<body>
    <header>
        <nav>
            <div class="navigator-area">
                <ul class="navbar-target1">
                    <li class="transparent"><a href="index.jsp" class="disable-default-font-color"><image class="guild_logo" src="메2 길드마크.png" alt="메2 메인페이지"></image></a></li>
                    <li class="red"><a href="guild_intro.jsp" class="disable-default-font-color"><p>길드소개</p></a>
                    <ul class="sub-menu">
                        <li><p>메2 길드란</p></li>
                        <li><p>길드 가입</p></li>
                        <li><p>구성원</p></li>
                    </ul>
                    </li>
                    <li class="orange"><a href="info_board.jsp" class="disable-default-font-color"><p>공지사항</p></a></li>
                    <li class="green"><a href="free_board.jsp" class="disable-default-font-color"><p>커뮤니티</p></a></li>
                    <li class="skyblue"><a href="records.jsp" class="disable-default-font-color"><p>자료실</p></a></li>
                    <li class="skyblue"><a href="build_info.jsp" class="disable-default-font-color"><p>제작정보</p></a></li>
                    <li class="skyblue"><p>공방아이템 제작소</p></li>
                    <li><p>메뉴</p></li>
                    <li class="disabled"><p>비활성화 항목</p></li>
                    <li class="right orange">
                        <p>메2 길드 계정</p>
                        <ul class="sub-menu open">
                        <!-- 세션 상태 넣을 위치 -->
                        <% 
                        String u_id = (String)session.getAttribute("user_id");
                        if(u_id == null){
                        	%>
                        	<li class="orange"><a href="login.jsp">로그인</a></li>
                            <li class="orange"><a href="create_account_form.jsp">회원가입</a></li>
                        	<%
                        }
                        else{
                        	%>
                        	<p><%= u_id %> 님, 환영합니다.</p>
                        	<li class="skyblue"> <a href="modify_account_info_form.jsp"><p>정보수정</p></a></li>
                        	<li class="skyblue"> <a href="logoutAction.jsp"> <p>로그아웃</p></a> </li>
                        	<%
                        }
                        %>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <section>
        <div class="div-content">
            <h1>제작 정보</h1>
            <h2>제작자</h2>
            <ul>
                <li>비숍의하루(본주 : 김동영)</li>
            </ul>
            <br/>
            <h2>사용 언어 및 도구</h2>
            <ul>
                <li><p>HTML5 :: 자체 제작(별도 프레임워크 사용하지 않음)</p></li>
                <li><p>CSS3 :: 자체 제작(별도 외부 CSS 파일 사용하지 않음)</p></li>
                <li><p>JSP :: (이 웹 사이트 버전 한정) 홈페이지의 전처리와 로그인, 세션 관리, (서버 단의)권한 제어를 담당하는 데 사용합니다.</p></li>
                <li><p>MySQL :: (이 웹 사이트 버전 한정) 홈페이지 운영에 필요한 데이터와 권한 등을 담는 데이터베이스로 사용합니다.</p></li>
                <li><p>font :: 경기천년체</p><p>다운로드(상용 목적 사용 가능 폰트)</p><a href="https://www.gg.go.kr/font"><p>https://www.gg.go.kr/font</p></a></li>
                <li><p>길드 로고 :: 길드 이미지를 인게임 내에서 스크린샷으로 캡처, 그림판 3D를 이용하여 자체 분리 및 편집</p></li>
                <li><p>편집기 :: Visual Studio Code</p></li>
                <li><p>기타 도구 :: Wacom Intuos CTL-4100WL(디지타이저 펜)</p></li>
            </ul>
            <br/>
            <h2>제작 목적</h2>
            <ul>
                <li><p>자기 만족(메이플스토리2 공식 홈페이지 따라하기)</p></li>
                <li><p>html 웹사이트 제작 연습용</p></li>
                <li><p>개인 Github 사이트 게시용</p><a href="../index.html"><p>https://hoevf123.github.io</p></a></li>
                <li><p>웹 개발(JSP, Spring Framework) 연습 및 취업용 포트폴리오 제작</p></li>
                <li><p>메2 뽕을 취하고 싶어서</p></li>
            </ul>
        </div>
    </section>
</body>