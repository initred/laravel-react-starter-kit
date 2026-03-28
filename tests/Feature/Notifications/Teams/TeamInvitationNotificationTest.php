<?php

declare(strict_types=1);

use App\Models\TeamInvitation;
use App\Notifications\Teams\TeamInvitation as TeamInvitationNotification;
use Illuminate\Notifications\Messages\MailMessage;

it('sends via mail channel', function (): void {
    $invitation = TeamInvitation::factory()->create();
    $notification = new TeamInvitationNotification($invitation);

    expect($notification->via(new stdClass))->toBe(['mail']);
});

it('generates correct mail content', function (): void {
    $invitation = TeamInvitation::factory()->create();
    $notification = new TeamInvitationNotification($invitation);

    $mail = $notification->toMail(new stdClass);

    expect($mail)->toBeInstanceOf(MailMessage::class)
        ->and($mail->subject)->toContain($invitation->team->name);
});

it('generates correct array representation', function (): void {
    $invitation = TeamInvitation::factory()->create();
    $notification = new TeamInvitationNotification($invitation);

    $array = $notification->toArray(new stdClass);

    expect($array)->toHaveKeys(['invitation_id', 'team_id', 'team_name', 'role'])
        ->and($array['invitation_id'])->toBe($invitation->id)
        ->and($array['team_id'])->toBe($invitation->team_id)
        ->and($array['team_name'])->toBe($invitation->team->name)
        ->and($array['role'])->toBe($invitation->role->value);
});
