<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="ms2_guild.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>

<% String current_uri = (String)request.getParameter("_current_uri"); %>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<%	session.invalidate(); %>
	<script>
		alert("로그아웃이 되었습니다.");
		<% 
			if(current_uri == null){
				%>
				location.href="index.jsp";
				<%
			}
			else{
				%>location.href=<%=current_uri%>;<%
			}
		%>
	</script>

</body>
</html>