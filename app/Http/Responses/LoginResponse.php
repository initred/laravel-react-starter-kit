<?php

declare(strict_types=1);

namespace App\Http\Responses;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

final class LoginResponse implements LoginResponseContract
{
    public function toResponse(mixed $request): Response
    {
        /** @var User|null $user */
        $user = $request->user();
        $team = $user->currentTeam ?? $user?->personalTeam();

        abort_unless($team instanceof Team, 403);

        URL::defaults(['current_team' => $team->slug]);

        return $request->wantsJson()
            ? new JsonResponse(['two_factor' => false], 200)
            : redirect()->intended(route('dashboard'));
    }
}
