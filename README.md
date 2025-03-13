# withcenter dev exam

## How to run

### Production
using docker compose, run `docker compose up`.

### Development

using docker compose, run `docker compose -f docker-compose.yml -f docker-compose.dev.yml up` command.  

Note from docker docs:

> When you supply multiple files, Compose combines them into a single configuration. Compose builds the configuration in the order you supply the files. Subsequent files override and add to their predecessors.