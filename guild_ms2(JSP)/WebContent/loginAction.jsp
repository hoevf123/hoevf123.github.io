<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="ms2_guild.UserDAO" %>
<%@ page import="ms2_guild.Constant" %>
<%@ page import="java.io.PrintWriter" %>


<% request.setCharacterEncoding("UTF-8"); %>

<!-- 한명의 회원정보를 담는 user클래스를 자바 빈즈로 사용 / scope:페이지 현재의 페이지에서만 사용 -->
<!-- 출처: https://tbbrother.tistory.com/67 [밑끝없로그] -->
<jsp:useBean id="user" class="ms2_guild.User" scope="page"></jsp:useBean>
<jsp:setProperty name="user" property="userID" />
<jsp:setProperty name="user" property="userPassword" />


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		UserDAO userDAO = new UserDAO();
		int result = userDAO.login(user.getUserID(), user.getUserPassword()); //로그인 확인
		PrintWriter script = null;
		
		//로그인 결과 출력 :: 자바스크립트 적용 태그
		script = response.getWriter();
		script.println("<script>");
		
		//계정 로그인 성공
		if(result == Constant.USERDAO_LOGIN_SUCCESS){
			session.setAttribute("user_id", user.getUserID());
			session.setAttribute("user_name", user.getUserName());
			script.println("location.href='index.jsp'");
		}
		//계정 로그인 실패 :: 패스워드 불일치
		else if(result == Constant.USERDAO_PASSWORD_WRONG){
			script = response.getWriter();
			script.println("alert('비밀번호가 틀립니다.');");
			script.println("history.back();");
		}
		//계정 로그인 실패 :: 아이디가 존재하지 않음
		else if(result == Constant.USERDAO_ID_NOT_FOUND){
			script = response.getWriter();
			script.println("alert('존재하지 않는 아이디입니다.');");
			script.println("history.back();");
		}
		//계정 로그인 실패 :: 데이터베이스 내 오류(데이터베이스 연결 및 접근됨)
		else if(result == Constant.USERDAO_DATABASE_ERROR){
			script = response.getWriter();
			script.println("alert('데이터베이스 오류입니다.');");
			script.println("history.back();");
		}
		//계정 로그인 실패 :: 데이터베이스에 접근할 수 없음 (연결 실패 또는 데이터베이스를 찾을 수 없음)
		else if(result == Constant.USERDAO_DATABASE_CONNECTION_ERROR){
			script = response.getWriter();
			script.println("alert('데이터베이스가 연결되어 있지 않거나 올바르게 연결되어 있지 않습니다.\\n\\n홈페이지 관리자에게 로그인 데이터베이스가 작동되지 않는다고 문의를 넣어주세요.');");
			script.println("history.back();");
		}
		//계정 로그인 실패 :: 비정상 값 반환
		else{
			script = response.getWriter();
			script.println("alert('올바르지 않은 반환 값 오류입니다.');");
			script.println("history.back();");
		}
		
		script.println("</script>");
		
%>

</body>
</html>