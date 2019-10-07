package ms2_guild;
import java.sql.*;

public class UserDAO extends ms2_guild.CommonDAO {
	String tb_record_name = "login_record";
	String tb_user_name = "user";
	
	public UserDAO(String dbURL, String dbID, String dbPassword) {
		super(dbURL, dbID, dbPassword);
	}
	public UserDAO() {
		super();
	}
	
	public int record() {
		return record(null,null);
	}
	
	public int record(String user_id, String action) {
		Key_value[] params = new Key_value[2];
		params[0] = new Key_value("user_id", user_id);
		params[1] = new Key_value("action", action);
		return insert(tb_record_name,params);
	}
	public int login(String userID, String userPassword) {
		//login_log
		record(userID,"USER_LOGIN_TRY");
		
		//null 문자열은 공백으로 바꿔 놓기
		if(userID == null) 
			userID = "";
		if(userPassword == null) 
			userPassword="";
		
		if(conn==null) {
			//계정 로그인 실패 :: 데이터베이스에 접근할 수 없음 (연결 실패 또는 데이터베이스를 찾을 수 없음)
			return Constant.USERDAO_DATABASE_CONNECTION_ERROR;
		}
		if(!isUserExist(userID)) {
			return Constant.USERDAO_ID_NOT_FOUND;
		}
		
		try {
			rs = select("SELECT user_pw FROM USER WHERE user_id = ?",userID);
			if(rs.next()) {
				String MatchedString = rs.getString(1);
				if(MatchedString ==null) {
					MatchedString = "";
				}
				if(MatchedString.contentEquals(userPassword)) {
					//계정 로그인 성공
					record(userID,"USER_LOGIN_SUCCEED");
					return Constant.USERDAO_LOGIN_SUCCESS;
				}
				else {
					//계정 로그인 실패 :: 패스워드 불일치
					return Constant.USERDAO_PASSWORD_WRONG;//비밀번호 불일치
				}
			}
			//계정 로그인 실패 :: 아이디가 존재하지 않음
			return Constant.USERDAO_ID_NOT_FOUND;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			//계정 로그인 실패 :: 데이터베이스 내 오류(데이터베이스 연결 및 접근됨)
			return Constant.USERDAO_DATABASE_ERROR;
		}
	}
	
	public boolean isUserIdExist(String userID) {
		try {
			rs = select("SELECT user_id FROM USER WHERE user_id = ?",userID);
			if(rs.next()) {
				String MatchedString = rs.getString(1);
				if(MatchedString ==null) {
					MatchedString = "";
				}
				if(MatchedString.contentEquals(userID)) {
					//계정 로그인 성공
					return true;
				}
			}
			//계정 로그인 실패 :: 아이디가 존재하지 않음
			return false;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			//계정 로그인 실패 :: 데이터베이스 내 오류(데이터베이스 연결 및 접근됨)
			return false;
		}
	}
	private boolean validateUserID(String user_id) {
		if(user_id == null)
			user_id = "";
		if(user_id.trim().contentEquals(""))//의미 없는 공백 입력은 사용자가 존재하지 않음
			return false;
		return true;
	}
	private boolean validateUserPassword(String user_pw) {
		return true;
	}
	private boolean validateUserName(String user_name) {
		return true;
	}
	private boolean validateUserEmail(String user_email) {
		return true;
	}
	

	private int validateUser(User user) {
		int status = Constant.USER_STATUS_DEFAULT;
		if(validateUserID(user.getUserID()))
			status += Constant.USER_ID_OK;
		if(validateUserPassword(user.getUserPassword()))
			status += Constant.USER_PW_OK;
		if(validateUserName(user.getUserName()))
			status += Constant.USER_NAME_OK;
		if(validateUserEmail(user.getUserEmail()))
			status += Constant.USER_EMAIL_OK;
		
		return status;
	}
	
	private boolean isValidateUser(User user) {
		if(validateUser(user) == Constant.USER_VALIDATE_PASS)
			return true;
		else
			return false;
	}
	public int createAccount(User user) {
		if(false == isValidateUser(user))
			//계정 생성 실패 :: 이미 존재하는 아이디
			return Constant.USERDAO_CREATE_ACCOUNT_FAIL_BY_DUPLICATED_ID;
		Key_value[] params = new Key_value[4];
		params[0] = new Key_value("user_id",user.getUserID());
		params[1] = new Key_value("user_pw",user.getUserPassword());
		params[2] = new Key_value("user_name",user.getUserName());
		params[3] = new Key_value("user_email",user.getUserEmail());
		
		int creation_rows = insert(tb_user_name, params);

		if(1 > creation_rows){
			//계정 생성 실패
			return Constant.USERDAO_CREATE_ACCOUNT_FAIL;
		}
		return Constant.USERDAO_CREATE_ACCOUNT_SUCCESS;
	}
	public boolean isUserExist(User user) {
		return isUserExist(user.getUserID());
	}
	public boolean isUserExist(String user_name) {
		return isUserIdExist(user_name);
	}
	
	public int modifyUser(String user_id, String param, String value) {
		String sql_head = "UPADTE USER ";
		String sql_mid = "SET ";
		String sql_tail = "WHERE user_id = ?";
		executeUpdate("UPDATE user SET ?=? WHERE user_id=?;");
		return 0;
	}
}
