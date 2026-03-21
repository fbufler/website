---
title: "7tv-cli"
description: "Render 7TV emotes directly in your terminal — because MS Teams wouldn't let me add them there."
github: "https://github.com/fbufler/7tv-cli"
blogpost: "/blog/2025/7tv-cli"
tags: ["go", "cli", "7tv", "emotes"]
primaryLanguage: "go"
status: "active"
date: "2025-02-15"
---

A CLI tool that fetches emotes from the [7TV](https://7tv.app) API and renders them directly in your terminal.

```bash
7tv kekw --format GIF
7tv catJAM --format PNG --scaler 4x
```

Supports GIF and PNG formats, multiple scalers. Uses imagecat to render images inline in the terminal.

The original plan was a MS Teams integration. That didn't get approved. The terminal works just as well.
