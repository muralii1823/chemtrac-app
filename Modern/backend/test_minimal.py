#!/usr/bin/env python3
"""Minimal FastAPI test to isolate the issue"""
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/test")
def test():
    return {"message": "test works"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3002)

