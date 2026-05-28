<?php

declare(strict_types=1);

namespace App\Http\Responses\Concerns;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

trait RedirectsToCurrentTeam
{
    protected function redirectPathForCurrentTeam(Request $request, string $redirect): string
    {
        $team = $this->currentTeam($request);

        URL::defaults(['current_team' => $team->slug]);

        return sprintf('/%s%s', $team->slug, $redirect);
    }

    protected function currentTeam(Request $request): Team
    {
        $user = $request->user();
        $team = $user instanceof User
            ? ($user->currentTeam ?? $user->personalTeam())
            : null;

        abort_unless($team instanceof Team, 403);

        return $team;
    }
}
