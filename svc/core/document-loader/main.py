from confluent_kafka import Consumer

conf = {'bootstrap.servers': 'host.docker.internal:29092',
        'group.id': 'documentloader',
        'auto.offset.reset': 'smallest'}

consumer = Consumer(conf)

consumer.subscribe(["documents"])

consumer.unsubscribe()