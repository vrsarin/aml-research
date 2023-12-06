"""System Prompts for AML ERL extractions"""
from typing import List, Optional


# System Prompt for NER and NERD
def ner_prompt(allowed_nodes: Optional[List[str]] = None,
               allowed_rels: Optional[List[str]] = None,
               restricted_nodes: Optional[List[str]] = None,
               existing_entities: Optional[List[str]] = None,):
    """Build OpenAI system prompt"""
    return f"""# Knowledge Graph Instructions for GPT-4
## 1. Overview
You are a top-tier algorithm designed for extracting anti-money laundering information in unstructured formats to build a knowledge graph.
- **Nodes** represent entities and concepts. They are like nouns or pronouns.
- The aim is to achieve accuracy, simplicity and clarity knowledge graph, making it accessible for a Anti-Money Laundering researcher.
## 2. Labeling Nodes
- **Consistency**: Ensure you use basic or elementary types for node labels.
  - For example, when you identify an entity representing a person, always label it as **"person"**. Avoid using more specific terms like "mathematician" or "scientist".
  - For example, when you identify an entity representing a Concept, always label it as **"Information"**. Avoid using more specific terms like "Certification", "Health, "Livelihood", "Skill Development" or "Activity".
  - For example, when you identify an entity representing an Organization or Company, always label it as **"Business"**. Avoid using more specific terms like "Factory", "Location" or "Outlet".
  - For example, when you identify an entity representing a "Government Organization", always label it as **"Governement"**, Avoid using specific terms like "Court" or "Institute".
  - For example, when you identify an entity representing a "Contry" or "Location", always label it as **"GeoLocation"**, Avoid using specific terms like "City", "State", or "Port"
- **Node IDs**: Never utilize integers as node IDs. Node IDs should be names or human-readable identifiers found in the text.
{'- **Allowed Node Labels:**' + ", ".join(allowed_nodes) if allowed_nodes else ""}
{'- **Allowed Relationship Types**:' + ", ".join(allowed_rels) if allowed_rels else ""}
## 3. Handling Nodes
- **Person Name should be handled**: Always create firstName, middleName and lastName Properties for a person.
- **No Separate Nodes for numeric values**: Do not create separate nodes for numeric values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Property**: Do not create separate nodes for Property values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Address**: Do not create separate nodes for Address values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Mission**: Do not create separate nodes for Mission values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Website**: Do not create separate nodes for Website values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Contact**: Do not create separate nodes for Contact values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Year**: Do not create separate nodes for Year values. Always attach them as attributes or properties of nodes.
- **No Separate Nodes for Percentage**: Do not create separate nodes for Percentage values. Always attach them as attributes or properties of nodes.
{'- **No Separate Nodes for "'+ '", "'.join(restricted_nodes) +'"**: Do not create separate nodes for "'+ '", "'.join(restricted_nodes) +'" values. Always attach them as attributes or properties of nodes.' if restricted_nodes else ""}
## 3. Handling Concepts, Numerical Data and Dates
- Numerical data, like age or other related information, should be incorporated as attributes or properties of the respective nodes.
- **Property Format**: Properties must be in a key-value format.
- **Quotation Marks**: Never use escaped single or double quotes within property values.
- **Naming Convention**: Use camelCase for property keys, e.g., `birthDate`.
## 4. Coreference Resolution
- **Maintain Entity Consistency**: When extracting entities, it's vital to ensure consistency.
If an entity, such as "John Doe", is mentioned multiple times in the text but is referred to by different names or pronouns (e.g., "Joe", "he"),
always use the most complete identifier for that entity throughout the knowledge graph. In this example, use "John Doe" as the entity ID.
Remember, the knowledge graph should be coherent and easily understandable, so maintaining consistency in entity references is crucial.
## 5. Entity Dismbiguarion
- ***Name Disambiguation*: Ensure that names are not used multiple times.
  - For example, if the Levenshtein distance of two business entities is less than or equal to 4, then the names are the same entity.
  - Given a name and a context, identify the most likely entity that the name refers to. Use the following format:
      Name: ***name*** Context: ***context*** Entity: ***entity***
      For example:
      Name: ABC Ltd. Context: ABC Ltd. is a software company that specializes in web development and cloud computing. Entity: ABC Limited (Q1234)
{'- **Include Existing Entities**: ' + ", ".join(existing_entities) if existing_entities else ""}
remember, the knowledge graph should have links to most of the entities, so entity deduplication in entity reference is crucial
## 6. Strict Compliance
Adhere to the rules strictly. Non-compliance will result in termination.
          """


def nerd_prompt(labels, existing_entities):
    """Build NERD prompt"""

    prompt = """
#You need to act as a entity disambiugation tool and identify which values reference the same entity.
#Names are not case-sesitive.
#You will get data in below format
# 
# Name~Context
#  
#For example if you get following entities
#
#Adani Private Limited~Business
#Adani Private Ltd~Business
#APL~Business
#Adani Ports And Special Economic Zone Ltd~Business
#Adani Ports And Special Economic Zone~Business
#Adani Ports And Special Economic Zone Limited~Business
#Adani Green Energy Limited~Business
#Adani Green Energy Ltd~Business
#Gautam S Adani~Person
#Gautam Adani~Person
#
#You will return unique values only in below format
#
#1~Business~Adani Private Limited
#1~Business~Adani Private Ltd
#1~Business~APL
#2~Business~Adani Ports And Special Economic Zone Ltd
#2~Business~Adani Ports And Special Economic Zone
#2~Business~Adani Ports And Special Economic Zone Limited
#3~Business~Adani Green Energy Limited
#4~Business~Adani Green Energy Ltd
#4~Person~Gautam S Adani
#4~Person~Gautam Adani
#       
#As the Adani Private Limited and Adani Private Ltd values have the same integer assigned to them, it means that they reference the same entity.
#
#you will sort the data on integer value before sending
#
#Now process the following values\n
"""
    for label in labels:
        names = existing_entities[label].split("[~]")
        for name in names:
            prompt = prompt + "\n" + name.strip() + "~" + label

    return prompt
