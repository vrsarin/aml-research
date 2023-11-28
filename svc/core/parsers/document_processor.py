"""Extracts the Text From document"""
import json
import os
from datetime import timedelta
import urllib.parse
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


def download_document(bucket_name: str, file_name: str, file_path_with_name: str):
    """Get  document parsing"""

    try:
        if client.bucket_exists(bucket_name=bucket_name):
            preSignedUrl = client.get_presigned_url(
                "GET",
                bucket_name,
                file_name,
                expires=timedelta(minutes=5),
            )
            data = requests.get(preSignedUrl, timeout=5)
            with open(file_path_with_name, 'wb')as file:
                file.write(data.content)
    except S3Error as exc:
        print("error occurred.", exc)


def process_pdf(file: str):
    """special implementation for PDF as it was not working on windows"""
    documents = PyPDFLoader(file).load()
    for doc in documents:
        print(doc.page_content)


def process_generic(file: str):
    """Generic implementation for all files"""

    documents = UnstructuredFileLoader(file).load()
    for doc in documents:
        print(doc.page_content)


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
                process_pdf(file_path)
            case _:
                process_generic(file_path)
