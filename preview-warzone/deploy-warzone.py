import json, subprocess, os, re, sys, time

OWNER, REPO, BRANCH = "redalredglloicl-blip", "r.cloud.github.io", "main"
ROOT = os.path.expanduser("~/workspace/wzpkg")

targets = {}
for dirpath, _, files in os.walk(ROOT):
    for fn in files:
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, ROOT)
        with open(full, "r", encoding="utf-8", errors="strict") as f:
            targets[f"preview-warzone/{rel}"] = f.read()

def call(name, args, timeout=600):
    tool = "create_or_update_file" if name == "call-tool" else "get_file_contents"
    p = subprocess.run(["github", name, "--name", tool, "--arguments-json", json.dumps(args)],
                       capture_output=True, text=True, timeout=timeout)
    return p.stdout

def get_sha(path):
    out = call("call-read-tool", {"owner": OWNER, "repo": REPO, "path": path, "branch": BRANCH}, 180)
    m = re.search(r"\(SHA: ([0-9a-f]+)\)", out)
    return m.group(1) if m else None

def get_content(path):
    try:
        out = call("call-read-tool", {"owner": OWNER, "repo": REPO, "path": path, "branch": BRANCH}, 180)
        d = json.loads(out)
        for it in d["result"]["content"]:
            if it.get("type") == "resource":
                return it["resource"]["text"]
    except Exception:
        return None
    return None

print(f"{len(targets)} files to deploy", flush=True)
for path, content in targets.items():
    if get_content(path) == content:
        print(path, "already current", flush=True)
        continue
    done = False
    for attempt in range(1, 5):
        sha = get_sha(path)
        args = {"owner": OWNER, "repo": REPO, "path": path, "branch": BRANCH,
                "message": f"WARZONE trial v1.0: {path.split('/')[-1]}", "content": content}
        if sha:
            args["sha"] = sha
        try:
            call("call-tool", args)
        except subprocess.TimeoutExpired:
            print(f"  {path}: PUT timeout (attempt {attempt})", flush=True)
        time.sleep(4)
        if get_content(path) == content:
            print(path, f"OK (attempt {attempt})", flush=True)
            done = True
            break
        print(f"  {path}: not yet (attempt {attempt})", flush=True)
        time.sleep(4)
    if not done:
        print(path, "FAIL", flush=True)
        sys.exit(1)
print("WARZONE DEPLOY VERIFIED")
