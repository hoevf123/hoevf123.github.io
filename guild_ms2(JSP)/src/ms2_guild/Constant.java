package ms2_guild;

//note : package private class
public class Constant {
	//���ڿ� ���� ��� ��Ʈ ���
	public static final int USER_STATUS_DEFAULT = 0;
	public static final int USER_ID_OK = 1;
	public static final int USER_PW_OK = 2;
	public static final int USER_NAME_OK = 4;
	public static final int USER_EMAIL_OK = 8;
	public static final int USER_VALIDATE_PASS = USER_ID_OK + USER_PW_OK + USER_NAME_OK + USER_EMAIL_OK;
	
	//���� �α��� ���� ���
	public static final int USERDAO_LOGIN_SUCCESS = 1;	//���� �α��� ����
	public static final int USERDAO_PASSWORD_WRONG = 0;	//���� �α��� ���� :: �н����� ����ġ
	public static final int USERDAO_ID_NOT_FOUND = -1;	//���� �α��� ���� :: ���̵� �������� ����
	public static final int USERDAO_DATABASE_ERROR = -2;//���� �α��� ���� :: �����ͺ��̽� �� ����(�����ͺ��̽� ���� �� ���ٵ�)
	public static final int USERDAO_DATABASE_CONNECTION_ERROR = -3;	//���� �α��� ���� :: �����ͺ��̽��� ������ �� ���� (���� ���� �Ǵ� �����ͺ��̽��� ã�� �� ����)
	
	//���� ���� ���� ���
	public static final int USERDAO_CREATE_ACCOUNT_SUCCESS = 1;	//���� ���� ����
	public static final int USERDAO_CREATE_ACCOUNT_FAIL = 0;	//���� ���� ����
	public static final int USERDAO_CREATE_ACCOUNT_FAIL_BY_DUPLICATED_ID = -4;	//���� ���� ���� :: �̹� �����ϴ� ���̵�
	
	//�Խ��� ���� ���� ���
	public static final int BOARDDAO_CREATE_BOARD_CONTENT_SUCCESS = 1;		//�Խ��� �� ���� ����
	public static final int BOARDDAO_CREATE_BOARD_CONTENT_FAIL = 0;			//�Խ��� �� ���� ����
	public static final int BOARDDAO_CREATE_BOARD_USER_NOT_FOUND = -1;		//�Խ����� �ۼ��� ����ڰ� ����
	public static final int BOARDDAO_CREATE_BOARD_CONTENT_NOT_AUTHORIZED = -4; //�Խ��� �ۼ� ���� ����
	
	//�Խ��� ��� ���� ���
	public static final int BOARDDAO_CREATE_COMMENT_SUCCESS = 1;			//�Խ��� ��� �ۼ� ����
	public static final int BOARDDAO_CREATE_COMMENT_FAIL = 0 ;				//�Խ��� ��� �ۼ��� ������.
	public static final int BOARDDAO_CREATE_COMMENT_USER_NOT_FOUND = -1;	//�Խ��� ����� �ۼ��� ����ڰ� ����
	public static final int BOARDDAO_BOARD_CONTENT_NOT_FOUND = -2;			//�Խ��� ����� �ۼ��� �Խñ��� ���ų� �����
	public static final int BOARDDAO_CREATE_COMMENT_NOT_AUTHORIZED = -4;	//�Խ��� ��� �ۼ� ���� ����
}
