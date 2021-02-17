package cityssm.nodedocusharejava;

import org.json.JSONObject;

import com.xerox.docushare.DSException;

import ca.saultstemarie.dsjquery.DSJQuery;
import ca.saultstemarie.dsjquery.DSJQueryException;
import ca.saultstemarie.dsjquery.DSJQuerySessionHandler;

public class FindByHandle {

	public static void main (String[] args) throws NumberFormatException, DSJQueryException, DSException, InterruptedException {
		
		try {
			DSJQuerySessionHandler.serverSetup(args[0], Integer.parseInt(args[1]));
			DSJQuerySessionHandler.sessionSetup(args[2], args[3], args[4]);
			
			DSJQuery ds = new DSJQuery("#" + args[5]);
			
			JSONObject json = new JSONObject();
			
			json.put("dsObjects", Tools.dsJQueryToJSONArray(ds));
			
			System.out.print(json.toString());
		}
		finally {
			DSJQuerySessionHandler.closeOpenSessions();
		}
	}
}
