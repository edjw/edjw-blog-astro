---
title: Use LLMs to write the chess engine, not to play chess
pubDate: 2025-06-11T20:57:05.245Z
socialDescription: "Apple's research shows LLMs can't reason through Tower of Hanoi - but maybe that's not what we should be asking them to do"
tags:
  - ai
  - programming
featured: true
---

**Use LLMs to build systems that solve problems. Don't use LLMs to solve problems directly.**

[Apple published some research recently](https://machinelearning.apple.com/research/illusion-of-thinking) saying LLMs fail at "reasoning" when problems get even fairly complicated. They asked LLM models from Anthropic and OpenAI to solve Tower of Hanoi and they couldn't handle it.

[Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) is a puzzle with three rods and multiple discs of different sizes, where you have to move all the discs from one rod to another while never placing a larger disc on top of a smaller one.

![Tower of Hanoi puzzle with wooden discs on three pegs](@/images/tower-of-hanoi.jpeg)

<p class="text-sm -mt-8">Image: <a href="https://commons.wikimedia.org/wiki/File:Tower_of_Hanoi.jpeg">Tower of Hanoi</a> by <a href="https://commons.wikimedia.org/wiki/User:Evanherk">User:Evanherk</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></p>

The LLMs didn't do any better when researchers provided the complete solution for Tower of Hanoi. The models still couldn't solve the puzzle reliably.

Gary Marcus – a critic of AI hype – [writes this up as "truly embarrassing" and a "knockout blow" for LLMs](https://garymarcus.substack.com/p/a-knockout-blow-for-llms).

I'm not an AI expert. I can't explain why LLMs are bad at chess or Tower of Hanoi. And I get why you might want to be sceptical of the AI model companies' marketing around "reasoning".

But for practical purposes for people who're trying to use the models, there's a thing that's being missed here I think.

## Use LLMs to write the code that solves problems

**There's a difference between asking an LLM to run an algorithm step-by-step in chat versus asking it to build code that runs that algorithm.**

We should avoid using LLMs as the runtime – the system that solves problems. We should use them to build systems that solve problems.

**Use LLMs to build the runtime. Don't use LLMs as a runtime.**

## I built a working Tower of Hanoi solver with Claude in 20 minutes

I haven't used [Claude Code](https://www.anthropic.com/claude-code) for very many projects yet. But I spent 20 minutes building a Tower of Hanoi solver to see what would happen if I treated Claude as a builder rather than asking it to reason through the puzzle directly.

You don't need to watch this, but this is what it looks like.

<div class="w-9/12 mx-auto">
<video controls width="100%" muted>
 <source src="/files/tower-of-hanoi/tower-of-hanoi-screenrecording.mp4" type="video/mp4">
 <p>Screen recording of an app solving Tower of Hanoi with 3 starting pieces then with 8 starting pieces</p>
</video>
</div>

**The Apple researchers were asking Claude to execute moves directly – to be the runtime. I asked Claude to create code that would execute moves correctly – to be the builder.**

The result was a complete, working application that handles puzzles more complex than what the Apple research shows these models can solve when reasoning through text.

You can see the [complete Tower of Hanoi code and documentation](https://github.com/edjw/tower-of-hanoi-py-claude) including a [project requirements document](https://github.com/edjw/tower-of-hanoi-py-claude/blob/main/docs/prd-tower-of-hanoi-visual-solver.md) and a [task breakdown](https://github.com/edjw/tower-of-hanoi-py-claude/blob/main/docs/tasks-prd-tower-of-hanoi-visual-solver.md).

I gave the whole thing quite strict guidelines to follow. I repurposed [Ryan Carson's Cursor commands](https://github.com/snarktank/ai-dev-tasks) that try to set up an LLM coding tool like Claude Code or Cursor with the context, starting point, requirements, and goals to give it the best chance of doing the thing you want it to. It worked. Claude recognised this as a well-known algorithmic problem, understood what I wanted, and generated deterministic code to solve it.

## LLMs should build chess engines, not play chess

I've tried playing chess against LLMs before – using an LLM as a chess-playing runtime. They've always been terrible at it and forget where the pieces are whenever I've played ([though recent OpenAI models seem to be getting good](https://maxim-saplin.github.io/llm_chess)). I suspect Claude would be quite good at building a chess application that integrates something like the [Stockfish](https://en.wikipedia.org/wiki/Stockfish_(chess)) chess engine. **The LLM wouldn't be making chess moves. It would be building the thing that can make chess moves properly.**

This probably applies to other areas too like data analysis and maths.

I'm also finding that asking LLMs to use command line tools is more reliable than MCP versions of those tools. [Netlify's MCP](https://docs.netlify.com/welcome/build-with-ai/netlify-mcp-server/) seems to fail a lot for me. Using [Claude Desktop](https://claude.ai/download) with [Desktop Commander](https://github.com/wonderwhy-er/DesktopCommanderMCP) to run commands from [Netlify's CLI](https://docs.netlify.com/cli/get-started/) works very reliably. This feels like something that's related to this point above.

Maybe LLMs don't have to be brilliant reasoners. It's just that we have to use them for the things they're good for – **creating deterministic code rather than asking them to solve problems themselves**.
