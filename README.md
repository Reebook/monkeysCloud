# README
For setting up the project simply run docker-compose up -d
# Getting data inside the solr instance

* Get a json file that contains the data you want to ingest into solr and get it inside the dummy data directory
* Make sure the json file contains the data as an array of json documents
  (check the file thats on dummy data for an example)
* Run docker exec exec -it solr bash
* Run bin/post -c monkeys testdata/*.json

Doing that in order will fetch the data inside the solr docker container.
Now if u want to search here is some quick doc that details how the search api works.
https://lucene.apache.org/solr/guide/8_7/json-query-dsl.html
