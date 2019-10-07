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
		
		//null ���ڿ��� �������� �ٲ� ����
		if(userID == null) 
			userID = "";
		if(userPassword == null) 
			userPassword="";
		
		if(conn==null) {
			//���� �α��� ���� :: �����ͺ��̽��� ������ �� ���� (���� ���� �Ǵ� �����ͺ��̽��� ã�� �� ����)
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
					//���� �α��� ����
					record(userID,"USER_LOGIN_SUCCEED");
					return Constant.USERDAO_LOGIN_SUCCESS;
				}
				else {
					//���� �α��� ���� :: �н����� ����ġ
					return Constant.USERDAO_PASSWORD_WRONG;//��й�ȣ ����ġ
				}
			}
			//���� �α��� ���� :: ���̵� �������� ����
			return Constant.USERDAO_ID_NOT_FOUND;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			//���� �α��� ���� :: �����ͺ��̽� �� ����(�����ͺ��̽� ���� �� ���ٵ�)
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
					//���� �α��� ����
					return true;
				}
			}
			//���� �α��� ���� :: ���̵� �������� ����
			return false;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			//���� �α��� ���� :: �����ͺ��̽� �� ����(�����ͺ��̽� ���� �� ���ٵ�)
			return false;
		}
	}
	private boolean validateUserID(String user_id) {
		if(user_id == null)
			user_id = "";
		if(user_id.trim().contentEquals(""))//�ǹ� ���� ���� �Է��� ����ڰ� �������� ����
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
			//���� ���� ���� :: �̹� �����ϴ� ���̵�
			return Constant.USERDAO_CREATE_ACCOUNT_FAIL_BY_DUPLICATED_ID;
		Key_value[] params = new Key_value[4];
		params[0] = new Key_value("user_id",user.getUserID());
		params[1] = new Key_value("user_pw",user.getUserPassword());
		params[2] = new Key_value("user_name",user.getUserName());
		params[3] = new Key_value("user_email",user.getUserEmail());
		
		int creation_rows = insert(tb_user_name, params);

		if(1 > creation_rows){
			//���� ���� ����
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
		// String sql_head = "UPADTE USER ";
		// String sql_mid = "SET ";
		// String sql_tail = "WHERE user_id = ?";
		// executeUpdate("UPDATE user SET ?=? WHERE user_id=?;");
		return 0;
	}
}
