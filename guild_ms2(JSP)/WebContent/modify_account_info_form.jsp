<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<% //request.setEncoding("utf-8"); %>
<% //세션 정보 가져오기기
	String id = request.getParameter("user_id");
	
	//현재 페이지의 정보를 저장하는 코드
	//(이 페이지는 현재 정보가 저장되지 않습니다.)
	//String current_url = request.getRequestURI();
	//session.setAttribute("_current_uri", current_url);
%>

<!DOCTYPE html>
<head>
	<!-- Default HTML Metadata Setting -->
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
    <title>메이플2</title>
    <link rel="link" href="메2 길드마크.png">
    <!-- Bootstrap Setting -->
    <link rel="stylesheet" href="bootstrap-3.3.2-dist/css/bootstrap.min.css">
    
    <!-- Custom Style Setting -->
    <link rel="stylesheet" href="ms2_guild_template.css">
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
    
    
    <!-- guild page -->
    <section>
        <!-- TODO : Write Your Content -->
        <!-- Login Form -->
        <div class="container">
        	<form method="post" action="create_account_formAction.jsp">
        		<h3 style="text-align:center;">회원가입</h3>
        		<div class="form-group">
        			<p>아이디(변경 불가능)</p>
        			<p><%= (String)session.getAttribute("user_id") %></p>
        			<p>비밀번호(최대 20자)</p>
        			<input type="password" class="form-control" placeholder="비밀번호" name="userPassword" maxlength="20">
        			<p>별명(닉네임, 최대 8자)</p>
        			<input type="text" class="form-control" placeholder="별명" name="userID" value="" maxlength="8">
        			<p>*이메일</p>
        			<p>현재 사용 중인 이메일 :  </p>
        			<input type="email" class="form-control" placeholder="이메일(xxx@example.com)" name="userEmail">
        		</div>
        		<div class="form-group">
        			
        		</div>
        		<input type="submit" class="btn btn-primary form control center" value="정보수정">
        		<input type="button" value="뒤로 가기" alt="뒤로 가기" onclick="history.back();">
        	</form>
        </div>
    </section>
    <!-- footer page -->
    <footer>
    	<div>
    		<p>제작자 : 비숍의하루</p>
		</div>
    </footer>
</body>