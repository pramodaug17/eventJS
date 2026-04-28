# 📦 EventJS

<p align="center">
  <b>Modern, extensible, async-capable event system</b><br/>
  <i>Built for performance, scalability, and flexibility</i>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/eventjs-core.svg" />
  <img src="https://img.shields.io/npm/dm/eventjs-core.svg" />
  <img src="https://img.shields.io/github/actions/workflow/status/pramodaug17/eventJS/ci.yml" />
  <img src="https://img.shields.io/github/license/pramodaug17/eventJS" />
  <img src="https://img.shields.io/bundlephobia/minzip/eventjs-core" />
</p>

---

## 🚀 Why EventJS?

Most event emitters are:

- synchronous ❌  
- non-extensible ❌  
- lack scheduling ❌  

**EventJS solves that** by combining:

- ⚡ Async + non-blocking execution
- 🧠 Smart scheduling
- 🔌 Middleware-style plugin system
- 📦 Batch processing
- 🎯 Predictable architecture

---

## ✨ Features

- Sync emit + async execution
- Microtask / macrotask / idle scheduling
- Plugin hooks (before/after emit & listener)
- Parallel & sequential dispatch
- Once listeners
- Strict mode validation
- Non-blocking queue
- TypeScript support

---

## 📥 Installation

```bash
npm install eventjs-core
```

---

## 🧑‍💻 Quick Example

```js
import { EventEmitter } from "eventjs-core";

const emitter = new EventEmitter();

emitter.registerEvent("greet");

emitter.on("greet", (name) => {
  console.log("Hello", name);
});

emitter.emit("greet", "World");
```

---

## 🔌 Plugin Example

```js
emitter.use({
  name: "logger",

  beforeEmit(ctx) {
    console.log("[Emit]", ctx.eventName);
  },

  afterListener(ctx) {
    console.log("[Done]");
  }
});
```

---

## 🧠 Architecture

```
emit()
 ├── validation (sync)
 ├── beforeEmit (plugins)
 ├── queue
 ├── scheduler
 ├── dispatcher
 │    ├── beforeListener
 │    ├── handler
 │    ├── afterListener
 └── afterEmit
```

---

## ⚙️ Configuration

```js
new EventEmitter({
  strictMode: true,
  asyncMode: true,
  strategy: "microtask",
  batch: false
});
```

---

## 🌐 CDN

```html
<script src="https://cdn.jsdelivr.net/npm/eventjs-core@latest/dist/events.js"></script>
```

---

## 🧪 Testing

```bash
pnpm test
```

---

## 📦 Build

```bash
pnpm build
```

---

## 🤝 Contributing

PRs welcome. Please include tests.

---

## 📄 License

MIT
