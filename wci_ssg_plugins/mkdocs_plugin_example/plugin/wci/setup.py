from distutils.core import setup

setup(
    name="wci_plugin",
    version="1.0",
    description="MkDocs Plugin to create the wci.txt for the WCI Framework.",
    license="MIT",
    python_requires=">=3.9",
    install_requires=["mkdocs>=1.0.4"],
    packages=["wci"],
    entry_points={
        "mkdocs.plugins": [
            "wci-plugin = wci.plugin:WciPlugin",
        ]
    },
)
