from hashlib import sha256
from pathlib import Path
from base64 import b64encode

from mkdocs.plugins import BasePlugin


class WciPlugin(BasePlugin):
    def on_page_markdown(self, markdown, page, config, files):
        pass

    def on_post_build(self, config):
        site_dir = Path(config["site_dir"])
        files = get_all_files(site_dir)

        paths = generate_wci_file(files, site_dir)

        wci_content_path = create_wci_config_dir()
        redirects = get_entries_from_file("./wci/redirects")
        wildcards = get_entries_from_file("./wci/wildcards")

        wci_result = ""
        if redirects:
            wci_result += "#REDIRECTS\n"
            for value, key in redirects.items():
                wci_result += f'"{value}":"{key}"\n'

        if wildcards:
            wci_result += "#WILDCARDS\n"
            for value, key in wildcards.items():
                wci_result += f'"{value}":"{key}"\n'

        wci_result += "#PATHS\n"
        for path, file_hash in paths.items():
            wci_result += f'"{path}":{file_hash}\n'

        wci_result = wci_result[:-1]

        Path(site_dir / "wci.txt").write_text(wci_result, encoding="utf-8")
        Path(wci_content_path / "wci.txt").write_text(wci_result, encoding="utf-8")
        generate_dns_string("wci1", wci_result)


def get_entries_from_file(file_path):
    file_content = ""
    if not Path(file_path).exists():
        return []
    file_content = Path(file_path).read_text(encoding="utf-8").splitlines()
    entries = {}
    for entry in file_content:
        key, val = entry.split(" ")
        entries[key] = val
    return entries


def create_wci_config_dir():
    wci_content_path = Path(".").parent / "wci"
    wci_content_path.mkdir(parents=True, exist_ok=True)

    return wci_content_path


def generate_dns_string(wci_version, wci_result):
    dns_string_path = Path(".").parent / "wci" / "dns_string"
    wci_hash = b64encode(sha256(wci_result.encode("utf-8")).digest()).decode("utf-8")
    dns_string = f"{wci_version} sha256:{wci_hash}"
    dns_string_path.write_text(dns_string, encoding="utf-8")


def get_all_files(directory):
    return [path for path in directory.rglob("**/*") if path.is_file()]


def generate_file_hash(file):
    return sha256(file.read_bytes()).hexdigest()


def generate_wci_file(files, site_dir):
    res = {}
    for f in files:
        file_path = str(f).split(site_dir.name)[1]
        file_hash = generate_file_hash(f)

        res[file_path] = file_hash

    return res


def generate_wci(files, site_dir):
    res = {}
    for f in files:
        file_hash = generate_file_hash(f)
        file_list = res.get(file_hash, [])
        file_list.append(str(f).split(site_dir.name)[1])
        res[file_hash] = file_list

    return res


if __name__ == "__main__":
    plugin = WciPlugin()
    plugin.on_post_build({"site_dir": ".."})
