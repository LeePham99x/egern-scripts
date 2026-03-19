/**
 * Adapty Multi-App Unlock Template
 * 
 * Uses User-Agent matching to customize per app.
 * Add new apps to the `list` object with their access level name and product ID.
 * 
 * YAML config:
 *   scriptings:
 *   - http_response:
 *       name: Adapty
 *       match: https://api.adapty.io/api/v1/sdk/analytics/profiles
 *       script_url: <this-file-url>
 *       update_interval: 5
 *       body_required: true
 * 
 *   mitm.hostnames.includes:
 *   - api.adapty.io
 */

var obj = {
  "data": {
    "type": "adapty_analytics_profile",
    "id": $request.headers["adapty-sdk-profile-id"],
    "attributes": {
      "app_id": "00000000-0000-0000-0000-000000000000",
      "profile_id": $request.headers["adapty-sdk-profile-id"],
      "customer_user_id": "00000000-0000-0000-0000-000000000000",
      "total_revenue_usd": 0.0,
      "segment_hash": "0000000000000000",
      "paid_access_levels": {
        "premium": {
          "id": "premium",
          "is_active": true,
          "is_lifetime": false,
          "expires_at": "9692-12-26T16:30:25.000000+0000",
          "starts_at": null,
          "will_renew": true,
          "vendor_product_id": "",
          "store": "app_store",
          "activated_at": "2023-12-23T16:30:26.000000+0000",
          "renewed_at": "2023-12-23T16:30:25.000000+0000",
          "unsubscribed_at": null,
          "billing_issue_detected_at": null,
          "is_in_grace_period": false,
          "active_introductory_offer_type": "free_trial",
          "offer_id": null,
          "active_promotional_offer_type": null,
          "active_promotional_offer_id": null,
          "cancellation_reason": null,
          "is_refund": false
        }
      },
      "subscriptions": {
        "subscription": {
          "is_active": true,
          "is_lifetime": false,
          "expires_at": "9692-12-26T16:30:25.000000+0000",
          "starts_at": null,
          "will_renew": true,
          "vendor_product_id": "",
          "vendor_transaction_id": "420001719421278",
          "vendor_original_transaction_id": "420001719421278",
          "store": "app_store",
          "activated_at": "2023-12-23T16:30:26.000000+0000",
          "renewed_at": "2023-12-23T16:30:25.000000+0000",
          "unsubscribed_at": null,
          "billing_issue_detected_at": null,
          "is_in_grace_period": false,
          "active_introductory_offer_type": "free_trial",
          "offer_id": null,
          "active_promotional_offer_type": null,
          "active_promotional_offer_id": null,
          "cancellation_reason": null,
          "is_sandbox": false,
          "is_refund": false
        }
      },
      "non_subscriptions": null,
      "custom_attributes": {},
      "promotional_offer_eligibility": false,
      "introductory_offer_eligibility": false
    }
  }
};

// ---- CUSTOMIZE: Add apps here ----
// Key = User-Agent prefix, name = access level, id = product identifier
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const list = {
  // 'AppUA': { name: 'accessLevelName', id: 'product_id' },
  // Example:
  // 'FMProject' : { name: 'downie', id: 'anddownie' },
  // 'ChatAI':     { name: 'premium', id: 'chatai_weekly_3dft_ios_2' },
};

for (const i in list) {
  if (new RegExp(`^${i}`, `i`).test(ua)) {
    obj.data.attributes.paid_access_levels[list[i].name] =
      obj.data.attributes.paid_access_levels["premium"];
    delete obj.data.attributes.paid_access_levels["premium"];
    obj.data.attributes.paid_access_levels[list[i].name].vendor_product_id = list[i].id;
    obj.data.attributes.paid_access_levels[list[i].name].id = list[i].name;
    obj.data.attributes.subscriptions[list[i].id] =
      obj.data.attributes.subscriptions["subscription"];
    delete obj.data.attributes.subscriptions["subscription"];
    obj.data.attributes.subscriptions[list[i].id].vendor_product_id = list[i].id;
    break;
  }
}

body = JSON.stringify(obj);
$done({ body });
