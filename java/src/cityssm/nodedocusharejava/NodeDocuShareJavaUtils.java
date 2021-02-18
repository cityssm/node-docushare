package cityssm.nodedocusharejava;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.xerox.docushare.DSAuthorizationException;
import com.xerox.docushare.DSException;
import com.xerox.docushare.DSObject;

import ca.saultstemarie.dsjquery.DSJQuery;
import ca.saultstemarie.dsjquery.DSJQueryException;
import ca.saultstemarie.dsjquery.DSJQuerySessionHandler;

public class NodeDocuShareJavaUtils {
	
	public static void setupConnection (String[] args) throws NumberFormatException, DSJQueryException {
		DSJQuerySessionHandler.serverSetup(args[0], Integer.parseInt(args[1]));
		DSJQuerySessionHandler.sessionSetup(args[2], args[3], args[4]);
	}
	
 	public static JSONArray dsJQueryToJSONArray (DSJQuery ds) throws DSAuthorizationException, JSONException, DSException {
		
		JSONArray jsonArr = new JSONArray();
		
		for (DSObject dsObj : ds) {
			
			JSONObject jsonObj = new JSONObject();
			
			jsonObj.put("handle", dsObj.getHandle().toString());
			jsonObj.put("title", dsObj.getTitle());
			jsonObj.put("summary", dsObj.getSummary());
			jsonObj.put("description", dsObj.getDescription());
			jsonObj.put("keywords", dsObj.getKeywords());
			
			jsonObj.put("createDate", dsObj.getCreateDate());
			if (dsObj.getCreateDate() != null) {
				jsonObj.put("createDateMillis", dsObj.getCreateDate().getTime());
			}
			
			jsonObj.put("modifiedDate", dsObj.getModifiedDate());
			if (dsObj.getModifiedDate() != null) {
				jsonObj.put("modifiedDateMillis", dsObj.getModifiedDate().getTime());
			}
			
			jsonObj.put("expirationDate", dsObj.getExpirationDate());
			if (dsObj.getExpirationDate() != null) {
				jsonObj.put("expirationDateMillis", dsObj.getExpirationDate().getTime());
			}
			
			jsonArr.put(jsonObj);
		}
		
		return jsonArr;
	}
}
