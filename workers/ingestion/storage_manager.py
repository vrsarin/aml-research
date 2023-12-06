"""Manage Documents in Minio"""
import io
from datetime import timedelta
from pathlib import Path
from minio import Minio
from minio.error import S3Error


client = Minio("host.docker.internal:9000",
               access_key="lCG73eMigwEyoBjNawyR",
               secret_key="NoH7NNo7IoMg8r7epj7UX1YejaWb6GFZttAfSCBD",
               cert_check=False,
               secure=False)


def get_document_url(bucket_name: str, file_name: str):
    """Get  document for ingestion"""
    try:
        if client.bucket_exists(bucket_name=bucket_name):
            return client.get_presigned_url(
                "GET",
                bucket_name,
                file_name,
                expires=timedelta(minutes=5),
            )
    except S3Error as exc:
        print("error occurred.", exc)


def save_graph_to_storage(index: str, bucket_name: str, file_name: str, content: bytes | str):
    """Save the graph json file to Minio"""
    try:
        new_file_name = "graphs/" + \
            Path(file_name).stem + "_" + index + ".json"
        if client.bucket_exists(bucket_name=bucket_name):
            client.put_object(bucket_name=bucket_name,
                              object_name=new_file_name,
                              data=io.BytesIO(content),
                              length=content.length,
                              content_type="application/json",
                              metadata={
                                  "Content-Type": "application/json",
                                  "parent-file": file_name})
    except S3Error as exc:
        print("error occurred.", exc)
