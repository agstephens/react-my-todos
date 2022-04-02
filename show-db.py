#!/usr/bin/env python

import json
db = "/vagrant-share/fastapi-app/dbs/todo_db.json"

with open(db) as r:
    d = json.load(r)

v = sorted(d.values())[0]

class O:
 def __init__(self, d):
  for k, v in d.items():
   setattr(self, k, v)

for i in v:
 i = O(i)
 completed = "X" if i.complete else " "
 print(f"ID: {i.id}: {i.name} ({i.description}), [{completed}]")

