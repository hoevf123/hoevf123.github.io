<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="ms2_guild.BoardDAO" %>
<%@ page import="ms2_guild.Constant" %>

<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:useBean id="user" class="ms2_guild.User" scope="page" />
<jsp:useBean id="Constant" class="ms2_guild.Constant" scope="page"/>
<jsp:setProperty name="user" property="userID"/>
<jsp:setProperty name="user" property="userName"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
		BoardDAO boardDAO = new BoardDAO();
		String user_id = (String)session.getAttribute("user_id");
		String board_title = request.getParameter("board-title");
		String board_content = request.getParameter("board-content");
		
		int result = boardDAO.create(user_id, "게시판", board_title, board_content); //로그인 확인
		PrintWriter script = null;
		//로그인 결과 출력 :: 자바스크립트 적용 태그
		script = response.getWriter();
		script.println("<script>");
		
		//계정 생성 성공
		if(result == 1){
			script.println("alert(\"게시글을 성공적으로 작성하였습니다.\");");
			script.println("location.href='index.jsp'");
		}
		//계정 생성 실패 :: 폼 양식 등의 불일치 등으로 인한 계정 생성 실패
		else if(result == Constant.USERDAO_CREATE_ACCOUNT_FAIL){
			script = response.getWriter();
			script.println("alert('게시글 작성이 실패하였습니다. 이 경우에는 관리자에게 문의를 부탁드립니다.');");
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