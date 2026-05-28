<?php

declare(strict_types=1);

namespace App\Http\Responses;

use App\Http\Responses\Concerns\RedirectsToCurrentTeam;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Laravel\Fortify\Fortify;
use Symfony\Component\HttpFoundation\Response;

final class RegisterResponse implements RegisterResponseContract
{
    use RedirectsToCurrentTeam;

    /**
     * @param  Request  $request
     */
    public function toResponse(mixed $request): Response
    {
        return $request->wantsJson()
            ? new JsonResponse(['two_factor' => false], 201)
            : redirect()->intended($this->redirectPathForCurrentTeam($request, Fortify::redirects('register')));
    }
}
