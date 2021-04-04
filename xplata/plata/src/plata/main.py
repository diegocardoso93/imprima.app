import logging

import click
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .models import db

try:
    from importlib.metadata import entry_points
except ImportError:  # pragma: no cover
    from importlib_metadata import entry_points

logger = logging.getLogger(__name__)


def get_app():
    app = FastAPI(title="Plata")
    db.init_app(app)
    load_modules(app)
    app.mount('/', StaticFiles(directory='src/plata/static', html=True), name="static")
    return app


def load_modules(app=None):
    print(entry_points()["plata.modules"])
    for ep in entry_points()["plata.modules"]:
        logger.info(
            "Loading module: %s",
            ep.name,
            extra={
                "color_message": "Loading module: "
                + click.style("%s", fg="cyan")
            },
        )
        mod = ep.load()
        if app:
            init_app = getattr(mod, "init_app", None)
            if init_app:
                init_app(app)
