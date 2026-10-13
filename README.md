KITE - UPDATED FILES (everything built so far)

1) DATABASE (Neon > SQL Editor): paste sql/ALL_MIGRATIONS.sql and click Run. Safe to run again.

2) BACKEND (GitHub repo kite_backend):
   - kite_backend/server.js           -> main folder
   - kite_backend/lib/roles.js        -> lib/ folder (create the folder if it does not exist)
   - kite_backend/routes/*.js         -> routes/ folder
   NOT included (leave yours as it is): routes/auth.js, package.json, lib/auth.js, lib/db.js
   Render > kite_backend > Environment, add:
     ADMIN_PHONES    = owner and co-developer numbers, digits only, comma separated
     VERIFIED_PHONES = numbers of the KITE ADMIN1 and KITE ADMIN2 accounts
   Wait for the deploy to say Live.

3) FRONTEND (GitHub repo kite_frontend):
   - kite_frontend/index.html and kite_frontend/sw.js -> main folder, side by side.
   Reload the site with Ctrl+Shift+R.

Tip: file names must be exact (users.js, not "users (2).js").

PREMIUM (Paystack) - included in this zip
   - kite_backend/routes/premium.js is mounted at /api/premium in server.js.
   - Render > Environment, also add:  PAYSTACK_SECRET_KEY  (use your TEST key first)
   - Paystack dashboard > Settings > API Keys & Webhooks > Webhook URL:
       https://kite-backend-pqsm.onrender.com/api/premium/webhook
   - Prices are set at the top of premium.js (in kobo: 50000 = NGN 500). Change them there.
   - Accounts in ADMIN_PHONES and VERIFIED_PHONES get Premium free.
   - Without PAYSTACK_SECRET_KEY the app still works; buying Premium just says payments are not set up.
