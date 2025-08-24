# 🚨 SECURITY IMPORTANT - READ THIS FIRST

## Environment Variables Security

### ⚠️ CRITICAL SECURITY ISSUE FOUND
Your project currently has **sensitive credentials committed to version control**. This is a major security risk.

### Files containing sensitive data:
- `apps/frontend/.env.local` - Contains Google OAuth secrets, API keys
- `apps/backend/.env` - Contains database credentials, API keys

### Immediate Action Required:

1. **Rotate all exposed credentials immediately**:
   - Google OAuth Client Secret
   - Anthropic API Key
   - RocketReach API Key
   - JWT Secret
   - Database password

2. **Remove sensitive files from git history**:
   ```bash
   # Remove from current commit
   git rm --cached apps/frontend/.env.local
   git rm --cached apps/backend/.env
   git commit -m "Remove sensitive environment files"
   
   # To completely remove from git history (advanced):
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch apps/frontend/.env.local apps/backend/.env' \
   --prune-empty --tag-name-filter cat -- --all
   ```

3. **Use .env.example templates**:
   - Copy `.env.example` to `.env.local` (frontend) and `.env` (backend)
   - Fill in your NEW credentials (after rotating the exposed ones)
   - Never commit the actual `.env*` files

### Proper Environment Setup:

```bash
# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local
# Edit apps/frontend/.env.local with your credentials

# Backend  
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env with your credentials

# Root (if needed)
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Production Security:
- Use secure secret management (AWS Secrets Manager, Azure Key Vault, etc.)
- Never put production secrets in `.env` files
- Use environment variables from your deployment platform
- Enable proper access controls and audit logs

### Verification:
Run this to verify no sensitive files are tracked:
```bash
git ls-files | grep -E "\\.env$|\\.env\\.local$"
# This should return nothing
```

## 🔐 Security Checklist:
- [ ] Rotate all exposed API keys and secrets
- [ ] Remove .env files from git tracking
- [ ] Update .gitignore (already done)
- [ ] Use .env.example templates
- [ ] Set up proper secret management for production
- [ ] Review all commits for other sensitive data
- [ ] Enable git pre-commit hooks to prevent future leaks

**Remember**: Security is not optional. Take these steps immediately.
