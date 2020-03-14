# -*- coding: utf-8 -*-
"""
Created on Sun Mar  1 20:57:51 2020

@author: takeru
"""
from __future__ import unicode_literals
import os
import json

root = './doc/'

def searchDir(path):
	print(path)
	treeData = {}
	
	files = os.listdir(path)
	print(files)
	
	files_file = [f for f in files if os.path.isfile(os.path.join(path, f))]
	files_dir = [f for f in files if os.path.isdir(os.path.join(path, f))]
	treeData["files"] = files_file
	for fname in files:
		print(fname)
		
	for dname in files_dir:
		treeData[dname] = searchDir(path + '/' + dname)
	
	return treeData
	

data = searchDir(root)
fileName = './tree.json'

text = json.dumps(data, sort_keys=True, ensure_ascii=False, indent=2)
with open(fileName, "w") as fh:
    fh.write(text)