/**
 * @name Supershift Pro Unlock
 * @description Unlock Pro features for Supershift app
 * @author NALA
 */
try {
  var obj = JSON.parse($response.body);
  obj.hasPro = true;
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}