---
title: Deploy Laravel 11 for free on Vercel in 2024
pubDate: 2024-06-04T21:31:50.309Z
socialDescription: How to deploy Laravel on Vercel
tags:
  - laravel
featured: false
---

You can deploy Laravel on Vercel. For free!

This is nice if you're coming to Laravel from Javascript land like me. In Javascript, Netlify and Vercel make it really easy to deploy something you're just trying out for free without needing to worry about running a server.

Deploying Laravel on Vercel is more work compared to hosting Astro, SvelteKit etc on Vercel or Netlify. But Laravel does more stuff so it's a tradeoff like everything else.

[Tools like Ploi](https://ploi.io/register?referrer=H1A1JZd9zNVLJ4EimK4I) (referral) and [Laravel Forge](https://forge.laravel.com) are probably the way forward for more substantial sites.

I'm going to assume you know a bit about Vercel and how to use its CLI and web interface.

[**Provide feedback to this post on Github**](https://github.com/edjw/edjw-blog-astro/issues/18). I will make changes to this post if it can be improved.

---

## 1. Make a Laravel app

I'm going to assume you can do this or can find out how to do it.

## 2. Add these files to your Laravel project

- `api/index.php`
- `vercel.json`
- `.vercelignore`

### api/index.php

```php
<?php

require __DIR__ . '/../public/index.php';
```

### vercel.json

This config uses Frankfurt for the region but choose one near your likely users.

The `/build/(.*)` route rule has to be before the `/(.*)` route rule. The `/build/(.*)` route is for your Vite-generated assets like CSS and images. The `/(.*)` route is for your Laravel app.

The runtime is a [PHP Runtime for Vercel Serverless Functions](https://github.com/vercel-community/php).

```json
{
    "version": 2,
    "regions": [
        "fra1"
    ],
    "functions": {
        "api/index.php": {
            "runtime": "vercel-php@0.7.1"
        }
    },
    "routes": [
        {
            "src": "/build/(.*)",
            "dest": "/build/$1"
        },
        {
            "src": "/(.*)",
            "dest": "/api/index.php"
        }
    ],
    "outputDirectory": "public"
}
```


### .vercelignore

```
/vendor
```


## 3. Edit `.package.json`

As of 4th July 2024, you need to add this to your `package.json`. Otherwise you'll get a buildtime error of `php: error while loading shared libraries: libssl.so.10: cannot open shared object file: No such file or directory`.

```json
"engines": { "node": "18.x" },
```

## 4. Edit `.gitignore`

Add `.vercel` to your `.gitignore`

## 5. Trust proxies
Go to `bootstrap/app.php`. Add `$middleware->trustProxies(at: '*');` to the `withMiddleware` method so it looks like this:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->trustProxies(at: '*');
})
```

This step is new in Laravel 11 and needed if you want to host on Vercel which uses AWS. [See more here](https://laravel.com/docs/11.x/requests#trusting-all-proxies).

## 6. Set the `APP_KEY` environment variable
```bash
php artisan key:generate --show` # in a Laravel project
# or
php -r "echo 'base64:' . base64_encode(random_bytes(32)) . PHP_EOL;" # elsewhere
vercel env add APP_KEY
```****

## 7. Set the other environment variables

```
APP_URL=https://your-app-url.vercel.app
APP_ENV=production
APP_DEBUG=false
APP_CONFIG_CACHE=/tmp/config.php
APP_EVENTS_CACHE=/tmp/events.php
APP_PACKAGES_CACHE=/tmp/packages.php
APP_ROUTES_CACHE=/tmp/routes.php
APP_SERVICES_CACHE=/tmp/services.php
VIEW_COMPILED_PATH=/tmp
LOG_CHANNEL=stderr
SESSION_DRIVER=cookie
```

## 8. Set up a database (optional)

I've had a look around for database options that will work with a Laravel deployed on Vercel.

### Turso
[Turso](https://turso.tech) is *basically* SQLite. To use Turso with Laravel, the best approach I can find is to add Turso as a database driver and [follow the installation instructions here](https://github.com/richan-fongdasen/turso-laravel?tab=readme-ov-file#installation). Use `https` not `libsql` in the `DB_URL` variable.

Add these environment variables

```
DB_CONNECTION=turso
DB_URL=https://***.turso.io
DB_ACCESS_TOKEN=your_turso_access_token
```

[You have to go a long way](https://turso.tech/pricing) to absolutely need to start paying for Turso.

### Neon
[Neon](https://neon.tech) is Postgres. Neon lets you have a 500MB project for free. You can make multiple databases in Neon and use them as you like.

```
DB_CONNECTION="psql"
DB_URL="postgres://default:*****db_user*****@***db_password**.neon.tech:5432/****database_name****?sslmode=require"
```
Don't use a pooled connection from Neon.

### Cloudflare D1

[Cloudflare D1](https://developers.cloudflare.com/d1) is also *basically* SQLite. To add it as a database driver for Laravel, [follow these instructions](https://github.com/renoki-co/l1?tab=readme-ov-file#d1-with-laravel). It looks like they would like to offer Cloudflare KV as a cache driver and Cloudflare Queues as a queue driver too but that's not available as of 4th June 2024.

Aaron Francis did a good video on [using Cloudflare D1 with Laravel](https://www.youtube.com/watch?v=htAOyy3-E9c).

## Cache
You don't have to set up Redis for a cache and session driver. You could use your database. But you can [use Upstash for this if you want](https://upstash.com).

Add these environment variables.

```
CACHE_STORE="redis"
QUEUE_CONNECTION="redis"
REDIS_HOST=***********.upstash.io
REDIS_PASSWORD="your-upstash-password"
REDIS_PORT="your-upstash-port-eg-40682"
SESSION_DRIVER="redis"
REDIS_CACHE_DB="0"
```

Also add `'scheme' => 'tls'` to both `default` and `cache` in the `redis` section of `config/database.php`. Otherwise, you'll get an error: "Error while reading line from the server".

## Other things

When you install a new module using composer, you'll probably get a build failure in Vercel such as `Required package "predis/predis" is not present in the lock file.` You need to redeploy and clear the Build Cache.

I had a look at the Vercel database and cache options. They look far more expensive than the other options I've looked at and are actually whitelabelled versions of Neon and Upstash anyway!

## Disclaimer
I haven't pushed this approach very hard. There might be limits that I haven't reached yet. To help you deploy Laravel on a conventional server with a database, Redis, web server etc on Hetzner, Digital Ocean, AWS EC2 etc, you might want to [use something like Ploi](https://ploi.io/register?referrer=H1A1JZd9zNVLJ4EimK4I) (referral).

## Prior art
There's some prior art from others which helped get to this point. I found some things in Laravel and Vercel have changed since these posts/project were made which is why I pieced together the instructions above. I couldn't have done any of this without this work by Caleb Porzio and Luca Pacitto (Nembie).

- <https://calebporzio.com/easy-free-serverless-laravel-with-vercel>
- <https://github.com/Nembie/vercelit-laravel>

An example of a new thing in my instructions would be that `vercel.json` Vercel doesn't support environment variables in `vercel.json` any more. The `/build/(.*)` route is another new thing here.

---
[**Provide feedback to this post**](https://github.com/edjw/edjw-blog-astro/issues/18). I will make changes to this post if it can be improved.
