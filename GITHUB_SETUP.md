# Push this project to GitHub

Your project is already committed locally. Follow these steps to put it on GitHub.

---

## Step 1: Create a new repository on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `viajalan` or `tripmate-prototype` (no spaces)
3. **Description (optional):** e.g. `ViaJalan – tourism marketplace prototype`
4. Choose **Public**
5. **Do not** check "Add a README", "Add .gitignore", or "Choose a license" (you already have these)
6. Click **Create repository**

---

## Step 2: Connect and push from your computer

After creating the repo, GitHub will show you a URL like:

- **HTTPS:** `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
- **SSH:** `git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git`

Open **PowerShell** or **Command Prompt** in your project folder and run (replace the URL with yours):

```powershell
cd "c:\Users\user\Desktop\TripMate - Prototype"

# Add GitHub as remote (use YOUR repo URL from Step 1)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (optional; GitHub’s default is main)
git branch -M main

# Push to GitHub
git push -u origin main
```

If you keep the branch name `master` instead of `main`, use:

```powershell
git push -u origin master
```

---

## Step 3: Verify

- Refresh your repo page on GitHub. You should see all project files.
- To deploy: in the same repo go to **Vercel** (vercel.com) → Import this GitHub repo → Deploy.
