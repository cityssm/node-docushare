package cityssm.nodedocusharejava;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.xerox.docushare.DSAuthorizationException;
import com.xerox.docushare.DSException;
import com.xerox.docushare.DSObject;

import ca.saultstemarie.dsjquery.DSJQuery;

public class Tools {
	
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
			jsonObj.put("modifiedDate", dsObj.getModifiedDate());
			jsonObj.put("expirationDate", dsObj.getExpirationDate());
			
			jsonArr.put(jsonObj);
		}
		
		return jsonArr;
	}
}
