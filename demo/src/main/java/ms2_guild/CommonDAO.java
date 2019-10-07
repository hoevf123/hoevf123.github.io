package ms2_guild;
import java.sql.*;

public class CommonDAO {
	protected Connection conn;
	protected PreparedStatement pstmt;
	protected ResultSet rs;
	
	//������
	public boolean initDBConnection(String dbURL, String dbID, String dbPassword) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL,dbID,dbPassword);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	public CommonDAO(String dbURL, String dbID, String dbPassword) {
		initDBConnection(dbURL, dbID, dbPassword);
	}
	public CommonDAO() {
		String _default_db_addr = "jdbc:mysql://localhost:3306/db_ms2_guild";
		String _default_db_id = "root";
		String _default_db_pw = "root"; 
		initDBConnection(_default_db_addr,_default_db_id,_default_db_pw);
	}
	
	public ResultSet select(String sql, String ...column_values) {
		try {
			pstmt = conn.prepareStatement(sql);
			int i=0;
			if(column_values != null) {
				for(String arg: column_values) {
					++i;
					pstmt.setString(i, arg);
				}
			}
			rs = pstmt.executeQuery();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return rs;
	}
	
	public int insert(String table_name, Key_value[] key_name_set) {
		int ret_val = 0;
		// Sequence of Making SQL phrase.
		String sql = "INSERT INTO " + table_name + "(";
		String value_str = " VALUES(";
		// INSERT INTO(~~~~)
		if(key_name_set != null) {
			for(Key_value arg :key_name_set) {
				//column names
				sql += "`"+SQLInjectionProtectedString(arg.getKey_name()) + "`";
				sql += ",";
				//values
				value_str += "?,";
			}
			//remove last token
			sql = sql.substring(0, sql.length() -1);
			value_str = value_str.substring(0, value_str.length()-1);
		}
		sql += ")";
		value_str += ");";
		
		// make complete phrase to execute SQL;
		sql = sql + value_str;
		System.out.println("Made SQL : " + sql);
		
		
		//SQL execute Sequence
		try {
			pstmt = conn.prepareStatement(sql);
			int i = 0;
			if(key_name_set != null) {
				for(;i<key_name_set.length;) {
					++i;
					if(key_name_set[i-1]==null)
						continue;
					Object target_value = key_name_set[i-1].getValue();
					System.out.println("This param : " + target_value  + " idx : " + Integer.toString(i));
					//System.out.println("Key : " + key_name_set[i-1].getKey_name() + " Val : " + target_value + " Type : " + target_value.getClass().toString());
					if(target_value == null);
					else if(target_value instanceof String) {
						
						pstmt.setString(i,(String)target_value);
					}
					else if(target_value instanceof Integer) {
						pstmt.setInt(i, (Integer)target_value);
					}
					else if(target_value instanceof Float) {
						pstmt.setFloat(i, (Float)target_value);
					}
					else if(target_value instanceof Double) {
						pstmt.setDouble(i, (Double)target_value);
					}
					else if(target_value instanceof Date) {
						pstmt.setDate(i, (Date)target_value);
					}
					else {
						pstmt.setObject(i, target_value);
					}
				}
			}
			ret_val = pstmt.executeUpdate();
			pstmt.execute("COMMIT;");
			pstmt.clearParameters();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return ret_val;
	}
	
	public int executeUpdate(String sql, String ...column_values) {
		int ret_val = 0;
		try {
			pstmt = conn.prepareStatement(sql);
			int i=0;
			if(column_values != null) {
				for(String arg: column_values) {
					++i;
					pstmt.setObject(i, arg);
				}
			}
			ret_val = pstmt.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return ret_val;
	}
	
	public String SQLInjectionProtectedString(String target_string) {
		if(target_string==null)
			return "";
		return (String)target_string.replace("'", "''");
	}
}
