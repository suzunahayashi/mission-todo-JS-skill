#!/usr/bin/env python
"""プレビュー環境向け設定ジェネレーター
"""
import argparse
import configparser
import logging
import textwrap
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import List

import htpasswd
from jinja2 import Template


here = Path(__file__).parent
logger = logging.getLogger()

parser = argparse.ArgumentParser()
parser.add_argument("-c", "--conf", type=str, default=None)
parser.add_argument("-o", "--out", type=str, default=None)


@dataclass
class Context():
    server_port: int
    server_root: Path
    exists_htpasswd: bool = False
    allow_ips: List[str] = field(default_factory=list)

    @classmethod
    def init(cls, cfg: configparser.ConfigParser, out_dir: Path) -> "Context":
        ctx = cls(server_port=cfg.getint("server", "port"), server_root=Path(cfg["server"]["root"]))
        return ctx


def resolve_path(path: str, default: str) -> Path:
    if not path:
        return Path.cwd() / default
    elif path.startswith("/"):
        return Path(path)
    else:
        return Path.cwd() / path


def generate_htpasswd(cfg: configparser.ConfigParser, htpasswd_path: Path) -> bool:
    if not (cfg.has_option("security", "basic_username") and cfg.has_option("security", "basic_password")):
        logger.info("Basic認証用の項目が不足しているため、htpasswdは生成しませんでした")
        return False
    if not htpasswd_path.exists():
        htpasswd_path.touch()
    with htpasswd.Basic(htpasswd_path, mode="md5") as db:
        basic_user = cfg.get("security", "basic_username")
        basic_pass = cfg.get("security", "basic_password")
        db.add(basic_user, basic_pass)
    return True


def generate_conf(cfg: configparser.ConfigParser, ctx: Context, out_path: Path):
    tmpl = Template(textwrap.dedent("""
        Listen {{server_port}}

        <VirtualHost *:{{server_port}}>
            ServerName example.com
            DocumentRoot {{server_root}}/public
            DirectoryIndex index.html
        </VirtualHost>

        <Directory {{server_root}}/public>
            Options -Indexes +FollowSymLinks
            {% if exists_htpasswd or allow_ips -%}
            Require all denied
            {% else %}
            Require all granted
            {%- endif %}
            {% if exists_htpasswd -%}
            AuthType Basic
            AuthName "Please enter your ID and password"
            AuthUserfile {{server_root}}/.htpasswd
            AuthGroupfile /dev/null
            Require valid-user
            {%- endif %}
            {% for ip in allow_ips -%}
            Require ip {{ip}}
            {% endfor %}
        </Directory>
        """).strip())
    with out_path.open(mode="w") as fp:
        fp.write(tmpl.render(asdict(ctx)))


def main():
    args = parser.parse_args()
    cfg = configparser.ConfigParser()
    cfg.read(resolve_path(args.conf, "config.ini"))
    out_dir = resolve_path(args.out, ".")
    context = Context.init(cfg, out_dir)
    context.exists_htpasswd = generate_htpasswd(cfg, out_dir / ".htpasswd")
    if cfg.has_option("security", "allow_ips"):
        context.allow_ips = cfg.get("security", "allow_ips").split()
    generate_conf(cfg, context, out_dir / "site.conf")
    (out_dir / "public").mkdir()


if __name__ == "__main__":
    main()