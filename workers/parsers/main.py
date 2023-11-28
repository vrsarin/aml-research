# This is required to save the content for forensics
""" Kafka Consumer for pasing files and sending it for NER Extraction"""
from confluent_kafka import Consumer, KafkaError, KafkaException
from document_processor import process_document


conf = {'bootstrap.servers': 'host.docker.internal:29092',
        'group.id': 'parsers',
        'auto.offset.reset': 'earliest',
        "enable.auto.commit": False}

consumer = Consumer(conf)
try:
    # TODO: should come from environment variables
    print("Subscribing to topic 'documents")
    consumer.subscribe(["documents"])
    # TODO: change this to better pattern
    PROCESS_RUNNING = True
    if PROCESS_RUNNING:
        print("Listening to events now for topic" + "documents")
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
                print("Starting Process for new message")
                message = msg.value().decode('utf-8')
                process_document(message=message)
                print("Processed Message")

            consumer.commit(msg)
        except KafkaException as ex:
            print("Unhandled Error", ex)
finally:
    # Close down consumer to commit final offsets.
    consumer.close()
