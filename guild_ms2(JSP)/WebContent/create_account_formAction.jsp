<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="ms2_guild.UserDAO" %>
<%@ page import="ms2_guild.Constant" %>

<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:useBean id="user" class="ms2_guild.User" scope="page" />
<jsp:useBean id="Constant" class="ms2_guild.Constant" scope="page"/>
<jsp:setProperty name="user" property="userID"/>
<jsp:setProperty name="user" property="userPassword"/>
<jsp:setProperty name="user" property="userName"/>
<jsp:setProperty name="user" property="userEmail"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
		UserDAO userDAO = new UserDAO();
		int result = userDAO.createAccount(user); //로그인 확인
		PrintWriter script = null;
		//로그인 결과 출력 :: 자바스크립트 적용 태그
		script = response.getWriter();
		script.println("<script>");
		
		//계정 생성 성공
		if(result == 1){
			script.println("alert(\"회원가입에 성공하였습니다. 로그인 페이지에서 로그인을 하시기 바랍니다.\");");
			script.println("location.href='index.jsp'");
		}
		//계정 생성 실패 :: 폼 양식 등의 불일치 등으로 인한 계정 생성 실패
		else if(result == Constant.USERDAO_CREATE_ACCOUNT_FAIL){
			script = response.getWriter();
			script.println("alert('계정 생성에 실패하였습니다. 계정 생성 양식을 충족하였는지 다시 한 번 확인하신 후에 회원가입을 시도해 주십시오.');");
			script.println("history.back();");
		}
		//계정 생성 실패 :: 이미 존재하는 아이디
		else if(result == Constant.USERDAO_CREATE_ACCOUNT_FAIL_BY_DUPLICATED_ID){
			script = response.getWriter();
			script.println("alert('이미 존재하는 아이디입니다. 다른 아이디로 회원가입을 시도해 주십시오.');");
			script.println("history.back();");
		}
		//계정 생성 과정에서 비정상 값 반환
		else{
			script = response.getWriter();
			script.println("alert('올바르지 않은 반환 값 오류입니다.');");
			script.println("history.back();");
		}
		
		script.println("</script>");
		
%>
</body>
</html>