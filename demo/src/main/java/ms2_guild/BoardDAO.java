package ms2_guild;
import java.sql.*;

public class BoardDAO extends CommonDAO {
	public int create(String userID, String page_type, String title, String page_data) {
		String tb_board = "board";
		Key_value[] param = new Key_value[4];
		param[0] = new Key_value("page_author",userID);
		param[1] = new Key_value("page_type", page_type);
		param[2] = new Key_value("page_title", title);
		param[3] = new Key_value("page_datas", page_data);
		return insert(tb_board, param);
	}
	public void read() {
		
	}
	public void update() {
		
	}
	public void delete() {
		
	}
	public int getCount(String tb_board) {
		return getCount(tb_board, null);
	}
	public int getCount(String tb_board,String page_type) {
		int ret_val = 0;
		ResultSet rs = null;
		String sqlCount = "SELECT COUNT(*) FROM `" + tb_board + "`";
		if(page_type == null) {
			rs = select(sqlCount);
		}
		else {
			sqlCount +=" WHERE page_type=?";
			rs = select(sqlCount,page_type);
		}
		try {
			ret_val = rs.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       	return ret_val;
	}
	public boolean isUserExist(User user) {
		return isUserExist(user.getUserID());
	}
	public boolean isUserExist(String user_name) {
		if(user_name == null)
			user_name = "";
		if(user_name.trim().contentEquals(""))//�ǹ� ���� ���� �Է��� ����ڰ� �������� ����
			return false;
		
		user_name = SQLInjectionProtectedString(user_name);
		
		String SQL = "SELECT COUNT(*) from user WHERE user_id='" + user_name + "'"; 
		try {
			pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			int user_exists = rs.getInt(1);
			if(user_exists == 0)
				return true;
			else
				return false;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
}
