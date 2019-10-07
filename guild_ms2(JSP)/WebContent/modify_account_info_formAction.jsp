<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="ms2_guild.UserDAO" %>
<% //request.setEncoding("utf-8"); %>
<% //세션 정보 가져오기기
	String id = request.getParameter("user_id");
	if(id == null){
		out.print("<script>alert('이 역할은 로그인을 하여야 수행이 가능합니다'); history.back()</script>");
	}

	String params[] = new String[4];
	params[0] = request.getParameter("userID");
	params[1] = request.getParameter("userPassword");
	params[2] = request.getParameter("userAlias");
	params[3] = request.getParameter("userEmail");
	
%>