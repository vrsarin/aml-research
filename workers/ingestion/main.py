# This is required to generate knowledge graph
""" Kafka Consumer for NER Extraction"""
import json
from tqdm import tqdm
from confluent_kafka import Consumer, KafkaError, KafkaException
from storage_manager import get_document_url, save_graph_to_storage
from langchain.document_loaders import UnstructuredURLLoader
from langchain.text_splitter import TokenTextSplitter
from ner_extrator import extract_graph
from graph_repository import save_graph


conf = {'bootstrap.servers': 'host.docker.internal:29092',
        'group.id': 'parsers',
        'auto.offset.reset': 'earliest',
        "enable.auto.commit": False}

consumer = Consumer(conf)

try:
    # TODO: should come from environment variables
    print("Subscribing to topic 'ai'")
    consumer.subscribe(["ai"])
    # TODO: change this to better pattern
    PROCESS_RUNNING = True
    if PROCESS_RUNNING:
        print("Listening to events now for topic 'ai'")
    text_splitter = TokenTextSplitter(
        chunk_size=4096, chunk_overlap=24, disallowed_special=())
    while PROCESS_RUNNING:
        try:
            msg = consumer.poll(timeout=1)

            if msg is None:
                print("Waiting...")
                continue

            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    print("ERROR: %s".format(msg.error()))
                elif msg.error():
                    raise KafkaException(msg.error())
            else:
                print("Starting process for new message")
                message = msg.value().decode('utf-8')
                print(message)
                data = json.loads(message)
                print(data)
                # Get preSignedUrl document
                urls = [get_document_url(
                    data['BucketName'], data['FileName'])]
                # Load into url parser
                documents = UnstructuredURLLoader(urls=urls).load_and_split(
                    text_splitter=text_splitter)
                # Send to openai for NER

                for i, d in tqdm(enumerate(documents), total=len(documents)):
                    graph = extract_graph(d)
                    save_graph(graph)
                    print(graph.to_json())
                    # Save it to graph file on storage for forensic and editing
                    # save_graph_to_storage(
                    #     str(i+1), data['BucketName'], data['FileName'], graph)

                print("Processed Message")

            consumer.commit(msg)
        except KafkaException as ex:
            print("Unhandled Error", ex)
finally:
    # Close down consumer to commit final offsets.
    consumer.close()
