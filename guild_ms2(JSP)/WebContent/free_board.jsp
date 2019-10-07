<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.text.SimpleDateFormat" %>
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
    
    
    <!-- guild bulletin board page -->
    <section>
    <div class="info-buliten-board div-content">
	    <!-- Content Header -->
	      <h1>커뮤니티</h1>
	      <div class="search-bar-board-content">
	      		<!-- Search bar -->
	          <p>검색어</p>
	          <form method="GET" action="#" accept-charset="UTF-8">
	              <select>
	                  <option value='' selected>전체</option>
	                  <option value='board-title'>제목</option>
	                  <option value='board-author'>작성자</option>
	              </select>
	              <input type="text" placeholder="검색어를 입력하세요."/> <input type="submit" value="검색" >
	          </form>
	          <a href="write_board.jsp"><input type="button" value="글쓰기"></a>
		</div>
		<!-- Contents -->
		<%
	       Class.forName("com.mysql.jdbc.Driver");
	       String url = "jdbc:mysql://localhost:3306/db_ms2_guild";
	       String id = "root";
	       String pw = "root";
	       int total = 0;
	       
	       try{
	       	Connection conn = DriverManager.getConnection(url,id,pw);
	       	Statement stmt = conn.createStatement();
	       	
	       	/* 게시물의 개수를 확인하는 코드 */
	       	String sqlCount = "SELECT COUNT(*) FROM board where page_type='게시판'";
	       	ResultSet rs = stmt.executeQuery(sqlCount);
	       	
	       	if(rs.next()){
	       		total = rs.getInt(1);
	       	}
	       	rs.close();
	       	out.print("총 게시물 : "+ total + "개");
	       	
	       	
	       	/* 게시물의 내용을 확인하는 코드 */
	       	String sqlList = "SELECT page_no, page_title, page_author, page_write_date, page_hit, page_id FROM board where page_type='게시판' order by page_id desc;";
	       	rs = stmt.executeQuery(sqlList);
	       
	       %>
	       <!-- TODO : Write Your Content -->
	       <div name="bltn_board_content">
	        <table>
	        	<thead>
	                <tr>
	                    <td class="board-number">번호</td>
	                    <td class="board-title">제목</td>
	                    <td class="board-author">작성자</td>
	                    <td class="board-enroll-time">글쓴 시간</td>
	                    <td class="board-hit">조회수</td>
	                </tr>
	            </thead>
	        	<%
		        	if(total == 0){
		        %>
		        <tbody>
		        	<p>등록된 글이 없습니다.</p>
		        </tbody>
		        <%
		        	} 
		        	else{
			        %>
			        <!-- Board Contents from Database -->
			        <tbody>
			        <%
		        		while(rs.next()){
		        			int idx = rs.getInt(1);
		        			String title = rs.getString(2);
		        			String name = rs.getString(3);
		        			String time = new SimpleDateFormat("YYYY.MM.dd HH:mm:ss").format(rs.getTimestamp(4)).toString();
		        			int hit = rs.getInt(5);
		        			String page_id = rs.getString(6);
			        %>
			        <!-- 반복되는 코딩 부분 -->
			        
	                    <tr>
	                        <td class="board-number"><%=idx %></td>
	                        <td class="board-title"><a href="./board_content.jsp?page_id=<%= page_id %>"><%=title %></a></td>
	                        <td class="board-author"><%=name %></td>
	                        <td class="board-enroll-time"><%=time %></td>
	                        <td class="board-hit"><%=hit %></td>
	                    </tr>
	                
			        <%
			        	}
			        %>
		        	</tbody>
		        <%
			        }
			        rs.close();
			        stmt.close();
			        conn.close();
		        }catch(SQLException e){
		        	out.println(e.toString());
		        }
		        %>
		        </tbody>
        	</table>
	        <!-- Board Page Controller -->
	        <div>
	            <ul class="board-page-btns">
	                <li class="btn-page-move yellow"><a href="#"><p>◀◀</p></a></li>
	                <li class="btn-page-move yellow"><a href="#"><p>◀</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>1</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>2</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>3</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>4</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>5</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>6</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>7</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>8</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>9</p></a></li>
	                <li class="btn-page-move"><a href="#"><p>10</p></a></li>
	                <li class="btn-page-move yellow"><a href="#"><p>▶</p></a></li>
	                <li class="btn-page-move yellow"><a href="#"><p>▶▶</p></a></li>
	            </ul>
	        </div>
    	</div>
    	<div class="warning-tail">
    		<p>※ 저작권을 침해하는 UGC 게시글을 올리거나 미풍양속에 해치는 글을 올릴 경우 임의의 경고 없이 게시글이 삭제될 수 있습니다. ※</p>
    		<p>(절대 악보 관련 게시글을 올리지 마세요!)</p>
    	</div>
   	</div>
    </section>
    <!-- footer page -->
    <footer>
    	<div>
    		<p>제작자 : 비숍의하루</p>
		</div>
    </footer>
</body>