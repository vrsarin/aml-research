"""Extracts the Text From document"""
import json
import os
import io
from datetime import timedelta
import urllib.parse
from pathlib import Path
import requests
from minio import Minio
from minio.error import S3Error
from langchain.document_loaders import UnstructuredFileLoader
from langchain.document_loaders import PyPDFLoader


client = Minio("host.docker.internal:9000",
               access_key="lCG73eMigwEyoBjNawyR",
               secret_key="NoH7NNo7IoMg8r7epj7UX1YejaWb6GFZttAfSCBD",
               cert_check=False,
               secure=False)


def save_text(bucket_name: str, file_name: str, content: bytes | str):
    """Save file to minio for ingestion"""
    new_file_name = "parsed/" + Path(file_name).stem + ".txt"
    client.put_object(bucket_name=bucket_name,
                      object_name=new_file_name,
                      data=io.BytesIO(content),
                      length=content.length,
                      metadata={
                          "Content-Type": "text/plain",
                          "parent-file": file_name}
                      )


def download_document(bucket_name: str, file_name: str, file_path_with_name: str):
    """Get  document parsing"""

    try:
        if client.bucket_exists(bucket_name=bucket_name):
            pre_signed_url = client.get_presigned_url(
                "GET",
                bucket_name,
                file_name,
                expires=timedelta(minutes=5),
            )
            data = requests.get(pre_signed_url, timeout=5)
            with open(file_path_with_name, 'wb')as file:
                file.write(data.content)
    except S3Error as exc:
        print("error occurred.", exc)


def process_pdf(bucket_name: str, file: str,):
    """special implementation for PDF as it was not working on windows"""

    documents = PyPDFLoader(file).load()
    extracted_text = ""
    for doc in documents:
        extracted_text = extracted_text + doc.page_content

    save_text(bucket_name=bucket_name, file_name=file, content=extracted_text)


def process_generic(bucket_name: str, file: str):
    """Generic implementation for all files"""

    documents = UnstructuredFileLoader(file).load()
    extracted_text = ""
    for doc in documents:
        extracted_text = extracted_text + doc.page_content

    save_text(bucket_name=bucket_name, file_name=file, content=extracted_text)


def process_document(message: str):
    """Parse Document and extract text from it."""

    message = json.loads(message)

    for record in message["Records"]:

        filename = urllib.parse.unquote_plus(record["s3"]["object"]["key"])

        file_path = os.path.join(
            "./data/{}".format(filename))

        download_document(
            record["s3"]["bucket"]["name"], filename, file_path)

        match record["s3"]["object"]["contentType"]:
            case "application/pdf":
                process_pdf(file_path, filename)
            case _:
                process_generic(file_path, filename)
