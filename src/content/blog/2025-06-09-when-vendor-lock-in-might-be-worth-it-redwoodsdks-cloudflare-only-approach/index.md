---
title: "When vendor lock-in might be worth it: RedwoodSDK's Cloudflare-only approach"
pubDate: 2025-06-09
socialDescription: "RedwoodSDK is deliberately building for Cloudflare only, accepting vendor lock-in criticism to focus on what you're actually trying to build."
tags:
  - redwoodsdk
  - cloudflare
  - javascript
featured: false
---

I've been looking at [RedwoodSDK](https://rwsdk.com/) recently. It's a React framework that's making a technology and communication decision I find quite interesting. Instead of trying to be platform-agnostic, they're building exclusively for Cloudflare and just accepting the vendor lock-in criticism in exchange for being able to quickly create a batteries-included JS framework.

## Most frameworks try to work everywhere

The usual approach is to build abstraction layers so your code can run anywhere – Vercel, Netlify, AWS, your own servers.

But RedwoodSDK is saying: "We're building for Cloudflare and we're happy to compromise on portability and the risks that come with vendor lock-in."

## Most JS frameworks are not batteries-included

It's not that platform-agnostic frameworks can't have batteries included – [Laravel](https://laravel.com/) and [Rails](https://rubyonrails.org/) obviously do this. [Adonis.js](https://adonisjs.com/) shows it's possible in JavaScript.

But it is definitely rare to offer database, queues, storage, auth, realtime etc in a convention-based way within the JS ecosystem.

By accepting vendor lock-in, RedwoodSDK – a very new project – has added many of the things you get from a batteries-included framework like Laravel at launch.

You get little bits of this with the [new Svelte CLI](https://svelte.dev/blog/sv-the-svelte-cli) which offers simple scaffolding for a database ORM and auth. Rich Harris (the maker of Svelte) [has talked about JS frameworks needing to offer more things like Laravel and Rails](https://www.smashingmagazine.com/2025/01/svelte-5-future-frameworks-chat-rich-harris): "There are too many things that you need to learn in order to build a full stack application today using JavaScript."

## The criticism they're accepting

Vendor lock-in is the obvious concern. If Cloudflare changes pricing or direction, you might be stuck paying higher prices.

When you listen to Peter Pistorius, the co-creator of RedwoodSDK, he's pretty upfront about how he's accepting this. For example on the [Syntax podcast](https://syntax.fm/show/902/fullstack-cloudflare-with-react-and-vite-redwood-sdk), he says: "Certainly, there is lock in there, and we have to own that...I'm unashamedly in love with Cloudflare."

Are they maybe positioning themselves to be acquired by Cloudflare? I don't know, maybe.

## Why this might work

How many web projects actually need to be portable? Platform lock-in isn't the main worry for anything I build – side projects, tools for me and friends. Getting it built and keeping it running is the main thing.

There's also something to be said for consistency. I use Tailwind in every personal project, so I never have to relearn CSS frameworks. You get that consistency to some extent in Vue, where [Vue Router](https://router.vuejs.org/) and [Pinia](https://pinia.vuejs.org/) are such standards that in every project you do, you'd see the same stuff each time.

RedwoodSDK is opinionated on infrastructure so it removes decisions you have to make on each individual project.

## Early days

I haven't built anything proper with RedwoodSDK yet. Maybe I'll find limits I haven't seen. But I thought it was interesting that they were making this clear choice rather than trying to be principled and pure about avoiding vendor lock-in.

---

Edit (10.06.2025 aka the very next day): I have literally just seen that Peter Pistorius [wrote basically exactly](https://rwsdk.com/blog/saas-is-just-vendor-lock-in-with-better-branding) what I'm saying in this post on a blogpost a few days ago 🤦‍♂️

> The pitch of modern SaaS is "don't reinvent the wheel." But every wheel you bolt on comes with some friction. It's not just a service: It's a contract. It's a dependency. It's a subtle architectural shift, and it comes with taxes.
>
> No matter what choice you make, it's always going to be vendor-locked in. Switching out something, even if it's open source and self-hosted, means that you're rewriting a lot of code.
>
> So, my argument is, don't make those decisions. Just pick a platform. The thing that matters is the software that you want to write, not the framework or the services that it runs on.
>
> Platforms like Cloudflare or Supabase shine. Where your database, queue, image service, and storage all live within the same platform and speak the same language. You avoid paying these taxes repeatedly. You simply pick the product that's already there.
>
> 1. No context switching between vendors.
> 2. No API key wrangling.
> 3. No compatibility hacks or configuration forks.
> 4. Just fast, local feeling integrations that work the same in dev and production.
>
> It feels like everything is running on the same machine, and in a way it kind of is. That's the hidden superpower of integrated platforms. They collapse the distance between your code and your services. And in doing so, they give you back the one thing no SaaS vendor can sell you: "Flow."
