/**
 * @name Supershift Pro Unlock
 * @description Unlock Pro features for Supershift app
 * @author NALA
 */
try {
  var url = $request.url;
  var obj = JSON.parse($response.body);

  if (url.indexOf("/api/user") !== -1) {
    obj.hasPro = true;
  } else if (url.indexOf("/api/validateAndLinkPurchase") !== -1) {
    obj.result = "valid";
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}