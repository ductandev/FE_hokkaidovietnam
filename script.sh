#!/bin/bash
docker exec cons-fe-hokkaido bash -c 'git pull && exit' && docker restart cons-fe-hokkaido
