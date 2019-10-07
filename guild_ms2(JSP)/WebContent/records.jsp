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
        <div class="div-content">
            <h1>자료실</h1>
            
            <p>준비 중입니다.</p>
            <br/>
        </div>
    </section>
</body>