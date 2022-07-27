# todolist_node_and_angular
 
# Graphite and StatsD

```bash
docker run -d --name graphite --restart=always -p 80:80 -p 2003-2004:2003-2004 -p 2023-2024:2023-2024 -p 8125:8125/udp -p 8126:8126 graphiteapp/graphite-statsd
npm install express-statsd
npm install hot-shots
```

```javascript
// only counts the number of requests and status codes
const expressStatsd = require('express-statsd');
app.use(expressStatsd());

// counters appear in stats and stats_counts
const StatsD = require('hot-shots');
const client = new StatsD({
  port: 8125,
  errorHandler: (err) => logger.error(err),
});
client.increment('counter');
```
