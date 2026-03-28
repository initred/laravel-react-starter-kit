<?php

declare(strict_types=1);

namespace App\Concerns;

use Illuminate\Support\Str;

trait GeneratesUniqueTeamSlugs
{
    /**
     * Generate a unique slug for the team.
     */
    protected static function generateUniqueTeamSlug(string $name, ?string $excludeId = null): string
    {
        $defaultSlug = Str::slug($name);

        $query = static::withTrashed()
            ->where(function ($query) use ($defaultSlug): void {
                $query->where('slug', $defaultSlug)
                    ->orWhere('slug', 'like', $defaultSlug.'-%');
            });

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        $existingSlugs = $query->pluck('slug');

        $maxSuffix = $existingSlugs
            ->map(function (mixed $slug) use ($defaultSlug): ?int {
                $slug = is_string($slug) ? $slug : '';

                if ($slug === $defaultSlug) {
                    return 0;
                }

                if (preg_match('/^'.preg_quote($defaultSlug, '/').'-(\d+)$/', $slug, $matches)) {
                    return (int) $matches[1];
                }

                return null;
            })
            ->filter(fn (?int $suffix): bool => $suffix !== null)
            ->max() ?? 0;

        return $existingSlugs->isEmpty()
            ? $defaultSlug
            : $defaultSlug.'-'.(is_int($maxSuffix) ? $maxSuffix + 1 : 1);
    }
}
