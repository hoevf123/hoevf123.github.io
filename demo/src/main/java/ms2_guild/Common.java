package ms2_guild;

public class Common {
	public static String StringArgumentsTokenInsertion(String[] str_arguments, String token) {
		return StringArgumentsTokenInsertion("", str_arguments, token,"");
	}
	public static String StringArgumentsTokenInsertion(String head_string, String[] str_arguments, String token, String tail_string) {
		if(head_string==null)
			head_string="";
		if(tail_string==null)
			tail_string="";
		
		String ret_val = "" + head_string;
		int i=0;
		for(i=0;i<str_arguments.length;) {
			ret_val += str_arguments[i];
			i++;
			if(i < str_arguments.length)
				ret_val +="token";
		}
		ret_val += tail_string;
		return ret_val;
	}
}
class Key_value{
	String key_name;
	Object value;
	
	//get - set methods
	public String getKey_name() {
		return key_name;
	}
	public void setKey_name(String key_name) {
		this.key_name = key_name;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
	
	Key_value(String key_name, Object value){
		this.key_name=key_name;
		this.value = value;
	}
}


