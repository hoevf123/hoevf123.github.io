package ms2_guild;

//note : package private class
public class Constant {
	//문자열 검증 통과 비트 상수
	public static final int USER_STATUS_DEFAULT = 0;
	public static final int USER_ID_OK = 1;
	public static final int USER_PW_OK = 2;
	public static final int USER_NAME_OK = 4;
	public static final int USER_EMAIL_OK = 8;
	public static final int USER_VALIDATE_PASS = USER_ID_OK + USER_PW_OK + USER_NAME_OK + USER_EMAIL_OK;
	
	//계정 로그인 상태 상수
	public static final int USERDAO_LOGIN_SUCCESS = 1;	//계정 로그인 성공
	public static final int USERDAO_PASSWORD_WRONG = 0;	//계정 로그인 실패 :: 패스워드 불일치
	public static final int USERDAO_ID_NOT_FOUND = -1;	//계정 로그인 실패 :: 아이디가 존재하지 않음
	public static final int USERDAO_DATABASE_ERROR = -2;//계정 로그인 실패 :: 데이터베이스 내 오류(데이터베이스 연결 및 접근됨)
	public static final int USERDAO_DATABASE_CONNECTION_ERROR = -3;	//계정 로그인 실패 :: 데이터베이스에 접근할 수 없음 (연결 실패 또는 데이터베이스를 찾을 수 없음)
	
	//계정 생성 상태 상수
	public static final int USERDAO_CREATE_ACCOUNT_SUCCESS = 1;	//계정 생성 성공
	public static final int USERDAO_CREATE_ACCOUNT_FAIL = 0;	//계정 생성 실패
	public static final int USERDAO_CREATE_ACCOUNT_FAIL_BY_DUPLICATED_ID = -4;	//계정 생성 실패 :: 이미 존재하는 아이디
	
	//게시판 생성 상태 상수
	public static final int BOARDDAO_CREATE_BOARD_CONTENT_SUCCESS = 1;		//게시판 글 생성 성공
	public static final int BOARDDAO_CREATE_BOARD_CONTENT_FAIL = 0;			//게시판 글 생성 실패
	public static final int BOARDDAO_CREATE_BOARD_USER_NOT_FOUND = -1;		//게시판을 작성할 사용자가 없음
	public static final int BOARDDAO_CREATE_BOARD_CONTENT_NOT_AUTHORIZED = -4; //게시판 작성 권한 없음
	
	//게시판 댓글 상태 상수
	public static final int BOARDDAO_CREATE_COMMENT_SUCCESS = 1;			//게시판 댓글 작성 성공
	public static final int BOARDDAO_CREATE_COMMENT_FAIL = 0 ;				//게시판 댓글 작성에 실패함.
	public static final int BOARDDAO_CREATE_COMMENT_USER_NOT_FOUND = -1;	//게시판 댓글을 작성할 사용자가 없음
	public static final int BOARDDAO_BOARD_CONTENT_NOT_FOUND = -2;			//게시판 댓글을 작성할 게시글이 없거나 사라짐
	public static final int BOARDDAO_CREATE_COMMENT_NOT_AUTHORIZED = -4;	//게시판 댓글 작성 권한 없음
}
