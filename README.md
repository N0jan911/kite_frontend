# Kite
 
A low-data messaging app that lets you message anyone by phone number.
 
**Features**
- Phone number sign-up with SMS code verification
- Chats by phone number, with an offline outbox that retries in order
- Feed (280-character posts, likes) and Status (24-hour updates)
- Light blue and dark blue themes, data saver mode
- Text only, small assets (logos are ~14 KB each)
**Tech**
- React 18 (UMD build from cdnjs, jsDelivr fallback), no build step
- One `index.html`, deployed to GitHub Pages by `.github/workflows/static.yml`
**Backend**
Auth (`/api/auth/send-code`, `/api/auth/verify-code`, `/api/me`) is live. These endpoints must exist for the rest to work, all with `Authorization: Bearer <token>`:
 
| Endpoint | Returns |
|---|---|
| `GET /api/messages?after=<cursor>` | `{messages:[{id,from,to,text,ts}], cursor}` |
| `POST /api/messages` `{id,to,text,ts}` | OK; ignore a repeated `id` |
| `GET /api/users/:number` | `{name,about}` or 404 |
| `GET /api/posts?limit=` | `{posts:[{id,by,name,text,ts,likes,liked}]}` |
| `POST /api/posts` `{text}` | `{post}` |
| `POST /api/posts/:id/like` | `{liked,likes}` |
| `GET /api/statuses` | `{statuses:[{id,by,name,text,ts}]}` (last 24h) |
| `POST /api/statuses` `{text}` | `{status}` |
 
The backend must allow CORS from your GitHub Pages origin.
