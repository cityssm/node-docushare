package cityssm.nodedocusharejava;

import org.json.JSONObject;

import com.xerox.docushare.DSException;

import ca.saultstemarie.dsjquery.DSJQuery;
import ca.saultstemarie.dsjquery.DSJQueryException;
import ca.saultstemarie.dsjquery.DSJQuerySessionHandler;

public class SetKeywords {

	public static void main (String[] args) throws NumberFormatException, DSJQueryException, DSException, InterruptedException {
		
		try {
			NodeDocuShareJavaUtils.setupConnection(args);
			
			new DSJQuery("#" + args[5]).attr("Object.keywords", args[6]);
			
			DSJQuery ds = new DSJQuery("#" + args[5]);

			JSONObject json = new JSONObject();
			
			json.put("success", true);
			json.put("dsObjects", NodeDocuShareJavaUtils.dsJQueryToJSONArray(ds));
			
			System.out.print(json.toString());
		}
		finally {
			DSJQuerySessionHandler.closeOpenSessions();
		}
	}
}
