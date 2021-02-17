package cityssm.nodedocusharejava;

import org.json.JSONArray;
import org.json.JSONObject;

import com.xerox.docushare.DSException;

import ca.saultstemarie.dsjquery.DSJQuery;
import ca.saultstemarie.dsjquery.DSJQueryException;
import ca.saultstemarie.dsjquery.DSJQuerySessionHandler;

public class DeleteObject {

	public static void main (String[] args) throws NumberFormatException, DSJQueryException, DSException, InterruptedException {
		
		try {
			DSJQuerySessionHandler.serverSetup(args[0], Integer.parseInt(args[1]));
			DSJQuerySessionHandler.sessionSetup(args[2], args[3], args[4]);
			
			DSJQuery ds = new DSJQuery("#" + args[5]);
			
			boolean success = false;
			
			if (ds.length() == 1) {
				ds.remove();
				success = true;
			}
			
			JSONObject json = new JSONObject();
						
			json.put("success", success);
			json.put("dsObjects", new JSONArray());
			
			System.out.print(json.toString());
		}
		finally {
			DSJQuerySessionHandler.closeOpenSessions();
		}
	}
}
