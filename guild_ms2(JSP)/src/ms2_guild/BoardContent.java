package ms2_guild;

public class BoardContent {
	int page_no;
	
	String page_title;
	String page_author;
	int page_view;
	String page_url;
	byte[] page_datas;
	int page_like;
	String page_type;
	int page_hidden;
	int page_id;
	
	public BoardContent(
			String page_title,
			String page_author,
			int page_view,
			String page_url,
			byte[] page_datas,
			int page_like,
			String page_type,
			int page_hidden,
			int page_id) {
		this.page_title=page_title;
		this.page_author=page_author;
		this.page_view=page_view;
		this.page_url=page_url;
		this.page_datas=page_datas;
		this.page_like=page_like;
		this.page_type=page_type;
		this.page_hidden=page_hidden;
		this.page_id=page_id;
	}
	public BoardContent(
			String page_title,
			String page_author,
			byte[] page_datas,
			String page_type,
			int page_hidden
			) {
			this(
				page_title,
				page_author,
				0,//page_like
				null,
				page_datas,
				0,
				page_type,
				page_hidden
				,0);
	}
	
	//auto generated getter/setter method
	public int getPage_no() {
		return page_no;
	}
	public void setPage_no(int page_no) {
		this.page_no = page_no;
	}
	public String getPage_title() {
		return page_title;
	}
	public void setPage_title(String page_title) {
		this.page_title = page_title;
	}
	public String getPage_author() {
		return page_author;
	}
	public void setPage_author(String page_author) {
		this.page_author = page_author;
	}
	public int getPage_view() {
		return page_view;
	}
	public void setPage_view(int page_view) {
		this.page_view = page_view;
	}
	public String getPage_url() {
		return page_url;
	}
	public void setPage_url(String page_url) {
		this.page_url = page_url;
	}
	public byte[] getPage_datas() {
		return page_datas;
	}
	public void setPage_datas(byte[] page_datas) {
		this.page_datas = page_datas;
	}
	public int getPage_like() {
		return page_like;
	}
	public void setPage_like(int page_like) {
		this.page_like = page_like;
	}
	public String getPage_type() {
		return page_type;
	}
	public void setPage_type(String page_type) {
		this.page_type = page_type;
	}
	public int getPage_hidden() {
		return page_hidden;
	}
	public void setPage_hidden(int page_hidden) {
		this.page_hidden = page_hidden;
	}
	public int getPage_id() {
		return page_id;
	}
	public void setPage_id(int page_id) {
		this.page_id = page_id;
	}
}