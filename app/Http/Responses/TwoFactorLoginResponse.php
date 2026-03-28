<?php

declare(strict_types=1);

namespace App\Http\Responses;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

final class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    public function toResponse(mixed $request): Response
    {
        /** @var User|null $user */
        $user = $request->user();
        $team = $user->currentTeam ?? $user?->personalTeam() ?? $user?->fallbackTeam();

        abort_unless($team instanceof Team, 403);

        if ($user && ! $user->currentTeam) {
            $user->update(['current_team_id' => $team->id]);
            $user->setRelation('currentTeam', $team);
        }

        return $request->wantsJson()
            ? new JsonResponse(['two_factor' => false], 200)
            : redirect()->intended(sprintf('/%s/dashboard', $team->slug));
    }
}
