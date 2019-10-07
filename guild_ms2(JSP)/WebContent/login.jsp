<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- Bootstrap Setting -->
    <link rel="stylesheet" href="bootstrap-3.3.2-dist/css/bootstrap.min.css">
<!-- Custom Style Setting -->
    <link rel="stylesheet" href="ms2_guild_template.css">
<title>Insert title here</title>
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
                    <li><p>무언가(추가 예정)</p></li>
                    <li><p>메뉴</p></li>
                    <li class="disabled"><p>비활성화 항목</p></li>
                    <li class="right orange">
                        <p>메2 길드 계정</p>
                        <ul class="sub-menu open">
                        <!-- 세션 상태 넣을 위치 -->
                            <li class="orange">로그인</li>
                            <li class="orange">회원가입</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
<!-- login form -->
    <section>
    <div class="container">
    	<form method="post" action="loginAction.jsp">
		    <h3 style="text-align:center;">로그인화면</h3>
		    <div class="form-group center">
		    	<input type="text" class="form-control" placeholder="아이디" name="userID" maxlength="20">
		    </div>
		    <div class="form-group center">
		    	<input type="password" class="form-control" placeholder="비밀번호" name="userPassword" maxlength="20">
		    </div>
		    <input type="submit" class="btn btn-primary form-control" value="로그인">
	    </form>
	    <a href="join.jsp"><input type="button" value="회원가입"></a>
    </div>
    	
    </section>
    
    
    <!-- footer page -->
    <footer>
    	<div>
    		<p>제작자 : 비숍의하루</p>
		</div>
    </footer>
</body>
</html>