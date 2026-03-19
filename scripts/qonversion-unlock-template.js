/**
 * Qonversion Dynamic Unlock Template
 * 
 * Reads existing products_permissions from response to discover product IDs
 * dynamically. No hardcoding required.
 * 
 * YAML config:
 *   scriptings:
 *   - http_response:
 *       name: Qonversion
 *       match: api.qonversion.io/v1/user/init
 *       script_url: <this-file-url>
 *       update_interval: 5
 *       body_required: true
 * 
 *   mitm.hostnames.includes:
 *   - api.qonversion.io
 */

var obj = JSON.parse($response.body);

// Discover product/permission IDs from the response itself
const first_id = Object.keys(obj.data.products_permissions)[0];
const first_value = obj.data.products_permissions[first_id][0];

// Inject active user products
obj.data.user_products = [
  {
    "id": obj.data.products[0].id,
    "type": obj.data.products[0].type,
    "store_id": obj.data.products[0].store_id,
    "duration": obj.data.products[0].duration
  }
];

// Inject active permissions
obj.data.permissions = [
  {
    "id": first_value,
    "trial_start_timestamp": 1707761885,
    "active": 1,
    "started_timestamp": 1707761885,
    "grant_type": "purchase",
    "associated_product": obj.data.products[0].id,
    "source": "appstore",
    "renews_count": 0,
    "store_transactions": [
      {
        "ownership_type": "owner",
        "transaction_id": "440001723859056",
        "environment": "production",
        "transaction_timestamp": 1707761885,
        "expiration_timestamp": 1708366685,
        "original_transaction_id": "440001723859056",
        "type": "trial_started"
      }
    ],
    "current_period_type": "trial",
    "expiration_timestamp": 1708366685,
    "renew_state": 1
  }
];

body = JSON.stringify(obj);
$done({ body });
