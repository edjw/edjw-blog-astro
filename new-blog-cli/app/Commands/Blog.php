<?php

namespace App\Commands;

use Illuminate\Support\Str;
use LaravelZero\Framework\Commands\Command;

use function Laravel\Prompts\form;
use function Laravel\Prompts\outro;

class Blog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blog';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new blog post with frontmatter and save it to the content directory';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Define the path to the blog directory
        $basePath = realpath(__DIR__.'/../../..');
        $blogPath = "{$basePath}/src/content/blog";

        $responses = form()
            ->text(
                'Add your title',
                placeholder: 'My Blog Post',
                hint: 'The title of your blog post.',
                name: 'title',
                required: true
            )
            ->text(
                'Add a social description',
                placeholder: 'My Blog Post Description',
                hint: 'Description for social media sharing.',
                name: 'socialDescription'
            )
            ->text(
                'Add any tags (lower and kebab case)',
                placeholder: 'my-tag, my-tag',
                hint: 'Enter tags separated by commas, e.g., tag, my-tag, and-another-tag.',
                name: 'tags',
                validate: fn (string $value) => match (true) {
                    empty($value) => null, // Allow empty value
                    default => collect(array_map('trim', explode(',', $value)))
                        ->map(fn ($tag) => preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $tag) ? null : "'{$tag}' is not in lowercase and kebab case.")
                        ->filter()
                        ->first() // Return the first validation error, if any
                }
            )
            ->confirm(
                label: 'Feature on front page?',
                name: 'featured',
                default: false,
                yes: 'Yes',
                no: 'No',
                hint: 'Select Yes to feature this post on the front page.'
            )
            ->submit();

        $title = $responses['title'];
        $socialDescription = $responses['socialDescription'];
        $tags = $responses['tags'];
        $featured = $responses['featured'] ? 'true' : 'false';

        $slugifiedTitle = Str::slug($title);

        $datetime = now()->toISOString();
        $date = now()->toDateString();

        $tagsArray = array_filter(array_map('trim', explode(',', $tags)));
        $tags = $tagsArray ? "tags:\n - ".implode("\n - ", $tagsArray) : '';

        $frontmatter = <<<EOD
---
title: {$title}
pubDate: {$datetime}
featured: {$featured}
EOD;

        if (! empty($socialDescription)) {
            $frontmatter .= "socialDescription: {$socialDescription}\n";
        }

        if (! empty($tagsArray)) {
            $frontmatter .= "{$tags}\n";
        }

        $frontmatter .= <<<'EOD'
---
EOD;

        $filePath = "{$blogPath}/{$date}-{$slugifiedTitle}.md";

        file_put_contents($filePath, $frontmatter);

        outro("New blog post generated successfully at {$filePath}");
    }
}
