FROM python:3.10.13
WORKDIR /app
COPY ./requirements.txt ./requirements.txt
COPY ./main.py ./main.py
COPY ./storage_manager.py ./storage_manager.py
COPY ./functions.py ./functions.py
COPY ./graph_repository.py ./graph_repository.py
COPY ./ner_extrator.py ./ner_extrator.py
COPY ./openai_prompts.py ./openai_prompts.py
RUN pip install -r requirements.txt
CMD [ "python","-u","main.py" ]