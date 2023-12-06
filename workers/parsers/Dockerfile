FROM python:3.10.13
WORKDIR /app
#COPY ./requirements.txt ./requirements.txt
COPY ./main.py ./main.py
COPY ./document_processor.py ./document_processor.py
RUN mkdir -p data
#RUN pip install -r requirements.txt
RUN pip install unstructured[all-docs]
RUN pip install pypdf
RUN pip install minio
RUN pip install confluent-kafka
RUN pip install langchain
CMD [ "python","-u","main.py" ]
