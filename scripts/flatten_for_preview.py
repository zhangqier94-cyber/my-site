#!/usr/bin/env python3
"""
把 Astro 标准构建产物（目录形式 dist/blog/slug/index.html）扁平化成
文件形式（dist-preview/blog/slug.html），用于不支持目录索引的简易静态服务器。

用法：
    python3 scripts/flatten_for_preview.py            # 默认 dist -> dist-preview
    python3 scripts/flatten_for_preview.py SRC DST

同时会重写 HTML / XML 内的内部链接，例如：
    /blog/               -> /blog.html
    /blog/<slug>/        -> /blog/<slug>.html
"""

import shutil
import sys
from pathlib import Path


def flatten(src: Path, dst: Path) -> None:
    if not (src / "index.html").exists():
        sys.exit(f"[错误] {src} 里没有 index.html，请先 npm run build")

    # 1. 收集映射：blog/slug -> blog/slug.html（根 index.html 除外）
    mapping: dict[str, str] = {}
    for p in sorted(src.rglob("index.html")):
        rel = p.parent.relative_to(src)
        rel_str = str(rel)
        if rel_str == ".":
            continue
        mapping[rel_str] = rel_str + ".html"

    # 2. 复制整棵树
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)

    # 3. 移动文件：blog/slug/index.html -> blog/slug.html
    for rel in sorted(mapping, key=len, reverse=True):
        f = dst / rel / "index.html"
        target = dst / mapping[rel]
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(f), str(target))

    # 4. 清空只剩空壳的目录
    for p in sorted((x for x in dst.rglob("*") if x.is_dir()),
                    key=lambda x: len(x.parts), reverse=True):
        try:
            p.rmdir()
        except OSError:
            pass

    # 5. 重写 HTML / XML 里的内部链接
    #    必须单次正则替换：若逐个 str.replace，短的 /blog/ 会误伤已替换出的
    #    /blog/<slug>.html（前缀嵌套问题）。
    import re

    exts = {".html", ".xml"}
    url_map = {f"/{k}/": f"/{v}" for k, v in mapping.items()}
    # 长模式在前，保证 /blog/<slug>/ 优先于 /blog/ 命中
    pattern = re.compile(
        "|".join(re.escape(k) for k in sorted(url_map, key=len, reverse=True))
    )
    changed = 0
    for f in dst.rglob("*"):
        if f.suffix not in exts or not f.is_file():
            continue
        text = f.read_text(encoding="utf-8")
        new_text = pattern.sub(lambda m: url_map[m.group(0)], text)
        if new_text != text:
            f.write_text(new_text, encoding="utf-8")
            changed += 1

    print(f"[完成] {len(mapping)} 个页面扁平化，重写 {changed} 个文件")
    print(f"[输出] {dst}")


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "dist"
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else root / "dist-preview"
    flatten(src, dst)
