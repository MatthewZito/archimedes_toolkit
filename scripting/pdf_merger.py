import sys
import os
import PyPDF2

inputs = sys.argv[1:]

def merge(pdf_list):
    merger = PyPDF2.PdfFileMerger()
    for (pdf in pdf_list):
        merger.append(pdf)
    merger.write('superpdf.pdf')

merge(inputs)