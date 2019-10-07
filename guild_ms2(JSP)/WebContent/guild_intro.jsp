<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
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
        <div class="guild-introduction div-content">
            <h1>길드 소개</h1>
            <h2>메2 길드는</h2>
            <p>자유분방한 친목 위주 길드입니다.</p>
            <p>길드 레벨 : 13레벨</p>
            <p>카카오톡 방(공지톡, 수다톡) 참여와 디스코드 방 참여는 자유입니다.</p>
            <p>길드 레이드는 꾸준히 진행합니다. (길드 일일 퀘스트도 기회되면 꾸준히 합니다)</p>
            <p>길드원을 우선으로 선발하는 피파(발록), 50카오스 본부파티 상시 가동중입니다.</p>
            <p>(문의 : 슈만주파수)</p>
            <p>부캐 전용 길드 "메22"가 있으니, 다캐릭 유저이신 분도 들어오실 수 있습니다.</p>
            <br/>
            <p>※ 메이플2 GM은 "진짜GM입니다" GM 전용 길드에 있습니다. 우리 길드는 메이플스토리2 관계자와 아무런 관련이 없습니다. ※</p>
            <br/>
            <h2>길드 가입 조건</h2>
            <p>한국 나이 20세 이상(최소 대학생 이상!)</p>
            <p>메이플 월드의 사고뭉치(사건사고 게시판 스타, 비매너 유저)가 아닌 유저</p>
            <p>이중길드 x</p>
            <p>접속률 주 2회 이상 권장(아무런 통보 없이 <strong>14일 이상 접속</strong>을 하지 않으면 <strong>길드 탈퇴 사유</strong>가 됩니다)</p>
            <p>메이플 월드에서 적극적으로 생활하실 분을 선호합니다.</p>
            <br/>
            <h2>가입 문의</h2>
            <p>규규이 (메2 길드 길드장)</p>
            <p>슈밍(메2 길드 부길드장)</p>
            <p>꼬마(메2 길드 부길드장)</p>
            <p>슈만주파수</p>
            <p>귀요미나리</p>
            <br/>
        </div>
    </section>
</body>