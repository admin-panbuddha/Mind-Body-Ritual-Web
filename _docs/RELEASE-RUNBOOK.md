# Release Runbook — [PROJECT NAME]
> Copy this file into your project as: _docs/RELEASE-RUNBOOK.md
> Fill in the project-specific sections once, then use the checklist every deploy.

---

## Project Info

| Field | Value |
|---|---|
| Project | [e.g. LaMirage] |
| Live URL | [e.g. https://app.lamirage.online] |
| GitHub Repo | [e.g. github.com/admin-panbuddha/LaMirage-App] |
| Deploy Method | [Railway auto-deploy / Ionos FTP / EAS Build / EAS Update] |
| Stack | [e.g. Express + Postgres + Railway] |
| Branch | [e.g. main] |

---

## Environment Variables Required

List every .env variable the app needs to run in production.
Check Railway (or Vercel / Ionos) dashboard if any are missing before deploying.

| Variable | Required | Where to Get It |
|---|---|---|
| JWT_SECRET | Yes | Any strong random string |
| ANTHROPIC_API_KEY | Yes | console.anthropic.com |
| DATABASE_URL | Yes | Railway PostgreSQL addon (auto-set) |
| [add more] | | |

---

## Pre-Deploy Gate Checklist

Run through this EVERY time before pushing to production.
Do not skip items — each one has caught a real issue before.

### Code Quality
- [ ] All recent changes tested locally (npm start / npx expo start)
- [ ] No console.log debug statements left in production code
- [ ] No hardcoded secrets, API keys, or passwords in any file
- [ ] .env is in .gitignore and NOT staged for commit (run: git status)
- [ ] No TODO/FIXME comments that block this release

### Database (if applicable)
- [ ] All new migrations are idempotent (CREATE TABLE IF NOT EXISTS)
- [ ] Migration runs cleanly on local Postgres without errors
- [ ] No breaking schema changes without a migration script
- [ ] Seed/reset scripts have NOT been run against production DB

### Git
- [ ] Working branch is clean: git status shows nothing to commit
- [ ] All changes committed with a clear message
- [ ] Latest pull from main: git pull origin main
- [ ] No merge conflicts

### BackupBot
- [ ] Backed up to GitHub before deploying: python3 backupbot.py backup --git
- [ ] .env files backed up to OneDrive (run onedrive-backup.bat)

---

## Deploy Steps

### Stack A — Express + Railway
```
1. Say "deploy" in Cowork → railway-deploy skill handles everything
2. Watch Railway dashboard for build status
3. Check live URL once deploy completes (~2 min)
```

### Stack B — Next.js + Ionos (static)
```
1. npm run build  → generates /out/ folder
2. FTP upload /out/ contents to Ionos public_html
3. Clear Ionos cache if changes don't appear
```

### Stack C — Expo Mobile (code-only change)
```
1. eas update --channel preview --message "describe change"
2. App auto-updates on next launch (~30 sec)
3. Test on phone before marking done
```

### Stack C — Expo Mobile (native change / new package)
```
1. git add . && git commit && git push origin main
2. eas build --platform android --profile preview
3. Scan QR from expo.dev → install new APK on phone
4. Re-test core flows before submitting to App Store
```

---

## Post-Deploy Verification

Run these checks within 5 minutes of every deploy.

- [ ] Live URL loads without errors
- [ ] Login / auth flow works end to end
- [ ] Core feature works (describe here: ___________________)
- [ ] No error messages in Railway logs (or browser console)
- [ ] Database reads and writes working (create a test record)
- [ ] Environment variables all loaded (no "undefined" errors in logs)

---

## Rollback Plan

If something breaks after deploy, execute in this order:

### Quick rollback (last commit was bad)
```bash
# In Cowork — revert to previous commit
git revert HEAD
git push origin main
# Railway auto-redeploys the reverted version
```

### Full rollback (multiple commits were bad)
```bash
# Find the last good commit hash
git log --oneline -10

# Create a rollback branch from that commit
git checkout -b rollback/[date] [commit-hash]
git push origin rollback/[date]
# In Railway: manually set deployment branch to rollback/[date]
```

### Database rollback (schema change broke something)
```bash
# Only if you have a backup dump
openssl enc -aes-256-cbc -d -in backups/backup-[timestamp].dump.enc -out restore.dump -pass pass:YOUR_PASSPHRASE
psql -U postgres -d [dbname] -f restore.dump
```

---

## Known Issues & Gotchas

Document project-specific things that have gone wrong before.

| Issue | Cause | Fix |
|---|---|---|
| [Add as you discover them] | | |

---

## Decision Log

Track major technical decisions so future sessions have context.

| Date | Decision | Why | Alternatives Rejected |
|---|---|---|---|
| [date] | [what you decided] | [reasoning] | [what you didn't pick and why] |
